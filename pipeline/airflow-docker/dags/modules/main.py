# main.py file for testing pipeline elements

''' Import Modules used in pipeline for testing '''
import sys
import os
from github_m import *
from leetcode_m import *
from strava_m import *

def main():

    tests = {
        'github':True,
        'leetcode':False,
        'strava':False,
    }

    print('---> Testing pipeline elements <---\n')

    if tests['github']:
        extract_github_data()
        transform_github_data()
        load_github_data()

    if tests['leetcode']:
        extract_leetcode_data()
        transform_leetcode_data()
        load_leetcode_data()
    
    if tests['strava']:
        extract_strava_data()
        transform_strava_data()
        load_strava_data()

    return

if __name__ == '__main__':
    main()