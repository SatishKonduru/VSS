create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(100),
    contactNumber varchar(20),
    email varchar(200),
    password varchar(100),
    status varchar(20),
    department varchar(100),
    task varchar(500),
    progress varchar(200),
    role varchar(100),
    unique (email)
);

insert into users(
    name, contactNumber, email, password, status, department, task, progress, role
)
values (
    'admin', '9182256249', 'satishkonduru0225@gmail.com', 'admin', 'true','manager','','','admin'
);