-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;

---------- RESUME TABLES

CREATE TABLE IF NOT EXISTS public.experience
(
	id serial NOT NULL,
	
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.education
(
	id serial NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.projects
(
	id serial NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.references
(
	id serial NOT NULL,
	name VARCHAR(30),
	phone_number VARCHAR(30),
	email VARCHAR(30),
	
	PRIMARY KEY (id)
);

---------- GITHUB TABLES

CREATE TABLE IF NOT EXISTS public.github_activity
(
    id serial NOT NULL,
    event_id VARCHAR(40) UNIQUE NOT NULL,
    event_type text NOT NULL,
	repo_owner text NOT NULL,
    repo_name text NOT NULL,
    repo_url text,
	is_private BOOLEAN DEFAULT False,
    action text,
    commit_count integer,
    created_at timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);

---------- LEETCODE TABLES

/*
Table to hold information on recent accepted submissions, solutions, and contest participation. 
Note that can only pull information on 15 most recent submissions and solutions.
*/
CREATE TABLE IF NOT EXISTS public.leetcode_activity
(
    id serial NOT NULL,
    event_id text UNIQUE NOT NULL,
    event_type text NOT NULL CHECK (event_type IN ('Submission','Solution','Contest','Discussion')),
    problem_name text,
	problem_description text,
    problem_url text,
    created_at timestamp without time zone NOT NULL DEFAULT NOW(),
    status text CHECK (status IN ('Accepted','Wrong Answer','Time Limit Exceeded', 'Submitted')),
    difficulty text,
	solution_name text,
	solution_content text,
    solution_url text,
	topics text,
	total_accepted VARCHAR(20),
	total_submissions VARCHAR(20),
	total_accepted_ratio VARCHAR(20),
	hits integer,
	likes integer,
	dislikes integer,
    PRIMARY KEY (id)
);

/*
Table to store user stats and summary data which is aggregations and counts of solutions rather than
invididual events.
*/
CREATE TABLE IF NOT EXISTS public.leetcode_summary
(
	id serial NOT NULL,
	username text,
	date DATE UNIQUE,
	accepted_easy integer,
	accepted_medium integer,
	accepted_hard integer,
	failed_easy integer,
	failed_medium integer, 
	failed_hard integer,
	untouched_easy integer,
	untouched_medium integer,
	untouched_hard integer,
	beats_easy double precision,
	beats_medium double precision,
	beats_hard double precision,
	ranking integer,
	PRIMARY KEY (id)
);

/*
Table to store information on badges received from leetcode and links to badge icons and gifs.
*/
CREATE TABLE IF NOT EXISTS public.leetcode_badges
(
	id serial NOT NULL,
	badge_id integer UNIQUE NOT NULL,
	badge_name text NOT NULL,
	icon text,
	icon_gif text,
	date_received date,
	PRIMARY KEY (id)
);

/*
Table to store full submission calendar to use for activity calendar on frontend
*/
CREATE TABLE IF NOT EXISTS public.leetcode_calendar
(
	id serial NOT NULL,
	date DATE UNIQUE,
	events integer, 
	PRIMARY KEY (id)
);

---------- STRAVA ACTIVITY

CREATE TABLE IF NOT EXISTS public.strava_activity
(
    id serial NOT NULL,
    activity_id text UNIQUE NOT NULL,
    activity_type text NOT NULL,
    name text NOT NULL,
	description text,
    distance_ms integer,
    duration_sec integer,
	elapsed_sec integer,
    start_time timestamp without time zone NOT NULL,
    average_pace double precision,
    elevation_gain double precision,
    map_polyline text,
	start_lat double precision,
	start_lon double precision,
	end_lat double precision,
	end_lon double precision,
	kudos_count integer,
	is_private boolean,
	calories double precision,
	max_speed double precision,
	achievement_count integer,
	comment_count integer,
	commute boolean,
    PRIMARY KEY (id)
);
END;