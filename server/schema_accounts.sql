DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    created TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    score INT DEFAULT 0,
    games_won INT DEFAULT 0,
    games_lost INT DEFAULT 0,
    games_played INT DEFAULT 0
);


