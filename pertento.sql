--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

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
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

--
-- Name: company_size; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.company_size AS ENUM (
    '1-10',
    '11-30',
    '31-50',
    '50+'
);


ALTER TYPE public.company_size OWNER TO postgres;

--
-- Name: company_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.company_type AS ENUM (
    'Client Account',
    'Agency'
);


ALTER TYPE public.company_type OWNER TO postgres;

--
-- Name: condition; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.condition AS ENUM (
    'equals',
    'starts with',
    'contains',
    'ends with',
    'matches regex',
    'not equals',
    'does not contain'
);


ALTER TYPE public.condition OWNER TO postgres;

--
-- Name: device; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.device AS ENUM (
    'All',
    'Desktop',
    'Mobile',
    'Tablet'
);


ALTER TYPE public.device OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status AS ENUM (
    'Draft',
    'Scheduled',
    'Running',
    'Stopped',
    'Ended'
);


ALTER TYPE public.status OWNER TO postgres;

--
-- Name: user_roles; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_roles AS ENUM (
    'Member',
    'Admin',
    'Owner',
    'Super Admin'
);


ALTER TYPE public.user_roles OWNER TO postgres;

--
-- Name: user_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_status AS ENUM (
    'Unverified',
    'Active',
    'Prospect',
    'Invited',
    'Blocked'
);


ALTER TYPE public.user_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: activity_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_log (
    id bigint NOT NULL,
    experiment_id bigint,
    user_id bigint,
    created_at bigint,
    message text
);


ALTER TABLE public.activity_log OWNER TO postgres;

--
-- Name: activity_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_log_id_seq OWNER TO postgres;

--
-- Name: activity_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_log_id_seq OWNED BY public.activity_log.id;


--
-- Name: changes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.changes (
    id bigint NOT NULL,
    variant_id bigint,
    user_id bigint,
    selector text,
    property text,
    value text,
    tag_name text,
    action text,
    created_at bigint,
    updated_at bigint,
    prev_value text,
    friendly_selector text,
    friendly_selector_index smallint,
    selectors json,
    friendly_selectors json,
    friendly_selectors_indexes json,
    tag_names json,
    prev_values json
);


ALTER TABLE public.changes OWNER TO postgres;

--
-- Name: changes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.changes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.changes_id_seq OWNER TO postgres;

--
-- Name: changes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.changes_id_seq OWNED BY public.changes.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id bigint NOT NULL,
    name text NOT NULL,
    type public.company_type DEFAULT 'Client Account'::public.company_type,
    size public.company_size DEFAULT '1-10'::public.company_size,
    parent_company_id bigint,
    gan_account_id bigint,
    created_by bigint,
    created_at bigint,
    updated_at bigint,
    friendly_name text
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: device_targeting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.device_targeting (
    id bigint NOT NULL,
    device public.device,
    experiment_id bigint,
    created_by bigint,
    created_at bigint
);


ALTER TABLE public.device_targeting OWNER TO postgres;

--
-- Name: device_targeting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.device_targeting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.device_targeting_id_seq OWNER TO postgres;

--
-- Name: device_targeting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.device_targeting_id_seq OWNED BY public.device_targeting.id;


--
-- Name: experiment_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiment_data (
    id bigint NOT NULL,
    website_id bigint,
    experiment_id bigint,
    variant_id bigint,
    event character varying(255),
    data json,
    "timestamp" bigint
);


ALTER TABLE public.experiment_data OWNER TO postgres;

--
-- Name: experiment_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiment_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experiment_data_id_seq OWNER TO postgres;

--
-- Name: experiment_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiment_data_id_seq OWNED BY public.experiment_data.id;


--
-- Name: experiments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiments (
    id bigint NOT NULL,
    name character varying(256) NOT NULL,
    created_by bigint,
    website_id bigint,
    editor_url character varying(512),
    starts_at bigint,
    ends_at bigint,
    status public.status DEFAULT 'Draft'::public.status,
    created_at bigint,
    updated_at bigint,
    event_goals json DEFAULT '[]'::json,
    final_visitor_count json,
    deleted bigint,
    archived bigint,
    company_id bigint,
    parent_company_id bigint
);


