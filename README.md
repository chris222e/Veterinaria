# Procedimientos a realizar

1. Crear la BD y tabla

```sql
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
```
2. Abrir VSCode y seleccionar una carpeta (proyecto)
3. Ejecutar el siguiente comando (debe tener instalado NodeJS):
```
npm init -y
```
Ahora ya tenemos un proyecto para el entorno NodeJS

4. Instalar las dependencias
```
npm install express mysql2 dotenv
```

5. Crear un archivo .env en la raiz del proyecto y agregar:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=
DB_PORT=3306
PORT=3000
```

6. Desarrollo db.js > app.js
7. Ejecutar escriba en la consola:
```
node app.js
```