# pipeline/airflow-docker/dags/github_etl.py

''' Importing necessary modules and libraries'''
import sys
import os
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from modules.github_m import extract_github_data, transform_github_data, load_github_data


''' Defining the default arguments for this DAG '''
default_args = {
    'owner': 'PulseBoard Team',
    'retries': 10,
    'retry_delay': timedelta(minutes=2),
    'start_date': datetime(2025, 3, 25),
}

''' Defining the DAG '''
with DAG(
    'github_etl',
    default_args=default_args,
    description='ETL process for GitHub data using Airflow',
    schedule_interval=timedelta(minutes=60),
    catchup=False,
    tags=['github', 'etl'],

) as dag:
    
    ''' Defining tasks in the DAG'''

    # Task 1: Extract data from GitHub
    extract_data = PythonOperator(
        task_id= 'extract_data',
        python_callable=extract_github_data,
        dag=dag,
    )

    # Task 2: Transform data
    transform_data = PythonOperator(
        task_id = 'transform_data',
        python_callable=transform_github_data,
        dag=dag,
    )

    # Task 3: Load data
    load_data = PythonOperator(
        task_id = 'load_data',
        python_callable=load_github_data,
        dag=dag,
    )

    ''' Define the pipeline ordering '''
    extract_data >> transform_data >> load_data


