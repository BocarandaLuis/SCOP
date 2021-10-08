CREATE TABLE rol(
	id_rol SERIAL PRIMARY KEY,
	nombre_rol VARCHAR(30) NOT NULL
);

CREATE TABLE producto(
	id_prod SERIAL PRIMARY KEY,
	nombre_prod VARCHAR(20) NOT NULL,
	precio_bs DECIMAL(12,2) NOT NULL,
	precio_usd DECIMAL(4,2)	NOT NULL
);

CREATE TABLE sala(
	id_sala SERIAL PRIMARY KEY,
	nombre_sala VARCHAR(30) NOT NULL
);

CREATE TABLE puesto_trabajo(
	id_ptrabajo SERIAL PRIMARY KEY,
	nombre_ptrabajo VARCHAR(30) NOT NULL
);

CREATE TABLE usuario(
	id_us SERIAL PRIMARY KEY,
	co_us VARCHAR(20) NOT NULL,
	username VARCHAR(20) NOT NULL,
	nombre1 VARCHAR(30) NOT NULL,
	nombre2 VARCHAR(30) NOT NULL,
	apellido1 VARCHAR(30) NOT NULL,
	apellido2 VARCHAR(30) NOT NULL,
	ci INT,
	email VARCHAR(50),
	contraseña VARCHAR(200) NOT NULL,
	status BOOLEAN
);	

CREATE TABLE obrero(
	id_obrero SERIAL PRIMARY KEY,
	id_sala INT NOT NULL,
	id_ptrabajo INT NOT NULL,
	co_ob VARCHAR(20) NOT NULL,
	nombre1 VARCHAR(30) NOT NULL,
	nombre2 VARCHAR(30) NOT NULL,
	apellido1 VARCHAR(30) NOT NULL,
	apellido2 VARCHAR(30) NOT NULL,
	ci INT NOT NULL, 
	tlf VARCHAR(30),
	email VARCHAR(30),
	fe_nacimiento DATE NOT NULL,
	direccion VARCHAR(255),
	status BOOLEAN NOT NULL,
	FOREIGN KEY(id_sala) REFERENCES sala(id_sala),
	FOREIGN KEY(id_ptrabajo) REFERENCES puesto_trabajo(id_ptrabajo)
);

CREATE TABLE produccion_obrero(
	id_prod_ob SERIAL PRIMARY KEY,
	id_obrero INT NOT NULL,
	cant_total DECIMAL(4,2) NOT NULL,
	fe_inicio TIMESTAMP NOT NULL,
	fe_fin TIMESTAMP,
	status BOOLEAN NOT NULL,
	FOREIGN KEY(id_obrero) REFERENCES obrero(id_obrero)
);

CREATE TABLE detalle_produccion_obrero(
	id_prod_ob INT NOT NULL,
	id_us INT NOT NULL,
	id_prod INT NOT NULL,
	cant DECIMAL(2,1) NOT NULL,
	fe_hr TIMESTAMP NOT NULL,
	FOREIGN KEY(id_us) REFERENCES usuario(id_us),
	FOREIGN KEY(id_prod) REFERENCES producto(id_prod)
);

CREATE TABLE pago(
	id_pago SERIAL PRIMARY KEY,
	id_us INT NOT NULL,
	id_prod_ob INT NOT NULL,
	fe_hr TIMESTAMP NOT NULL,
	total_bs DECIMAL(12,2) NOT NULL,
	total_usd DECIMAL(4,2) NOT NULL,
	status BOOLEAN NOT NULL,
	FOREIGN KEY(id_us) REFERENCES usuario(id_us),
	FOREIGN KEY(id_prod_ob) REFERENCES produccion_obrero(id_prod_ob)
);

CREATE TABLE detalle_pago(
	id_det_pago SERIAL PRIMARY KEY,
	id_pago INT NOT NULL,
	id_prod INT NOT NULL,
	cant DECIMAL(4,1) NOT NULL,
	mont_bs DECIMAL(12,2) NOT NULL,
	mont_usd DECIMAL(4,2) NOT NULL,
	total_bs DECIMAL(12,2) NOT NULL,
	total_usd DECIMAL(4,2) NOT NULL,
	FOREIGN KEY(id_pago) REFERENCES pago(id_pago),
	FOREIGN KEY(id_prod) REFERENCES producto(id_prod)
);

CREATE TABLE asistencia(
	id_asis SERIAL PRIMARY KEY,
	id_obrero INT NOT NULL,
	fe_inicio TIMESTAMP,
	fe_fin TIMESTAMP,
	FOREIGN KEY(id_obrero) REFERENCES obrero(id_obrero)
);

CREATE TABLE rol_usuario(
	id_rol INT NOT NULL,
	id_us INT NOT NULL,
	FOREIGN KEY(id_rol) REFERENCES rol(id_rol),
	FOREIGN KEY(id_us) REFERENCES usuario(id_us)
);