ALTER TABLE public.experiments OWNER TO postgres;

--
-- Name: experiments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experiments_id_seq OWNER TO postgres;

--
-- Name: experiments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiments_id_seq OWNED BY public.experiments.id;


--
-- Name: gan_event_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gan_event_tags (
    id bigint NOT NULL,
    gan_property_id bigint,
    name character varying(256),
    is_conversion boolean DEFAULT false
);


ALTER TABLE public.gan_event_tags OWNER TO postgres;

--
-- Name: gan_event_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gan_event_tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gan_event_tags_id_seq OWNER TO postgres;

--
-- Name: gan_event_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gan_event_tags_id_seq OWNED BY public.gan_event_tags.id;


--
-- Name: gan_oauth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gan_oauth (
    email character varying(256) NOT NULL,
    company_id bigint,
    name character varying(36),
    image character varying(256),
    refresh_token character varying(256),
    accounts_count smallint,
    last_refreshed bigint,
    refresh_count smallint DEFAULT 0
);


ALTER TABLE public.gan_oauth OWNER TO postgres;

--
-- Name: gan_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gan_properties (
    property_id bigint NOT NULL,
    display_name character varying(256),
    property_type character varying(128),
    account_id bigint,
    has_read_permission json DEFAULT '[]'::json,
    has_edit_permission json DEFAULT '[]'::json
);


ALTER TABLE public.gan_properties OWNER TO postgres;

--
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    id bigint NOT NULL,
    experiment_id bigint,
    variant_id bigint,
    "from" bigint,
    currency_code character varying(4),
    purchases integer,
    revenue bigint,
    website_id bigint
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- Name: purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchases_id_seq OWNER TO postgres;

--
-- Name: purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.purchases_id_seq OWNED BY public.purchases.id;


--
-- Name: url_targeting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url_targeting (
    id bigint NOT NULL,
    url text NOT NULL,
    condition public.condition,
    experiment_id bigint,
    created_by bigint,
    created_at bigint,
    updated_at bigint
);


ALTER TABLE public.url_targeting OWNER TO postgres;

--
-- Name: url_targeting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.url_targeting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.url_targeting_id_seq OWNER TO postgres;

--
-- Name: url_targeting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.url_targeting_id_seq OWNED BY public.url_targeting.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(256) NOT NULL,
    role public.user_roles DEFAULT 'Member'::public.user_roles,
    status public.user_status DEFAULT 'Unverified'::public.user_status,
    password character varying(256),
    first_name character varying(128),
    last_name character varying(128),
    avatar character varying(512000),
    company_id bigint,
    invited_by bigint,
    created_at bigint,
    updated_at bigint,
    parent_company_id bigint
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: variants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variants (
    id bigint NOT NULL,
    name character varying(256) NOT NULL,
    experiment_id bigint,
    created_by bigint,
    weight smallint,
    global_javascript text,
    global_css text,
    created_at bigint,
    updated_at bigint,
    gan_audience_id bigint,
    website_id bigint,
    company_id bigint,
    parent_company_id bigint
);


ALTER TABLE public.variants OWNER TO postgres;

--
-- Name: variants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.variants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.variants_id_seq OWNER TO postgres;

--
-- Name: variants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.variants_id_seq OWNED BY public.variants.id;


--
-- Name: visitor_count; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visitor_count (
    id bigint NOT NULL,
    experiment_id bigint,
    variant_id bigint,
    count bigint DEFAULT 0
);


ALTER TABLE public.visitor_count OWNER TO postgres;

--
-- Name: visitor-count_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."visitor-count_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."visitor-count_id_seq" OWNER TO postgres;

--
-- Name: visitor-count_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."visitor-count_id_seq" OWNED BY public.visitor_count.id;


