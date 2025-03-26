# modules/strava_m/extract_strava_data.py

import os
import json
import requests
from dotenv import load_dotenv, set_key
import webbrowser
import http.server
import socketserver
import urllib.parse
import threading
from pprint import pprint

class OAuthHandler(http.server.BaseHTTPRequestHandler):

    def exchange_code_for_tokens(self):
        payload = {
            'client_id' : os.getenv('STRAVA_CLIENT_ID'),
            'client_secret' : os.getenv('STRAVA_CLIENT_SECRET'),
            'code' : self.authorization_code,
            'grant_type' : 'authorization_code',
            'redirect_uri': os.getenv('STRAVA_REDIRECT_URI'),
        }

        response = requests.post("https://www.strava.com/oauth/token", data=payload)
        tokens = response.json()

        # Save the tokens to the .env file
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
            authorization_code = params['code'][0]
            print(f"Authorization code received: {authorization_code}")
            
            # Send a success response
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"Authorization successful! You can close this window.")
            
            # Exchange authorization code for tokens
            self.authorization_code = authorization_code
            self.exchange_code_for_tokens()
            threading.Thread(target=self.server.shutdown).start()

            return
        
        self.send_response(400)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"Error: No code in URL!")

def run_server():
    handler = OAuthHandler
    with socketserver.TCPServer(("localhost", int(os.getenv('STRAVA_REDIRECT_PORT'))), handler) as httpd:
        print(f"Server started at localhost:{os.getenv('STRAVA_REDIRECT_PORT')}")
        httpd.serve_forever()

def get_strava_tokens():

    load_dotenv()
    access_token = os.getenv('STRAVA_ACCESS_TOKEN')
    refresh_token = os.getenv('STRAVA_REFRESH_TOKEN')

    # if both tokens are present then return them to the calling function
    if access_token and refresh_token:
        return access_token, refresh_token
    
    # else request tokens from the user
    token_url = f'http://www.strava.com/oauth/authorize?client_id={os.getenv('STRAVA_CLIENT_ID')}&response_type=code&redirect_uri={os.getenv('STRAVA_REDIRECT_URI')}&approval_prompt=force&scope=read,profile:read_all,activity:read_all'

    # run the server in a separate thread to accept the authorization code
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    webbrowser.open(token_url)

    while not os.getenv('STRAVA_ACCESS_TOKEN') or not os.getenv('STRAVA_REFRESH_TOKEN'):
        load_dotenv()
        pass

    # kill the server thread
    return os.getenv('STRAVA_ACCESS_TOKEN'), os.getenv('STRAVA_REFRESH_TOKEN')

class strava_api():

    def __init__(self, access_token, refresh_token):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.BASE_URL = 'https://www.strava.com/api/v3/'

    def refresh_tokens(self):
        return
    
    def get_detailed_activity(self, activity_id):

        url = f'{self.BASE_URL}/activities/{activity_id}'
        headers = {
            "Authorization" : f"Bearer {self.access_token}"
        }
        params = {
            'id': activity_id,
            'include_all_efforts': False,
        }

        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print("Error occurred while fetching detailed activity.")
            print(json.dumps(response.json(), indent=4))
            return
        
        detailed_activity = response.json()

        return detailed_activity

    def get_activities(self):

        url = f'{self.BASE_URL}/athlete/activities'
        params = {
            'page': 1,
            'per_page': 10
        }
        headers = {
            "Authorization" : f"Bearer {self.access_token}"
        }

        response = requests.get(url, headers=headers, params=params)
        print("Response Status Code:", response.status_code)

        if response.status_code != 200:
            print("Error occurred while fetching activities.")
            return

        activities = response.json()
        for activity in activities:

            # get detailed activity data
            details = self.get_detailed_activity(activity['id'])

            activity['description'] = details['description']
            activity['elapsed_sec'] = details['elapsed_time']
            activity['kudos_count'] = details['kudos_count']
            activity['comment_count'] = details['comment_count']
            activity['is_private'] = details['private']
            activity['achievement_count'] = details['achievement_count']
            activity['max_speed'] = details['max_speed']

        return activities


def extract_strava_data():

    print('Extracting Strava data...    ', end='')

    # check for valid access token and refresh token
    access_token, refresh_token = get_strava_tokens()
    api = strava_api(access_token, refresh_token)

    # get activities
    activities = api.get_activities()

    with open('strava_data.json', 'w') as f:
        json.dump(activities, f, indent=4)

    print('Data extracted successfully!\n')

    return 