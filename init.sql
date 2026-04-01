CREATE DATABASE IF NOT EXISTS schooldb;

USE schooldb;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(500),
  latitude FLOAT ,
  longitude FLOAT
);
