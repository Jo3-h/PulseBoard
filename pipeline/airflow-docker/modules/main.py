# main.py file for testing pipeline elements

''' Import Modules used in pipeline for testing '''
import sys
import os
from github_m import *

def main():

    print('Testing pipeline elements...\n')

    extract_github_data()

    transform_github_data()

    load_github_data()

    return

if __name__ == '__main__':
    main()