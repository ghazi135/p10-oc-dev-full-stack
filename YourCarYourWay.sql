CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    birthdate DATE,
    address VARCHAR(255)
);

CREATE TABLE Opinion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    rate INT,
    review TEXT,
    date DATE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE VehicleCategory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE Agency (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Offer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    agencyId INT,
    vehicleCategory INT,
    departureCity VARCHAR(255),
    returnCity VARCHAR(255),
    startDateAndTime DATE,
    returnDateAndTime DATE,
    price DECIMAL(10, 2),
    FOREIGN KEY (agencyId) REFERENCES Agency(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicleCategory) REFERENCES VehicleCategory(id)
);

CREATE TABLE Booking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    offerId INT,
    date DATE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (offerId) REFERENCES Offer(id)
);

CREATE TABLE Contact (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    object VARCHAR(255),
    description TEXT,
    date DATE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);
