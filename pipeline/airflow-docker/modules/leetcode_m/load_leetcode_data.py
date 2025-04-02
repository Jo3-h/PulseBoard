# modules/leetcode_m/load_leetcode_data.py

import os
import json
import psycopg2
from dotenv import load_dotenv
load_dotenv()

def execute_query(t: str, cursor, record):

    if t == 'badges':
        cursor.execute(
            """
            INSERT INTO leetcode_badges (badge_id, badge_name, icon, icon_gif, date_received)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (badge_id)
            DO UPDATE SET
                badge_id = EXCLUDED.badge_id,
                badge_name = EXCLUDED.badge_name,
                icon = EXCLUDED.icon,
                icon_gif = EXCLUDED.icon_gif,
                date_received = EXCLUDED.date_received;
            """
            , (
                record['badge_id'],
                record['badge_name'],
                record['icon'],
                record['icon_gif'],
                record['date_received']
            )
        )
    
    elif t == 'events':
        cursor.execute(
            """
            INSERT INTO leetcode_activity (event_id, event_type, problem_name, problem_description, problem_url, created_at, status, difficulty, solution_name, solution_content, solution_url, topics, total_accepted, total_submissions, total_accepted_ratio, hits, likes, dislikes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (event_id)
            DO UPDATE SET
                event_id = EXCLUDED.event_id,
                event_type = EXCLUDED.event_type,
                problem_name = EXCLUDED.problem_name,
                problem_description = EXCLUDED.problem_description,
                problem_url = EXCLUDED.problem_url,
                created_at = EXCLUDED.created_at, 
                status = EXCLUDED.status,
                difficulty = EXCLUDED.difficulty,
                solution_name = EXCLUDED.solution_name,
                solution_content = EXCLUDED.solution_content,
                solution_url = EXCLUDED.solution_url,
                topics = EXCLUDED.topics,
                total_accepted = EXCLUDED.total_accepted,
                total_submissions = EXCLUDED.total_submissions,
                total_accepted_ratio = EXCLUDED.total_accepted_ratio,
                hits = EXCLUDED.hits, 
                likes = EXCLUDED.likes,
                dislikes = EXCLUDED.dislikes;
            """
            , (
                record['event_id'],
                record['event_type'],
                record['problem_name'],
                record['problem_description'],
                record['problem_url'],
                record['created_at'],
                record['status'],
                record['difficulty'],
                record['solution_name'],
                record['solution_content'],
                record['solution_url'],
                record['topics'],
                record['total_accepted'],
                record['total_submissions'],
                record['total_accepted_ratio'],
                record['hits'],
                record['likes'],
                record['dislikes']
            )
        )

    elif t == 'users':
        cursor.execute(
            """
            INSERT INTO leetcode_summary (username, date, accepted_easy, accepted_medium, accepted_hard, failed_easy, failed_medium, failed_hard, untouched_easy, untouched_medium, untouched_hard, beats_easy, beats_medium, beats_hard, ranking)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (date)
            DO UPDATE SET
                username = EXCLUDED.username,
                date = EXCLUDED.date,
                accepted_easy = EXCLUDED.accepted_easy,
                accepted_medium = EXCLUDED.accepted_medium,
                accepted_hard = EXCLUDED.accepted_hard,
                failed_easy = EXCLUDED.failed_easy,
                failed_medium = EXCLUDED.failed_medium,
                failed_hard = EXCLUDED.failed_hard,
                untouched_easy = EXCLUDED.untouched_easy,
                untouched_medium = EXCLUDED.untouched_medium,
                untouched_hard = EXCLUDED.untouched_hard,
                beats_easy = EXCLUDED.beats_easy,
                beats_medium = EXCLUDED.beats_medium,
                beats_hard = EXCLUDED.beats_hard,
                ranking = EXCLUDED.ranking;
            """
            , (
                record['username'],
                record['date'],
                record['accepted_easy'],
                record['accepted_medium'],
                record['accepted_hard'],
                record['failed_easy'],
                record['failed_medium'],
                record['failed_hard'],
                record['untouched_easy'],
                record['untouched_medium'],
                record['untouched_hard'],
                record['beats_easy'],
                record['beats_medium'],
                record['beats_hard'],
                record['ranking']
            )
        )

    elif t == 'calendars':
        cursor.execute(
            """
            INSERT INTO leetcode_calendar (date, events)
            VALUES (%s, %s)
            ON CONFLICT (date)
            DO UPDATE SET
                date = EXCLUDED.date,
                events = EXCLUDED.events;
            """
            , (
                record['date'],
                record['events']
            )
        )

    return 

def load_data(file_name: str, t: str, connection):

    # load the file data
    with open(file_name, 'r') as file:
        data = json.load(file)

    print(f'\t-> Loading {t} data from {file_name}... ', end='')

    # try using the connection to database to load data
    try:
        cursor = connection.cursor()

        for record in data:
            execute_query(t, cursor, record)
        
        connection.commit()

        print('\033[92mSuccess!\033[0m')
    
    except Exception as e:

        print(f'\033[91mAn error occurred {e}\033[0m')
        if connection:
            connection.rollback()

    finally:

        if cursor:
            cursor.close()

    return

def load_leetcode_data():

    print('Loading LeetCode data...\n')

    # create a connection to the postgres db
    connection = psycopg2.connect(
        dbname = os.getenv('DB_NAME'),
        user = os.getenv('DB_USER'),
        password = os.getenv('DB_PASS'),
        host = os.getenv('DB_HOST'),
        port = os.getenv('DB_PORT')
    )

    # import data for each of the transformed files
    load_data('leetcode_badges_data.json', 'badges', connection)
    load_data('leetcode_event_data.json', 'events', connection)
    load_data('leetcode_user_data.json', 'users', connection)
    load_data('leetcode_calendar_data.json', 'calendars', connection)

    if connection:
        connection.close()

    # log the finish of the process
    print('\nData loaded successfully!\n')

    return