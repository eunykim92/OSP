CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE passwords (
  user_id INTEGER UNIQUE NOT NULL,
  hashed_psw VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(_id)
);

CREATE TABLE designs (
  _id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  image_url VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(_id)
);

CREATE TABLE components (
  _id SERIAL PRIMARY KEY,
  design_id INTEGER NOT NULL,
  parent_id INTEGER,
  name VARCHAR NOT NULL,
  x_position INTEGER,
  y_position INTEGER, 
  z_index INTEGER,
  props VARCHAR,
  hooks VARCHAR,
  style VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (design_id) REFERENCES designs(_id),
  FOREIGN KEY (parent_id) REFERENCES components(_id)
);