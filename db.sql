CREATE DATABASE frik;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
);

CREATE TABLE posts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    authorId INTEGER NOT NULL ,
    post_text VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (userName, pass) VALUES ('demoUser1', 'pass');
INSERT INTO users (userName, pass) VALUES ('demoUser2', 'pass');
