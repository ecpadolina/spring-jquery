CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(20),
	password VARCHAR(60),
	role VARCHAR(10) CHECK (role = 'ROLE_USER' or role = 'ROLE_ADMIN'),
	enabled BOOLEAN
);