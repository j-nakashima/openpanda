-- ---------------------------------------------------------------------------
-- ASSIGNMENT_ASSIGNMENT
-- ---------------------------------------------------------------------------

CREATE TABLE ASSIGNMENT_ASSIGNMENT
(
    ASSIGNMENT_ID VARCHAR2 (99) NOT NULL,
	CONTEXT VARCHAR2 (99),
    XML LONG
);

CREATE UNIQUE INDEX ASSIGNMENT_ASSIGNMENT_INDEX ON ASSIGNMENT_ASSIGNMENT
(
	ASSIGNMENT_ID
);

CREATE INDEX ASSIGNMENT_ASSIGNMENT_CONTEXT ON ASSIGNMENT_ASSIGNMENT
(
	CONTEXT
);

-- ---------------------------------------------------------------------------
-- ASSIGNMENT_CONTENT
-- ---------------------------------------------------------------------------

CREATE TABLE ASSIGNMENT_CONTENT
(
    CONTENT_ID VARCHAR2 (99) NOT NULL,
	CONTEXT VARCHAR2 (99),
    XML LONG
);

CREATE UNIQUE INDEX ASSIGNMENT_CONTENT_INDEX ON ASSIGNMENT_CONTENT
(
	CONTENT_ID
);

CREATE INDEX ASSIGNMENT_CONTENT_CONTEXT ON ASSIGNMENT_CONTENT
(
	CONTEXT
);

-- ---------------------------------------------------------------------------
-- ASSIGNMENT_SUBMISSION
-- ---------------------------------------------------------------------------

CREATE TABLE ASSIGNMENT_SUBMISSION
(
    SUBMISSION_ID VARCHAR2 (99) NOT NULL,
	CONTEXT VARCHAR2 (99) NOT NULL,
	SUBMITTER_ID VARCHAR2 (99) NOT NULL,
	SUBMIT_TIME VARCHAR2 (99),
	SUBMITTED VARCHAR2 (6),
	GRADED VARCHAR2 (6),
    XML LONG
);

CREATE UNIQUE INDEX ASN_SUB_INDEX ON ASSIGNMENT_SUBMISSION
(
	SUBMISSION_ID
);

CREATE INDEX ASN_SUB_CONTEXT_INDEX ON ASSIGNMENT_SUBMISSION
(
	CONTEXT
);

CREATE UNIQUE INDEX ASN_SUB_SUB_INDEX ON ASSIGNMENT_SUBMISSION
(
	CONTEXT,SUBMITTER_ID
);
