--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.widgets DROP CONSTRAINT widgets_user_id_fkey;
ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_submission_id_fkey;
ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_option_id_fkey;
ALTER TABLE ONLY public.submissions DROP CONSTRAINT submissions_poll_id_fkey;
ALTER TABLE ONLY public.polls DROP CONSTRAINT polls_creator_id_fkey;
ALTER TABLE ONLY public.options DROP CONSTRAINT options_poll_id_fkey;
ALTER TABLE ONLY public.widgets DROP CONSTRAINT widgets_pkey;
ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.submissions DROP CONSTRAINT submissions_pkey;
ALTER TABLE ONLY public.polls DROP CONSTRAINT polls_pkey;
ALTER TABLE ONLY public.options DROP CONSTRAINT options_pkey;
ALTER TABLE ONLY public.creators DROP CONSTRAINT creators_pkey;
ALTER TABLE public.widgets ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.votes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.submissions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.polls ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.options ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.creators ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.widgets_id_seq;
DROP TABLE public.widgets;
DROP SEQUENCE public.votes_id_seq;
DROP TABLE public.votes;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.submissions_id_seq;
DROP TABLE public.submissions;
DROP SEQUENCE public.polls_id_seq;
DROP TABLE public.polls;
DROP SEQUENCE public.options_id_seq;
DROP TABLE public.options;
DROP SEQUENCE public.creators_id_seq;
DROP TABLE public.creators;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: creators; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE creators (
    id integer NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE creators OWNER TO labber;

--
-- Name: creators_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE creators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE creators_id_seq OWNER TO labber;

--
-- Name: creators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE creators_id_seq OWNED BY creators.id;


--
-- Name: options; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE options (
    id integer NOT NULL,
    poll_id integer,
    option_name character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE options OWNER TO labber;

--
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE options_id_seq OWNER TO labber;

--
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE options_id_seq OWNED BY options.id;


--
-- Name: polls; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE polls (
    id integer NOT NULL,
    creator_id integer,
    title character varying(255) NOT NULL,
    name_required boolean NOT NULL,
    render_graph character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE polls OWNER TO labber;

--
-- Name: polls_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE polls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE polls_id_seq OWNER TO labber;

--
-- Name: polls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE polls_id_seq OWNED BY polls.id;


--
-- Name: submissions; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE submissions (
    id integer NOT NULL,
    poll_id integer,
    submitter_name character varying(255),
    "timestamp" timestamp without time zone DEFAULT now()
);


ALTER TABLE submissions OWNER TO labber;

--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE submissions_id_seq OWNER TO labber;

--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE submissions_id_seq OWNED BY submissions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE users OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO labber;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE votes (
    id integer NOT NULL,
    submission_id integer,
    option_id integer,
    rank smallint
);


ALTER TABLE votes OWNER TO labber;

--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE votes_id_seq OWNER TO labber;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE votes_id_seq OWNED BY votes.id;


--
-- Name: widgets; Type: TABLE; Schema: public; Owner: labber
--

CREATE TABLE widgets (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL
);


ALTER TABLE widgets OWNER TO labber;

--
-- Name: widgets_id_seq; Type: SEQUENCE; Schema: public; Owner: labber
--

CREATE SEQUENCE widgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE widgets_id_seq OWNER TO labber;

--
-- Name: widgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: labber
--

ALTER SEQUENCE widgets_id_seq OWNED BY widgets.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY creators ALTER COLUMN id SET DEFAULT nextval('creators_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY options ALTER COLUMN id SET DEFAULT nextval('options_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY polls ALTER COLUMN id SET DEFAULT nextval('polls_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY submissions ALTER COLUMN id SET DEFAULT nextval('submissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY votes ALTER COLUMN id SET DEFAULT nextval('votes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets ALTER COLUMN id SET DEFAULT nextval('widgets_id_seq'::regclass);


--
-- Data for Name: creators; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY creators (id, email) FROM stdin;
1	Brian@email.com
2	email2@eamil.com
\.


--
-- Name: creators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('creators_id_seq', 2, true);


--
-- Data for Name: options; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY options (id, poll_id, option_name, description) FROM stdin;
1	1	apple	this is a red fruit
2	1	orange	this fruit is orange
3	1	banana	wow a yellow fruit
4	2	pizza	extra cheese
5	2	burger	Mcdonalds
6	2	fried chicken	KFC
7	2	taco bell	um...sure
\.


--
-- Name: options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('options_id_seq', 7, true);


--
-- Data for Name: polls; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY polls (id, creator_id, title, name_required, render_graph, created_at) FROM stdin;
1	1	Favourite Fruit	t	column	2021-01-13 03:54:11.684889
2	1	Favourite Fast Food	f	pie	2021-01-13 03:54:11.684889
\.


--
-- Name: polls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('polls_id_seq', 2, true);


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY submissions (id, poll_id, submitter_name, "timestamp") FROM stdin;
1	1	Ash	2021-01-13 03:54:11.689332
2	1	Michael	2021-01-13 03:54:11.689332
3	1	Joe	2021-01-13 03:54:11.689332
4	2	Andy	2021-01-13 03:54:11.689332
5	2	Travis	2021-01-13 03:54:11.689332
6	2	Gary	2021-01-13 03:54:11.689332
\.


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('submissions_id_seq', 6, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY users (id, name) FROM stdin;
1	Alice
2	Kira
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('users_id_seq', 2, true);


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY votes (id, submission_id, option_id, rank) FROM stdin;
1	1	1	1
2	1	2	3
3	1	3	2
4	2	1	3
5	2	2	2
6	2	3	1
7	3	1	1
8	3	2	2
9	3	3	3
10	4	4	1
11	4	5	2
12	4	6	4
13	4	7	3
14	5	4	4
15	5	5	1
16	5	6	3
17	5	7	2
18	6	4	2
19	6	5	4
20	6	6	1
21	6	7	3
\.


--
-- Name: votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('votes_id_seq', 21, true);


--
-- Data for Name: widgets; Type: TABLE DATA; Schema: public; Owner: labber
--

COPY widgets (id, user_id, name) FROM stdin;
1	1	Sprockets
2	2	Chains
3	2	Bearings
\.


--
-- Name: widgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: labber
--

SELECT pg_catalog.setval('widgets_id_seq', 3, true);


--
-- Name: creators_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY creators
    ADD CONSTRAINT creators_pkey PRIMARY KEY (id);


--
-- Name: options_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- Name: polls_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_pkey PRIMARY KEY (id);


--
-- Name: submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: votes_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: widgets_pkey; Type: CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (id);


--
-- Name: options_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY options
    ADD CONSTRAINT options_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES polls(id);


--
-- Name: polls_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY polls
    ADD CONSTRAINT polls_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES creators(id);


--
-- Name: submissions_poll_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY submissions
    ADD CONSTRAINT submissions_poll_id_fkey FOREIGN KEY (poll_id) REFERENCES polls(id);


--
-- Name: votes_option_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT votes_option_id_fkey FOREIGN KEY (option_id) REFERENCES options(id);


--
-- Name: votes_submission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT votes_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES submissions(id);


--
-- Name: widgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: labber
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT widgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

