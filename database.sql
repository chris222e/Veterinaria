-- CTRL + ENTER ejecutar selección
CREATE DATABASE concesionario;
USE concesionario;

CREATE TABLE vehiculos
(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    marca 		VARCHAR(40) 	NOT NULL,
    modelo		VARCHAR(40)		NOT NULL,
    color 		VARCHAR(40) 	NOT NULL,
    placa 		VARCHAR(7) 		NOT NULL,
    CONSTRAINT uk_placa_veh UNIQUE (placa)
)ENGINE = INNODB;

INSERT INTO vehiculos (marca, modelo, color, placa) VALUES
	('Toyota','Hilux','blanco','ABC-111'),
    ('Nissan','Frontier','negro','ABC-222'),
    ('Kia','Sportage','rojo','ABC-333');

SELECT * FROM vehiculos;