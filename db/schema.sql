DROP DATABASE IF EXISTS CC;
CREATE DATABASE CC;

USE CC;

create table Users(
  id integer not null unique auto_increment,
  sessionId varchar(22) not null,
  Email varchar(50),
  userName varchar(50)
);

create table breakfast(
  id integer not null unique auto_increment,
  usersId integer,
  breakfast VARCHAR(30),
  breackfastcl integer,  
);

create table lunch(
  id integer not null unique auto_increment,
  usersId integer,
  lunch VARCHAR(30),
  lunchcl integer,  
);

create table dinner(
  id integer not null unique auto_increment,
  usersId integer,
  dinner VARCHAR(30),
  dinnercl integer,  
);

create table snacks(
  id integer not null unique auto_increment,
  usersId integer,
  snacks VARCHAR(30),
  snackscl integer,  
);