-- /*
--  *  Script for generating the baseline database
--  *  StackerServerDB
--  *  by Sean Zhang 8/7/2018
--  */
 SHOW DATABASES;
 USE ubereatsdb;
 SHOW TABLES;

 CREATE TABLE IF NOT EXISTS users (
     id INT(20) NOT NULL AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL,
     email VARCHAR(50) NOT NULL,
     password VARCHAR(100) NOT NULL,
     phone INT(20) DEFAULT NULL,
     createdAt DATE,
     updatedAt DATE,
     PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;