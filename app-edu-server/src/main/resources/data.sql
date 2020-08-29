insert into role(role_name)values
('ROLE_STUDENT'),
('ROLE_STAFF'),
('ROLE_TEACHER'),
('ROLE_DIRECTOR'),
('ROLE_ADMIN');

insert into region (name) values ('Andijon');
insert into district (name,region_id) values ('Asaka',1),('paytug',1),('xonabod',1);
insert into week (name) values ('Monday'),('Tuesday'),('Wednesday'),
('Thursday'),('Friday'),('Saturday'),('Sunday');
-- insert into hour (name) value ('6:00'),('6:30'),('');