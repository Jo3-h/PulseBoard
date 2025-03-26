# modules/leetcode_m/extract_leetcode_data.py

import sys
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

class leetcode_api:

    def __init__(self, username):
        self.username = username
        self.BASE_URL = 'https://leetcode.com/graphql'

    def get_user_stats(self):
        return
    
    def get_user_submissions(self):
        return
    
    def get_user_submissions(self):
        return

def extract_leetcode_data():

    print('Extracting LeetCode data...  ', end='')

    # Extract the data from the LeetCode API
    api = leetcode_api(os.getenv('LEETCODE_USER'))



    print('Data extracted successfully!\n')

    return