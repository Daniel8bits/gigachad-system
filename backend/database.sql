CREATE TYPE frequencyPlan AS ENUM ('montly', 'semmiannual', 'quarterly', 'annual');
CREATE TABLE Plan (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(40) NOT NULL,
    description TEXT NOT NULL,
    value real NOT NULL,
    frequency frequencyPlan NOT NULL,
    available BOOLEAN NOT NULL
);
CREATE TYPE roleAdministrative AS ENUM ('financer', 'attendant', 'manager');
CREATE TABLE Users(
    cpf CHARACTER(11) PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(30) NOT NULL,
    email CHARACTER VARYING(30) NOT NULL,
    password CHARACTER VARYING(72) NOT NULL,
    phone CHARACTER(13)
);
CREATE TABLE Customer(
    cpf CHARACTER(11) PRIMARY KEY NOT NULL,
    idCurrentPlan INT NOT NULL,
    FOREIGN KEY (cpf) REFERENCES Users(cpf) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idCurrentPlan) REFERENCES Plan(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Employee(
    cpf CHARACTER(11) PRIMARY KEY NOT NULL,
    administrative boolean NOT NULL,
    ctps CHARACTER VARYING(40) NOT NULL,
    admissionDate DATE NOT NULL,
    address CHARACTER VARYING(100) NOT NULL,
    FOREIGN KEY (cpf) REFERENCES Users(cpf) ON DELETE CASCADE ON UPDATE CASCADE
); 
CREATE TABLE Administrative(
    cpf CHARACTER(11) PRIMARY KEY NOT NULL,
    role roleAdministrative NOT NULL,
    FOREIGN KEY (cpf) REFERENCES Employee (cpf) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Trainer (
    cpf CHARACTER(11) PRIMARY KEY NOT NULL,
    cref CHARACTER(11) NOT NULL,
    -- 000000-G/RS
    FOREIGN KEY (cpf) REFERENCES Employee (cpf) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Exercise (
    id SERIAL PRIMARY KEY NOT NULL,
    name character varying(30)
);
CREATE TABLE Training(
    id INT NOT NULL,
    cpfCustomer CHARACTER(11) NOT NULL,
    cpfTrainer CHARACTER(11),
    name CHARACTER VARYING(20) NOT NULL,
    creationDate TIMESTAMP NOT NULL,
    PRIMARY KEY (id, cpfCustomer),
    FOREIGN KEY (cpfCustomer) REFERENCES Customer(cpf) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cpfTrainer) REFERENCES Trainer(cpf) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE TABLE ExerciseItem(
    idExercise INT NOT NULL,
    idTraining INT NOT NULL,
    cpfCustomer CHARACTER(11) NOT NULL,
    weight smallint,
    series smallint NOT NULL,
    repetition smallint NOT NULL,
    PRIMARY KEY (idExercise, idTraining, cpfCustomer),
    FOREIGN KEY (idTraining, cpfCustomer) REFERENCES Training(id, cpfCustomer) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idExercise) REFERENCES Exercise(id) ON UPDATE CASCADE
);
CREATE TABLE DateTraining(
    idTraining INT NOT NULL,
    cpfCustomer CHARACTER(11) NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (idTraining, cpfCustomer, date),
    FOREIGN KEY (idTraining, cpfCustomer) REFERENCES Training(id, cpfCustomer) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cpfCustomer) REFERENCES Customer(cpf) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE DateDoneItem(
    idTraining INT NOT NULL,
    cpfCustomer CHARACTER(11) NOT NULL,
    date date NOT NULL,
    idExercise INT NOT NULL, -- column "cpf" referenced in foreign key constraint does not exist
    PRIMARY KEY (idTraining, cpfCustomer, date, idExercise),
    FOREIGN KEY (idTraining, cpfCustomer, date) REFERENCES DateTraining(idTraining, cpfCustomer, date) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idExercise, idTraining, cpfCustomer) REFERENCES ExerciseItem(idExercise, idTraining, cpfCustomer) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Tutorial(
    idExercise INT PRIMARY KEY NOT NULL,
    video_url CHARACTER VARYING(100),
    image JSON NOT NULL,
    explanation CHARACTER VARYING(256) NOT NULL,
    FOREIGN key (idExercise) REFERENCES Exercise(id) ON DELETE CASCADE ON UPDATE CASCADE
);
----------------------------------------------------------
CREATE TABLE CreditCard (
    numbers CHARACTER(16) PRIMARY KEY NOT NULL,
    holder CHARACTER(20) NOT NULL,
    expirationDate CHARACTER(5) NOT NULL,
    -- 05/22
    cvv CHARACTER(3) NOT NULL
);
CREATE TABLE CustomerCreditCard (
    cpfCustomer CHARACTER(11) NOT NULL,
    numbersCreditCard CHARACTER(16) NOT NULL,
    PRIMARY KEY (cpfCustomer, numbersCreditCard),
	FOREIGN key (cpfCustomer) REFERENCES Customer(cpf) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN key (numbersCreditCard) REFERENCES CreditCard(numbers)
);
CREATE TYPE statusInvoice AS ENUM ('canceled', 'paid', 'open');
CREATE TYPE payMethodInvoice AS ENUM ('creditCard', 'pix', 'bankSlip', 'money');
--bankSlip-boleto, money-presencial 
CREATE TABLE Invoice (
    id INT NOT NULL,
    cpfCustomer character(11) NOT NULL,
    idPlan INT NOT NULL,
    cardNumbers CHARACTER(16),
    --invoice number
    value real NOT NULL,
    status statusInvoice NOT NULL,
    payday DATE NOT NULL,
    payMethod payMethodInvoice NOT NULL,
    PRIMARY KEY (id, idPlan, cpfCustomer),
    FOREIGN key (cpfCustomer) REFERENCES Customer(cpf) ON UPDATE CASCADE,
    FOREIGN key (cardNumbers) REFERENCES CreditCard(numbers),
    FOREIGN key (idPlan) REFERENCES Plan(id) ON UPDATE CASCADE
);
----------------------------------------------------
CREATE TABLE Equipment(
    qrCode CHARACTER VARYING(40) PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(40) NOT NULL,
    maintenanceDate timestamptz
);
CREATE TYPE typeExpense AS ENUM (
    'equipmentBuy',
    'equipmentMaintenance',
    'billPayment',
    'employeePayment',
    'others'
);
CREATE TABLE Expense(
    id SERIAL PRIMARY KEY NOT NULL,
    qrCodeEquipment CHARACTER VARYING(40),
    date DATE NOT NULL,
    totalValue real NOT NULL,
    description TEXT NOT NULL,
    type typeExpense NOT NULL,
    FOREIGN key (qrCodeEquipment) REFERENCES Equipment(qrCode)
);