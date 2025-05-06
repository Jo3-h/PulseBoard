# modules/strava_m/extract_strava_data.py

import os
import json
import requests
import webbrowser
import http.server
import socketserver
import urllib.parse
import threading
from dotenv import load_dotenv
from time import sleep

class OAuthHandler(http.server.BaseHTTPRequestHandler):
    def exchange_code_for_tokens(self):
        payload = {
            'client_id': os.getenv('STRAVA_CLIENT_ID'),
            'client_secret': os.getenv('STRAVA_CLIENT_SECRET'),
            'code': self.authorization_code,
            'grant_type': 'authorization_code',
            'redirect_uri': os.getenv('STRAVA_REDIRECT_URI'),
        }

        try:
            response = requests.post("https://www.strava.com/oauth/token", data=payload, timeout=10)
            response.raise_for_status()
            tokens = response.json()
        except Exception as e:
            print(f"Error exchanging code for tokens: {e}")
            return

        if 'access_token' in tokens and 'refresh_token' in tokens:
            with open(".env", "r") as f:
                lines = f.readlines()

            with open(".env", "w") as f:
                for line in lines:
                    if not line.startswith("STRAVA_ACCESS_TOKEN") and not line.startswith("STRAVA_REFRESH_TOKEN"):
                        f.write(line)
                f.write(f"STRAVA_ACCESS_TOKEN={tokens['access_token']}\n")
                f.write(f"STRAVA_REFRESH_TOKEN={tokens['refresh_token']}\n")

            print('Tokens received and saved to .env file!')

    def do_GET(self):
        query = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(query)

        if 'code' in params:
            self.authorization_code = params['code'][0]
            print(f"Authorization code received: {self.authorization_code}")

            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"Authorization successful! You can close this window.")

            self.exchange_code_for_tokens()
            threading.Thread(target=self.server.shutdown).start()
            return

        self.send_response(400)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"Error: No code in URL!")

def run_server():
    handler = OAuthHandler
    with socketserver.TCPServer(("localhost", int(os.getenv('STRAVA_REDIRECT_PORT', 8080))), handler) as httpd:
        print(f"Server started at localhost:{os.getenv('STRAVA_REDIRECT_PORT', 8080)}")
        httpd.serve_forever()

def get_strava_tokens():
    load_dotenv()
    access_token = os.getenv('STRAVA_ACCESS_TOKEN')
    refresh_token = os.getenv('STRAVA_REFRESH_TOKEN')

    if access_token and refresh_token:
        return access_token, refresh_token

    token_url = f"http://www.strava.com/oauth/authorize?client_id={os.getenv('STRAVA_CLIENT_ID')}&response_type=code&redirect_uri={os.getenv('STRAVA_REDIRECT_URI')}&approval_prompt=force&scope=read,profile:read_all,activity:read_all"

    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    webbrowser.open(token_url)

    max_wait = 120  # seconds
    waited = 0
    while (not os.getenv('STRAVA_ACCESS_TOKEN') or not os.getenv('STRAVA_REFRESH_TOKEN')) and waited < max_wait:
        sleep(2)
        waited += 2
        load_dotenv()

    if waited >= max_wait:
        raise Exception("Timeout waiting for Strava authentication.")

    return os.getenv('STRAVA_ACCESS_TOKEN'), os.getenv('STRAVA_REFRESH_TOKEN')

class StravaAPI:
    def __init__(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.BASE_URL = 'https://www.strava.com/api/v3/'

    def refresh_tokens(self):
        print('Refreshing tokens... ', end='')

        url = f'{self.BASE_URL}/oauth/token'
        params = {
            'client_id': os.getenv('STRAVA_CLIENT_ID'),
            'client_secret': os.getenv('STRAVA_CLIENT_SECRET'),
            'grant_type': 'refresh_token',
            'refresh_token': self.refresh_token
        }

        try:
            response = requests.post(url, params=params, timeout=10)
            response.raise_for_status()
            tokens = response.json()
        except Exception as e:
            print(f"Error refreshing tokens: {e}")
            return

        self.access_token = tokens['access_token']
        self.refresh_token = tokens['refresh_token']
        print('Tokens refreshed successfully!')

    def get_detailed_activity(self, activity_id):
        url = f'{self.BASE_URL}/activities/{activity_id}'
        headers = {"Authorization": f"Bearer {self.access_token}"}
        params = {'id': activity_id, 'include_all_efforts': False}

        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code == 401:
                self.refresh_tokens()
                return self.get_detailed_activity(activity_id)

            response.raise_for_status()
            return response.json()

        except Exception as e:
            print(f"Failed to fetch detailed activity {activity_id}: {e}")
            return {}

    def get_activities(self):
        url = f'{self.BASE_URL}/athlete/activities'
        params = {'page': 1, 'per_page': 50}
        headers = {"Authorization": f"Bearer {self.access_token}"}

        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            if response.status_code == 401:
                self.refresh_tokens()
                return self.get_activities()

            response.raise_for_status()
            activities = response.json()

            for activity in activities:
                details = self.get_detailed_activity(activity.get('id'))
                if details:
                    activity['description'] = details.get('description')
                    activity['elapsed_sec'] = details.get('elapsed_time')
                    activity['kudos_count'] = details.get('kudos_count')
                    activity['comment_count'] = details.get('comment_count')
                    activity['is_private'] = details.get('private', False)
                    activity['achievement_count'] = details.get('achievement_count')
                    activity['max_speed'] = details.get('max_speed')

            return activities

        except Exception as e:
            print(f"Error fetching activities: {e}")
            return []

def extract_strava_data():
    print('Extracting Strava data...    ', end='')

    try:
        access_token, refresh_token = get_strava_tokens()
        api = StravaAPI(access_token, refresh_token)
        activities = api.get_activities()

        with open('strava_data.json', 'w') as f:
            json.dump(activities, f, indent=4)

        print('Data extracted successfully!\n')
    except Exception as e:
        print(f"Failed to extract data: {e}\n")
