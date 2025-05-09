# modules/github/extract_github_data.py
import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

def extract_github_data():

    print('Extracting data from GitHub...   ', end='')

    # Define the URL for the GitHub API
    BASE_URL = 'https://api.github.com/'
    HEADERS = {
        "Accept" : "application/vnd.github+json",
        'Authorization' : f'Bearer {os.getenv("GITHUB_TOKEN")}',
        "X-GitHub-Api-Version" : "2022-11-28"
    }

    # Make the request
    response = requests.get(f'{BASE_URL}user/repos', headers=HEADERS)

    # Parse the response JSON
    repos = response.json()

    
    repositories = []
    for repo in repos:
        repositories.append({
            'repo_name': repo['name'],
            'repo_url': repo['html_url'],
            'repo_commits_url': repo['commits_url'],
            'owner': repo['owner']['login'],
            'is_private': repo['private'],
        })

    data = []
    for repo in repositories:
        
        response = requests.get(f'{BASE_URL}repos/{repo["owner"]}/{repo["repo_name"]}/commits', headers=HEADERS)
        commits = response.json()
        if type(commits) != list:
            print(f'Error with Commit type: {commits} for {repo["repo_name"]}')
            continue

        for commit in commits:
            data.append({
                'event_id':commit['sha'],
                'event_type':'commit',
                'repo_owner': repo['owner'],
                'repo_name': repo['repo_name'],
                'repo_url': repo['repo_url'],
                'is_private': repo['is_private'],
                'action': commit['commit']['message'],
                'commit_count': 1,
                'created_at': commit['commit']['author']['date'],
            }) 
    
    with open('github_data.json', 'w') as f:
        json.dump(data, f, indent=4)

    print('Data extracted successfully!\n')

    return