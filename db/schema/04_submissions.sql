DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_id INTEGER REFERENCES choices(id),
  rank SMALLINT NOT NULL,
  submitter_name VARCHAR(255),
  timestamp TIMESTAMP
);
