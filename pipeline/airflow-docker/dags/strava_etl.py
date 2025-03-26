# pipeline/airflow-docker/dags/strava_etl.py

''' Importing necessary modules and libraries '''
import sys
import os
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago, timedelta

''' Defining the default arguments for this DAG '''
default_args = {
    'owner': 'PulseBoard Team',
    'retries': 10,
    'retry_delay': timedelta(minutes=2),
    'start_date': days_ago(1),
}

''' Defining the DAG '''
with DAG(
    'strava_etl',
    default_args=default_args,
    description='ETL process for Strava data using Airflow',
    schedule_interval=timedelta(minutes=1),
    catchup=False,
    tags=['strava', 'etl'],

) as dag:
    
    ''' Defining the tasks in the DAG '''

    # Task 1: Extract data from Strava
    extract_data = PythonOperator(
        task_id = 'extract_data',
        python_callable=extract_strava_data,
        dag=dag,
    )

    # Task 2: Transform data
    transform_data = PythonOperator(
        task_id = 'transform_data',
        python_callable=transform_strava_data,
        dag=dag,
    )

    # Task 3: Load data
    load_data = PythonOperator(
        task_id = 'load_data',
        python_callable=load_strava_data,
        dag=dag,
    )

    ''' Define the pipeline ordering '''
    extract_data >> transform_data >> load_data