--
-- Name: websites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.websites (
    id bigint NOT NULL,
    company_id bigint,
    url character varying(256) NOT NULL,
    gan_property_id bigint,
    gan_measurement_id character varying(32),
    deleted boolean DEFAULT false,
    server_container_url character varying(256),
    parent_company_id bigint
);


ALTER TABLE public.websites OWNER TO postgres;

--
-- Name: websites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.websites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.websites_id_seq OWNER TO postgres;

--
-- Name: websites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.websites_id_seq OWNED BY public.websites.id;


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: activity_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_log ALTER COLUMN id SET DEFAULT nextval('public.activity_log_id_seq'::regclass);


--
-- Name: changes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.changes ALTER COLUMN id SET DEFAULT nextval('public.changes_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: device_targeting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.device_targeting ALTER COLUMN id SET DEFAULT nextval('public.device_targeting_id_seq'::regclass);


--
-- Name: experiment_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiment_data ALTER COLUMN id SET DEFAULT nextval('public.experiment_data_id_seq'::regclass);


--
-- Name: experiments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiments ALTER COLUMN id SET DEFAULT nextval('public.experiments_id_seq'::regclass);


--
-- Name: gan_event_tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gan_event_tags ALTER COLUMN id SET DEFAULT nextval('public.gan_event_tags_id_seq'::regclass);


--
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases ALTER COLUMN id SET DEFAULT nextval('public.purchases_id_seq'::regclass);


--
-- Name: url_targeting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_targeting ALTER COLUMN id SET DEFAULT nextval('public.url_targeting_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: variants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variants ALTER COLUMN id SET DEFAULT nextval('public.variants_id_seq'::regclass);


--
-- Name: visitor_count id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitor_count ALTER COLUMN id SET DEFAULT nextval('public."visitor-count_id_seq"'::regclass);


--
-- Name: websites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.websites ALTER COLUMN id SET DEFAULT nextval('public.websites_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	768f1a68badb914c41d363e6f5c9eea972d6ff7e628526ac87fa04880f71642e	1696630973217
2	c744b7c6efcdff16211c2225c979a7e82b10e61400c8f4529678f05780d0d0cc	1696631783193
3	76f37330a38638627b08259e60c515c69ff7bd7112588a599a9005a6989a295d	1696632000265
4	3b19435779f12a11688b42134c55f0924de511f9f255fcb061bb4478bbba3a09	1696701123640
5	fd2cb8a6bc699029e1af44c681bfd5276c9f4603213d9b71d449262f9730220a	1696709037231
6	0823a8d184c1784e85ddeebd33be6d8f910ec99dca71a14ae221b7c250d913bc	1696709079785
7	0aa2d7ae18d88f088f2d44af95358bf1910731b1366c3c9870d0d5a48f380d24	1696709117479
8	8dfa5cf8f8f6c67182f1102982565709cd8079ff74152f8c6d26d5dec5205e72	1696711311132
9	dd587d311b024c5aa9c49209e13bb48338a0d08545447e4a11e2a9fd38de470e	1696767960528
10	c49eb3703f053df28a11acfc0474f3356cf6c7a91ee1bc798e07e45adc5801ee	1696768063866
11	820610050666f1cf4a68bcbd4573ab42de94b81407f632a4a7c30e27c25271f8	1696768212875
12	948a3fd944ba359cf433da790c3e72b3741fccd4c13fdc4be5a23ac289a5403c	1696768984596
13	6e763947f69da4baddbde553130fffbed42f75560f2df66cabba38e2908bea3a	1696769035020
14	1d10f445525189c5c130e3edfcc1c16f77f562fdc15d41a13b7aa1b56c80dc0d	1696797293925
15	42a8dbdfd2b97480ee5512ec5d2a20192ce0b70a9a517debac75cdd857f737e1	1696801455033
16	ba45e73c46da120881ad46242a5bea9f95f4c50aa42122b7eb8e829065e14465	1696845268121
17	b286a5362bbb1d68293ea8a3d1105ce3942dd7d857a66c5c87cb7181ab032354	1696845358754
18	81234136b2ea6ade8ffa11c47cad39e154d931eda882b5996d1a740392dbbdbf	1696845469779
19	0c2210b56e1d130f8fad0660d3a97376d6cecfae88764325afe879500797aaf0	1697159187769
20	06361e6f2341ba284fc26f487c6bf8571c7497aca79bb60b5bd12dbdef0a2230	1697777283666
21	0a0d8ca3520291281b901c1d3ac64f019ceb93e0ad0254d64c1a2315bbbc49e7	1697779391579
22	3ecd3c5e4d34c5631ed0dfd8147a054427506a76f847e1352c25d53c0290836c	1697875569072
23	a945f3a311621520e7408451af7539d2b98160ba432fc0da977dace71e5a4f80	1698598045255
24	98289ef93267776a1032171ef9a3e72f8bdc7f8916dd49ff9515b2e3732e97be	1698850459236
25	cc161f509df83dd59f37b2a52b16877839580bdf3d801d516e0ca1f65e592546	1698850494254
26	b756e79596f381c027edd7528e1a991184fb3c1a1aa493cfd93fd526081db202	1698863458582
27	7814a4cd44f11ab244401f6df28d04f03733c58d4a6f00634d59f0e19a6f9b07	1699193169906
28	e3941f5b2c78c154c85d54299a05e7eaabe0967ccf18b62bd5b7847c334774a6	1699291163454
29	6f9e7d6b1e8a968f6c88a132455f9ee67447170f21c2c7d44a1426895bae2145	1699821629558
30	4aacf0baa2af05e533aab1d13b1be0b273495f06549a8a841f59af1a16965ea4	1700208302452
31	60c88d36242b73e887f5eb91fdd0fb29096935a904190436f43c4fd4122ed296	1701037257644
32	b0540a5ca3e5e570ca684e8feebee8fb38c2dc6fcae15da006b7164889aacc96	1701795957729
33	7b33d23744af79c13bb444590aff3ee4af1f90f587ace1cbb4ae4e384c2c51a0	1701798642987
34	6eac1d599517c4bd3c8a31d8d0927d813250b07439fd1142ee8c01e7d2c53a8a	1701900718613
35	3dde08d1839d6755a1c67961173f00509556ed18a51e0420e5603154b58e9c11	1701900754225
36	49b8076f2ebdb4471254c3d37821f0a6e049e36452490d17f5f4e5249728144c	1709033968703
37	10d07690a1eadc577acafa63cc9caaa785ac9eb92e492ff131bfa3cbe520743a	1712154255667
38	c091523a336680811e553b543418e5f71303c236d56d500264bb5599dc7c508f	1713903557767
39	f0e955777a7e8f34b35896117c49296b3272aece36bc8c79749eceef8216f381	1714568906793
\.


--
-- Data for Name: activity_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_log (id, experiment_id, user_id, created_at, message) FROM stdin;
\.


--
-- Data for Name: changes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.changes (id, variant_id, user_id, selector, property, value, tag_name, action, created_at, updated_at, prev_value, friendly_selector, friendly_selector_index, selectors, friendly_selectors, friendly_selectors_indexes, tag_names, prev_values) FROM stdin;
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, type, size, parent_company_id, gan_account_id, created_by, created_at, updated_at, friendly_name) FROM stdin;
682	Pertento	Client Account	11-30	1	\N	\N	\N	\N	Pertento
1	Converdiant	Agency	1-10	0	\N	4	1696259829708	1696259829708	Converdiant
\.


--
-- Data for Name: device_targeting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.device_targeting (id, device, experiment_id, created_by, created_at) FROM stdin;
\.


--
-- Data for Name: experiment_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiment_data (id, website_id, experiment_id, variant_id, event, data, "timestamp") FROM stdin;
\.


--
-- Data for Name: experiments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiments (id, name, created_by, website_id, editor_url, starts_at, ends_at, status, created_at, updated_at, event_goals, final_visitor_count, deleted, archived, company_id, parent_company_id) FROM stdin;
\.


--
-- Data for Name: gan_event_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gan_event_tags (id, gan_property_id, name, is_conversion) FROM stdin;
\.


--
-- Data for Name: gan_oauth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gan_oauth (email, company_id, name, image, refresh_token, accounts_count, last_refreshed, refresh_count) FROM stdin;
\.


--
-- Data for Name: gan_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gan_properties (property_id, display_name, property_type, account_id, has_read_permission, has_edit_permission) FROM stdin;
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (id, experiment_id, variant_id, "from", currency_code, purchases, revenue, website_id) FROM stdin;
\.


--
-- Data for Name: url_targeting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url_targeting (id, url, condition, experiment_id, created_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, role, status, password, first_name, last_name, avatar, company_id, invited_by, created_at, updated_at, parent_company_id) FROM stdin;
1	super@pertento.ai	Super Admin	Active	$argon2id$v=19$m=65536,t=3,p=4$oxikokZzU65dci0ciLaqOQ$UCh1VS3byBlP+dQ9Y91goszTvPlJ/u8Fc3Ow+PO+mmA	Super	User	data:image/png;base64,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	1	\N	1696259829708	1716120038724	0
\.


--
-- Data for Name: variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variants (id, name, experiment_id, created_by, weight, global_javascript, global_css, created_at, updated_at, gan_audience_id, website_id, company_id, parent_company_id) FROM stdin;
\.


--
-- Data for Name: visitor_count; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visitor_count (id, experiment_id, variant_id, count) FROM stdin;
\.


--
-- Data for Name: websites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.websites (id, company_id, url, gan_property_id, gan_measurement_id, deleted, server_container_url, parent_company_id) FROM stdin;
2811	682	https://testing001.pertento.ai/	\N	\N	f	\N	1
2812	682	https://testing002.pertento.ai/	\N	\N	f	\N	1
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 39, true);


--
-- Name: activity_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_log_id_seq', 5874, true);


--
-- Name: changes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.changes_id_seq', 5975, true);


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 682, true);


