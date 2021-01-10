DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  submission_id INTEGER REFERENCES submissions(id),
  option_id INTEGER REFERENCES options(id),
  rank SMALLINT
);
