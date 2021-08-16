DROP TABLE IF EXISTS dictionary;

CREATE TABLE dictionary(
    id SERIAL PRIMARY KEY,
    word TEXT,
    length INT,
    weight INT DEFAULT 1,
    difficulty INT DEFAULT 0,
    won INT DEFAULT 0,
    played INT DEFAULT 0
);

CREATE INDEX lengh_idx ON dictionary(length);
CREATE INDEX weight_idx ON dictionary(weight);
CREATE INDEX difficulty_idx ON dictionary(difficulty);
