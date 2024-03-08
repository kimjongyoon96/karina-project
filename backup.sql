--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: kimjongyoon
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO kimjongyoon;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: kimjongyoon
--

CREATE TABLE public.comments (
    commentid integer NOT NULL,
    username character varying(255),
    postuuid uuid,
    text text,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO kimjongyoon;

--
-- Name: comments_commentid_seq; Type: SEQUENCE; Schema: public; Owner: kimjongyoon
--

CREATE SEQUENCE public.comments_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_commentid_seq OWNER TO kimjongyoon;

--
-- Name: comments_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kimjongyoon
--

ALTER SEQUENCE public.comments_commentid_seq OWNED BY public.comments.commentid;


--
-- Name: karina; Type: TABLE; Schema: public; Owner: kimjongyoon
--

CREATE TABLE public.karina (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    menubar character varying(255),
    title character varying(255),
    photosumnail character varying(255),
    photos text[],
    user_id integer
);


ALTER TABLE public.karina OWNER TO kimjongyoon;

--
-- Name: karina_id_seq; Type: SEQUENCE; Schema: public; Owner: kimjongyoon
--

CREATE SEQUENCE public.karina_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.karina_id_seq OWNER TO kimjongyoon;

--
-- Name: karina_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kimjongyoon
--

ALTER SEQUENCE public.karina_id_seq OWNED BY public.karina.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: kimjongyoon
--

CREATE TABLE public.likes (
    likeid integer NOT NULL,
    username character varying(255),
    postid uuid,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.likes OWNER TO kimjongyoon;

--
-- Name: likes_likeid_seq; Type: SEQUENCE; Schema: public; Owner: kimjongyoon
--

CREATE SEQUENCE public.likes_likeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_likeid_seq OWNER TO kimjongyoon;

--
-- Name: likes_likeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kimjongyoon
--

ALTER SEQUENCE public.likes_likeid_seq OWNED BY public.likes.likeid;


--
-- Name: userinfo; Type: TABLE; Schema: public; Owner: kimjongyoon
--

CREATE TABLE public.userinfo (
    id integer NOT NULL,
    username character varying(255),
    useremail character varying(255) NOT NULL
);


ALTER TABLE public.userinfo OWNER TO kimjongyoon;

--
-- Name: userinfo_id_seq; Type: SEQUENCE; Schema: public; Owner: kimjongyoon
--

CREATE SEQUENCE public.userinfo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.userinfo_id_seq OWNER TO kimjongyoon;

--
-- Name: userinfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kimjongyoon
--

ALTER SEQUENCE public.userinfo_id_seq OWNED BY public.userinfo.id;


--
-- Name: comments commentid; Type: DEFAULT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.comments ALTER COLUMN commentid SET DEFAULT nextval('public.comments_commentid_seq'::regclass);


--
-- Name: karina id; Type: DEFAULT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.karina ALTER COLUMN id SET DEFAULT nextval('public.karina_id_seq'::regclass);


--
-- Name: likes likeid; Type: DEFAULT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.likes ALTER COLUMN likeid SET DEFAULT nextval('public.likes_likeid_seq'::regclass);


--
-- Name: userinfo id; Type: DEFAULT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.userinfo ALTER COLUMN id SET DEFAULT nextval('public.userinfo_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: kimjongyoon
--

COPY public.comments (commentid, username, postuuid, text, creationdate) FROM stdin;
\.


--
-- Data for Name: karina; Type: TABLE DATA; Schema: public; Owner: kimjongyoon
--

COPY public.karina (id, uuid, menubar, title, photosumnail, photos, user_id) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: kimjongyoon
--

COPY public.likes (likeid, username, postid, creationdate) FROM stdin;
\.


--
-- Data for Name: userinfo; Type: TABLE DATA; Schema: public; Owner: kimjongyoon
--

COPY public.userinfo (id, username, useremail) FROM stdin;
\.


--
-- Name: comments_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: kimjongyoon
--

SELECT pg_catalog.setval('public.comments_commentid_seq', 1, false);


--
-- Name: karina_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kimjongyoon
--

SELECT pg_catalog.setval('public.karina_id_seq', 1, false);


--
-- Name: likes_likeid_seq; Type: SEQUENCE SET; Schema: public; Owner: kimjongyoon
--

SELECT pg_catalog.setval('public.likes_likeid_seq', 1, false);


--
-- Name: userinfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kimjongyoon
--

SELECT pg_catalog.setval('public.userinfo_id_seq', 1, false);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (commentid);


--
-- Name: karina karina_pkey; Type: CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.karina
    ADD CONSTRAINT karina_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (likeid);


--
-- Name: userinfo userinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.userinfo
    ADD CONSTRAINT userinfo_pkey PRIMARY KEY (id);


--
-- Name: userinfo userinfo_useremail_key; Type: CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.userinfo
    ADD CONSTRAINT userinfo_useremail_key UNIQUE (useremail);


--
-- Name: karina karina_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kimjongyoon
--

ALTER TABLE ONLY public.karina
    ADD CONSTRAINT karina_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.userinfo(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: kimjongyoon
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

