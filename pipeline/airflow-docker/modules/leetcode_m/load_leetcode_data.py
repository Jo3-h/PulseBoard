# modules/leetcode_m/load_leetcode_data.py

import os
import json
import psycopg2
from dotenv import load_dotenv
load_dotenv()

def load_leetcode_data():

    print('Loading LeetCode data...  ', end='')

    # Load the data from the transformed JSON file

    print('Data loaded successfully!\n')

    return