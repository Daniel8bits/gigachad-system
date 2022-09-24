CREATE TABLE administratives(
	cpf CHARACTER VARYING(11) PRIMARY KEY NOT NULL,
	role CHARACTER VARYING(40)

);
CREATE TABLE cards (
    holder CHARACTER VARYING(100) NOT NULL,
    expirationDate TIMESTAMP NOT NULL,
    numbers INT NOT NULL,
    cpf_fk CHARACTER VARYING(11) NOT NULL

);
CREATE TABLE customer(
	cpf CHARACTER VARYING(11) PRIMARY KEY NOT NULL,
	idCurrentPlan CHARACTER VARYING(40) NOT NULL,
	idCurrentTraining CHARACTER VARYING(40) NOT NULL
					 
);
CREATE TABLE employees(
	cpf CHARACTER VARYING(11) PRIMARY KEY NOT NULL,
	administrative CHARACTER VARYING(40),
	ctps CHARACTER VARYING(40),
	admissionDate timestamptz
);
CREATE TABLE equipment(
	idEquipment CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
	name CHARACTER VARYING(40),
	qrCode CHARACTER VARYING(40),
	maintenanceDate timestamptz
);
CREATE TABLE exercise (
   idExercise character varying(20) PRIMARY KEY  NOT NULL,
   name character varying(30)
);
CREATE TABLE exerciseItem(
	idExerciseItem CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
	idTraining_fk CHARACTER VARYING(40) NOT NULL,
	idExercise_fk CHARACTER VARYING(40) NOT NULL,
	weight CHARACTER VARYING(40),
	series CHARACTER VARYING(40),
	repetition CHARACTER VARYING(40)
);
CREATE TABLE expense(
	idExpense CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
	idEquipment_fk CHARACTER VARYING(40) NOT NULL,
	date TIMESTAMP,
	totalValue CHARACTER VARYING(40),
	description CHARACTER VARYING(40),
	type CHARACTER VARYING(40)
);
CREATE TABLE invoices (
    idValue INT PRIMARY KEY NOT NULL,
	cardNumber_fk character varying(40) NOT NULL,
	cardHolder_fk character varying(40) NOT NULL,
    cardExpirationDate_fk character varying(40) NOT NULL,
    idPlan_fk character varying(40) NOT NULL,
    cpf_fk character varying(11) NOT NULL,
    number character varying(40),
    value character varying(40),
    status character varying(40),
    payday character varying(40),
    payMethod character varying(40)
    
);
CREATE TABLE plan (
	idPlan CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
	name CHARACTER VARYING(40) NOT NULL,
	description CHARACTER VARYING(40),
	value CHARACTER VARYING(40)
);
CREATE TABLE trainers (
	cpf CHARACTER VARYING(11) PRIMARY KEY NOT NULL,
	cref CHARACTER VARYING(40)

);
CREATE TABLE trainings( 
	idTraining CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
	cpf_fk CHARACTER VARYING(11) NOT NULL,
	creationDate TIMESTAMP NOT NULL,
	name CHARACTER VARYING(40) NOT NULL
);
--chaves estrangeiras--
ALTER TABLE ONLY invoices
ADD CONSTRAINT idPlan_fk FOREIGN KEY (idPlan_fk ) REFERENCES plan(idPlan)

ALTER TABLE ONLY invoices
ADD CONSTRAINT cpf_fk FOREIGN KEY (cpf_fk ) REFERENCES customer(cpf)

ALTER TABLE ONLY trainers
ADD CONSTRAINT cpf_fk FOREIGN KEY (cpf_fk ) REFERENCES customer(cpf)

ALTER TABLE ONLY customer
ADD CONSTRAINT idCurrentPlan_fk FOREIGN KEY (idCurrentPlan_fk ) REFERENCES plan(idPlan)

ALTER TABLE ONLY customer
ADD CONSTRAINT idCurrentTraining_fk FOREIGN KEY (idCurrentTraining_fk ) REFERENCES trainers(idTraining)

ALTER TABLE ONLY exerciseItems
ADD CONSTRAINT idTraining_fk FOREIGN KEY (idTraining_fk ) REFERENCES trainers(idTraining)

ALTER TABLE ONLY exerciseItems
ADD CONSTRAINT idExercise_fk FOREIGN KEY (idExercise_fk ) REFERENCES exercise(idExercise)

ALTER TABLE ONLY expense
ADD CONSTRAINT idEquipment_fk FOREIGN KEY (idEquipment_fk ) REFERENCES equipment(idEquipment)