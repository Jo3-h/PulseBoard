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
        self.headers = {
            'Content-Type': 'application/json',
        }

    def perform_introspection_query(self):

        # define the GraphQL query
        query = f'''
                query {{
                    matchedUser(username: "{self.username}") {{
                        username
                        submitStats {{
                            acSubmissionNum {{
                                difficulty
                                count
                                submissions
                            }}
                        }}
                        userCalendar {{
                            streak
                            totalActiveDays
                        }}
                        submissionCalendar
                        recentSubmissions
                        profile {{
                            ranking
                            reputation
                            solutionCount
                        }}
                    }}
                }}
                '''
        
        response = requests.post(self.BASE_URL, headers=header, json={'query': query})
        print(json.dumps(response.json(), indent=4))

        return

    def get_language_stats(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "languageStats",
            'query':'''
                query languageStats($username: String!) {
                    matchedUser(username: $username) {
                        languageProblemCount {
                        languageName
                        problemsSolved
                        }
                    }
                }
            ''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}')
            print(json.dumps(response.json(), indent=4))
            return

        return response.json()

    def get_skill_stats(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "skillStats",
            'query':'''
                query skillStats($username: String!) {
                    matchedUser(username: $username) {
                        tagProblemCounts {
                        advanced {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                        intermediate {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                        fundamental {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                        }
                    }
                }
            ''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}')
            print(json.dumps(response.json(), indent=4))
            return
        
        return response.json()

        return
    
    def get_user_user_contest_ranking_info(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "userContestRankingInfo",
            'query':'''           
                query userContestRankingInfo($username: String!) {
                    userContestRanking(username: $username) {
                        attendedContestsCount
                        rating
                        globalRanking
                        totalParticipants
                        topPercentage
                        badge {
                        name
                        }
                    }
                    userContestRankingHistory(username: $username) {
                        attended
                        trendDirection
                        problemsSolved
                        totalProblems
                        finishTimeInSeconds
                        rating
                        ranking
                        contest {
                        title
                        startTime
                        }
                    }
                }
            ''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()

    def get_user_profile_user_question_progress_v2(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "userProfileUserQuestionProgressV2",
            'query':'''
                query userProfileUserQuestionProgressV2($userSlug: String!) {
                    userProfileUserQuestionProgressV2(userSlug: $userSlug) {
                        numAcceptedQuestions {
                        count
                        difficulty
                        }
                        numFailedQuestions {
                        count
                        difficulty
                        }
                        numUntouchedQuestions {
                        count
                        difficulty
                        }
                        userSessionBeatsPercentage {
                        difficulty
                        percentage
                        }
                        totalQuestionBeatsPercentage
                    }
                }
            ''',
            "variables": {
                "userSlug": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()
    
    def get_user_session_progress(self):
        
        # Define the GraphQL query payload
        payload = {
            "operationName": "userSessionProgress",
            'query':'''
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }
            ''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()

    def get_user_profile_calendar(self):

        # define the GraphQL query payload
        payload = {
            "operationName": "userProfileCalendar",
            "query": '''
                query userProfileCalendar($username: String!, $year: Int) {
                            matchedUser(username: $username) {
                                userCalendar(year: $year) {
                                activeYears
                                streak
                                totalActiveDays
                                dccBadges {
                                    timestamp
                                    badge {
                                    name
                                    icon
                                    }
                                }
                                submissionCalendar
                                }
                            }
                            }''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()
    
    def get_user_badges(self):

        # Define the GraphQL query payload
        payload = {
             'operationName': "userBadges",
             'query' : '''
                query userBadges($username: String!) {
                    matchedUser(username: $username) {
                        badges {
                        id
                        name
                        shortName
                        displayName
                        icon
                        hoverText
                        medal {
                            slug
                            config {
                            iconGif
                            iconGifBackground
                            }
                        }
                        creationDate
                        category
                        }
                        upcomingBadges {
                        name
                        icon
                        progress
                        }
                    }
                }
                ''',
             'variables': {
                 'username': self.username
             },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return

        return response.json()

    def get_user_public_profile(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "userPublicProfile",
            'query':'''
                query userPublicProfile($username: String!) {
                    matchedUser(username: $username) {
                        contestBadge {
                        name
                        expired
                        hoverText
                        icon
                        }
                        username
                        githubUrl
                        twitterUrl
                        linkedinUrl
                        profile {
                        ranking
                        userAvatar
                        realName
                        aboutMe
                        school
                        websites
                        countryName
                        company
                        jobTitle
                        skillTags
                        postViewCount
                        postViewCountDiff
                        reputation
                        reputationDiff
                        solutionCount
                        solutionCountDiff
                        categoryDiscussCount
                        categoryDiscussCountDiff
                        certificationLevel
                        }
                    }
                }
            ''',
            "variables": {
                "username": self.username
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()

    def get_user_recent_ac_submissions(self):

        # Define the GraphQL query payload
        payload = {
            "operationName": "recentAcSubmissions",
            'query':'''
                query recentAcSubmissions($username: String!, $limit: Int!) {
                    recentAcSubmissionList(username: $username, limit: $limit) {
                        id
                        title
                        titleSlug
                        timestamp
                    }
                }
            ''',
            "variables": {
                "username": self.username,
                "limit": 100
            },
        }

        # Make the request to GraphQL API
        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)

        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return
        
        return response.json()

def extract_leetcode_data():

    print('Extracting LeetCode data...  ', end='')

    # Extract the data from the LeetCode API
    api = leetcode_api(os.getenv('LEETCODE_USER'))

    data = api.get_user_recent_ac_submissions()
    print(json.dumps(data, indent=4))

    print('Data extracted successfully!\n')

    return