--
-- Name: device_targeting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.device_targeting_id_seq', 645, true);


--
-- Name: experiment_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiment_data_id_seq', 1120432, true);


--
-- Name: experiments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiments_id_seq', 1216, true);


--
-- Name: gan_event_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gan_event_tags_id_seq', 3274, true);


--
-- Name: purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchases_id_seq', 421675, true);


--
-- Name: url_targeting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.url_targeting_id_seq', 1096, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 144, true);


--
-- Name: variants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variants_id_seq', 2494, true);


--
-- Name: visitor-count_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."visitor-count_id_seq"', 4579, true);


--
-- Name: websites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.websites_id_seq', 2812, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: activity_log activity_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_log
    ADD CONSTRAINT activity_log_pkey PRIMARY KEY (id);


--
-- Name: changes changes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.changes
    ADD CONSTRAINT changes_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: device_targeting device_targeting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.device_targeting
    ADD CONSTRAINT device_targeting_pkey PRIMARY KEY (id);


--
-- Name: experiment_data experiment_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiment_data
    ADD CONSTRAINT experiment_data_pkey PRIMARY KEY (id);


--
-- Name: experiments experiments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiments
    ADD CONSTRAINT experiments_pkey PRIMARY KEY (id);


--
-- Name: gan_event_tags gan_event_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gan_event_tags
    ADD CONSTRAINT gan_event_tags_pkey PRIMARY KEY (id);


--
-- Name: gan_oauth gan_oauth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gan_oauth
    ADD CONSTRAINT gan_oauth_pkey PRIMARY KEY (email);


--
-- Name: gan_properties gan_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gan_properties
    ADD CONSTRAINT gan_properties_pkey PRIMARY KEY (property_id);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: url_targeting url_targeting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_targeting
    ADD CONSTRAINT url_targeting_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: variants variants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variants
    ADD CONSTRAINT variants_pkey PRIMARY KEY (id);


--
-- Name: visitor_count visitor-count_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitor_count
    ADD CONSTRAINT "visitor-count_pkey" PRIMARY KEY (id);


--
-- Name: websites websites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.websites
    ADD CONSTRAINT websites_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

