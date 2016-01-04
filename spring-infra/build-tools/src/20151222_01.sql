CREATE TABLE tickets(
	id SERIAL PRIMARY KEY,
	ticket_details varchar(250),
	ticket_status varchar(15),
	project_id int DEFAULT NULL REFERENCES project(id) ON DELETE CASCADE
);

CREATE TABLE ticket_person(
	person_id int,
	ticket_id int,
	PRIMARY KEY(person_id,ticket_id),
	FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE,
	FOREIGN KEY(ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);