CREATE TABLE zona_extraccion(
	id_zona_ext SERIAL PRIMARY KEY,
	nombre_zona_ext VARCHAR(50) NOT NULL
);

CREATE TABLE produccion(
	id_produccion SERIAL PRIMARY KEY,
	id_us INT NOT NULL,
	fecha DATE NOT NULL,
	total INT NOT NULL,
	FOREIGN KEY(id_us) REFERENCES usuario(id_us)
);

CREATE TABLE detalle_produccion(
	id_produccion SERIAL PRIMARY KEY,
	id_zona_ext INT NOT NULL,
	id_prod INT NOT NULL,
	cant DECIMAL(6,2) NOT NULL
); 

CREATE TABLE pesaje(
	id_pesaje SERIAL PRIMARY KEY,
	id_us INT NOT NULL,
	fecha DATE NOT NULL,
	total INT NOT NULL,
	FOREIGN KEY(id_us) REFERENCES usuario(id_us)
);

CREATE TABLE detalle_pesaje(
	id_pesaje SERIAL PRIMARY KEY,
	id_zona_ext INT NOT NULL,
	id_prod INT NOT NULL,
	cant DECIMAL(6,2) NOT NULL
); 

CREATE TABLE sesion(
	id_sesion SERIAL PRIMARY KEY,
	id_us INT NOT NULL,
	FOREIGN KEY(id_us) REFERENCES usuario(id_us)
);



-- INSERT

	--ROL
INSERT INTO rol(nombre_rol)VALUES ('Administrador');
INSERT INTO rol(nombre_rol)VALUES ('analista');
INSERT INTO rol(nombre_rol)VALUES ('Cajero');
INSERT INTO rol(nombre_rol) VALUES ('Supervisor de sistema');
INSERT INTO rol(nombre_rol) VALUES('Supervisor de peso');

--USUARIO
INSERT INTO usuario(co_us, username, nombre1, nombre2, apellido1, apellido2, contraseña)
		VALUES ('AD1', 'luisb', 'Luis', 'Enrique', 'Bocaranda', 'Sanchez', '$2a$10$E79wfw.vWdoT72KF.43OAOexE7qXZu7R.OFCtN3mfXLDlIiAieD4W');

	--ROL_USUARIO
INSERT INTO rol_usuario(id_rol, id_us)VALUES (1, 1);

	--SALA
INSERT INTO sala(nombre_sala)VALUES ('Cangrejo');
INSERT INTO sala(nombre_sala)VALUES ('Colmillo');
INSERT INTO sala(nombre_sala)VALUES ('Revisado de carne blanca');
INSERT INTO sala(nombre_sala)VALUES ('Revisado de carne negra');
INSERT INTO sala(nombre_sala)VALUES ('Revisado de carne jumbo');
INSERT INTO sala(nombre_sala)VALUES ('Desconche');

	--PUESTO_TRABAJO
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Cangrejero');
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Colmillero');
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Revisador de carne blanca');
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Revisador de carne negra');
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Revisador de carne jumbo');
INSERT INTO puesto_trabajo(nombre_ptrabajo)VALUES ('Desconchador');


	--PRODUCTO

INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Jumbo', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Lump', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Special', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Claw', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Cocktail', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('RS/Lump', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('RS/Claw', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Cesta/Jumbo', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('R/Lump', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('R/Claw', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('R/Cocktail', 2000000, 0.5);
INSERT INTO producto (nombre_prod, precio_bs, precio_usd) VALUES ('Cesta/Desc', 2000000, 0.5);

	-- ZONA EXTRACCION

INSERT INTO zona_extraccion (nombre_zona_ext) VALUES ('La Cañada');
INSERT INTO zona_extraccion (nombre_zona_ext) VALUES ('Santa Rita');
INSERT INTO zona_extraccion (nombre_zona_ext) VALUES ('San Francisco');
INSERT INTO zona_extraccion (nombre_zona_ext) VALUES ('Bobure');

	--ROL_USUARIO
INSERT INTO rol_usuario(id_rol, id_us)VALUES (1, 1);
INSERT INTO rol_usuario(id_rol, id_us)VALUES (2, 4);
INSERT INTO rol_usuario(id_rol, id_us)VALUES (4, 5);
INSERT INTO rol_usuario(id_rol, id_us)VALUES (3, 6);

	--OBRERO
INSERT INTO obrero(	id_sala, id_ptrabajo, co_ob, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, fe_nacimiento, direccion, status)
VALUES (1, 1, 'Jose', 'ob1','Ramon', 'Gonzalez', 'Gonzalez', 10547888, '', 'joseramon@gmail.com', '03/03/1995', 'La Curva de Molina', true);



-- UPDATE

	--PRODUCTO
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=1;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=2;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=3;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=4;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=5;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=6;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=7;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=8;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=9;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=10;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=11;
UPDATE public.producto SET precio_bs=2000000, precio_usd=0.5 WHERE id_prod=12;

