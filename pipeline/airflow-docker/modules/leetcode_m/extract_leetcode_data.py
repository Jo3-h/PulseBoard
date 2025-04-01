# modules/leetcode_m/extract_leetcode_data.py

import sys
import os
import requests
import json
from dotenv import load_dotenv
import time
from datetime import datetime 

load_dotenv()

class leetcode_api:

    def __init__(self, username):
        self.username = username
        self.BASE_URL = 'https://leetcode.com/graphql'
        self.URL = 'https://leetcode.com/'
        self.headers = {
            'Content-Type': 'application/json',
        }
        self.profile_url = f'https://leetcode.com/u/{self.username}/' # https://leetcode.com/u/Jo3-h/

    # Private method to extract question data
    def __extract_question_data(self, titleSlug):

        # URL to webscrape
        return_payload = {
            'description': None,
            'difficulty': None,
            'topics': None,
            'stats': None,
            'likes': None,
            'dislikes': None,
        }

        payload = {
            "operationName":"questionData",
            "variables":{
                "titleSlug": titleSlug
            },
            "query": '''query questionData($titleSlug: String!){ 
                            question(titleSlug: $titleSlug) {
                                questionId
                                content
                                difficulty
                                likes
                                dislikes
                                topicTags {
                                    name
                                }
                                stats
                            }
                        }'''
        }

        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)
        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return return_payload
        
        question = response.json()['data']['question']

        return_payload['description'] = question['content']
        return_payload['difficulty'] = question['difficulty']
        return_payload['topics'] = ', '.join(tag['name'] for tag in question['topicTags'])
        return_payload['stats'] = question['stats']
        return_payload['likes'] = question['likes']
        return_payload['dislikes'] = question['dislikes']

        return return_payload

    def __extract_solution_data(self, topicId):

        return_payload = {
            'event_id': None,
            'event_type': 'Solution',
            'timestamp': None,
            'solution_name': None,
            'slug': None,
            'topics': None,
            'content':None,
        }

        payload = {
            "operationName":"ugcArticleSolutionArticle",
            "variables": {
                "topicId" : topicId,
            },
            'query':'''query ugcArticleSolutionArticle($articleId: ID, $topicId: ID) {
                            ugcArticleSolutionArticle(articleId: $articleId, topicId: $topicId) {
                                ...ugcSolutionArticleFragment
                                content
                                isSerialized
                                isAuthorArticleReviewer
                                scoreInfo {
                                scoreCoefficient
                                }
                                prev {
                                uuid
                                slug
                                topicId
                                title
                                }
                                next {
                                uuid
                                slug
                                topicId
                                title
                                }
                            }
                            }
                                
                                fragment ugcSolutionArticleFragment on SolutionArticleNode {
                            uuid
                            title
                            slug
                            summary
                            author {
                                realName
                                userAvatar
                                userSlug
                                userName
                                nameColor
                                certificationLevel
                                activeBadge {
                                icon
                                displayName
                                }
                            }
                            articleType
                            thumbnail
                            summary
                            createdAt
                            updatedAt
                            status
                            isLeetcode
                            canSee
                            canEdit
                            isMyFavorite
                            chargeType
                            myReactionType
                            topicId
                            hitCount
                            hasVideoArticle
                            reactions {
                                count
                                reactionType
                            }
                            title
                            slug
                            tags {
                                name
                                slug
                                tagType
                            }
                            topic {
                                id
                                topLevelCommentCount
                            }
                        }'''
        }

        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)
        if response.status_code != 200:
            print(f'Error: {response.status_code}, {response.text}')
            return return_payload
        
        solution = response.json()['data']['ugcArticleSolutionArticle']
        return_payload['event_id'] = topicId
        return_payload['solution_name'] = solution['title']
        return_payload['slug'] = solution['slug']
        return_payload['topics'] = ', '.join(tag['name'] for tag in solution['tags'])
        return_payload['content'] = solution['content']
        return_payload['timestamp'] = solution['createdAt']

        return return_payload

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
            return {}

        return response.json()['data']['matchedUser']['badges']

    # Endpoints needing web scraping
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
        
        return response.json()['data']['recentAcSubmissionList']

    def get_user_recent_solutions(self):

        payload = {
            "operationName": "ugcArticleUserSolutionArticles",
            'variables': {
                "username": self.username,
                "orderBy": "MOST_RECENT",
                "skip": 0,
                "first": 30
            },
            'query': '''
                    query ugcArticleUserSolutionArticles($username: String!, $orderBy: ArticleOrderByEnum, $skip: Int, $before: String, $after: String, $first: Int, $last: Int) {
                        ugcArticleUserSolutionArticles(
                            username: $username
                            orderBy: $orderBy
                            skip: $skip
                            before: $before
                            after: $after
                            first: $first
                            last: $last
                        ) {
                            totalNum
                            pageInfo {
                            hasNextPage
                            }
                            edges {
                            node {
                                topicId
                                uuid
                                title
                                slug
                                topicId
                                createdAt
                                hitCount
                                questionSlug
                                questionTitle
                                reactions {
                                count
                                reactionType
                                }
                            }
                        }
                    }
                }
            ''',
        }

        response = requests.post(self.BASE_URL, headers=self.headers, json=payload)
        if response.status_code != 200:
            print(f'Error: {response.status_code}')
            print(json.dumps(response.json(), indent=4))
            return {}

        solutions = response.json()['data']['ugcArticleUserSolutionArticles']['edges']
        return_payload = []
        for solution in solutions:
            return_payload.append(solution['node'])

        return return_payload


    # Endpoints to be processed

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
        
        return response.json()['data']['userProfileUserQuestionProgressV2']

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

    def extract_data(self):

        return_payload = {}
        
        # Extract the data from the LeetCode API
        return_payload['badges'] = self.get_user_badges()
        
        # Extract recent submission data
        recent_submissions = self.get_user_recent_ac_submissions()
        return_payload['recent_ac_submissions'] = []
        if recent_submissions:
            for submission in recent_submissions:

                # Extract the relevant data from the submission
                question_data = self.__extract_question_data(submission['titleSlug'])

                return_payload['recent_ac_submissions'].append({
                    'event_id': submission['id'],
                    'event_type': 'Submission',
                    'problem_name': submission['title'],
                    'problem_description':question_data['description'],
                    'problem_url': f'{self.URL}problems/{submission["titleSlug"]}/',
                    'status': 'Accepted',
                    'difficulty': question_data['difficulty'],
                    'timestamp': submission['timestamp'],
                    'solution_url':'',
                    'topics':question_data['topics'],
                    'stats':question_data['stats'],
                    'likes':question_data['likes'],
                    'dislikes':question_data['dislikes'],
                })
                break

        
        # Extract recent solution data
        recent_solutions = self.get_user_recent_solutions()
        return_payload['recent_solutions'] = []
        for solution in recent_solutions:

            solution_data = self.__extract_solution_data(solution['topicId'])
            return_payload['recent_solutions'].append({
                'event_id': solution['topicId'],
                'event_type': 'Solution',
                'problem_name': solution['questionTitle'],
                'problem_description': '',
                'problem_url': f'{self.URL}problems/{solution["questionSlug"]}/description/',
                'difficulty': '',
                'timestamp': solution['createdAt'],
                'solution_name': solution['title'],
                'solution_content': solution_data['content'],
                'solution_url': f'{self.URL}problems/{solution["questionSlug"]}/{solution['topicId']}/{solution['slug']}',
                'topics': solution_data['topics'],
                'hits': solution['hitCount'],
                'likes':0,
                'dislikes':0,
            })
            break

        # Extract profile summary information
        return_payload['summary'] = {
            'username': self.username,
            'data': self.get_user_profile_user_question_progress_v2(),
            }

        # extract calendar data
        return_payload['calendar'] = self.get_user_profile_calendar()

        return return_payload

def extract_leetcode_data():

    print('Extracting LeetCode data...  ', end='')

    # Extract the data from the LeetCode API
    api = leetcode_api(os.getenv('LEETCODE_USER'))

    data = api.extract_data()

    with open('leetcode_data.json', 'w') as f:
        json.dump(data, f, indent=4)

    print('Data extracted successfully!\n')

    return
