SET SQL_SAFE_UPDATES = 0;
DROP DATABASE IF EXISTS PETSSA;
CREATE DATABASE PETSSA;
USE PETSSA;

CREATE USER 'petssa'@'localhost' identified by 'petssa';

GRANT ALL PRIVILEGES ON petssa.* to 'petssa'@'localhost';

select * from petssa.users;
select * from petssa.services;