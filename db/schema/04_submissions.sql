DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id),
  submitter_name VARCHAR(255),
  timestamp TIMESTAMP DEFAULT NOW()
);
