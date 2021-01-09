DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  poll_id INTEGER REFERENCES polls(id),
  label VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
);
