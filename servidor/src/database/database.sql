CREATE TABLE tipo_usuario(
	id_tipo_us SERIAL PRIMARY KEY,
	descrip VARCHAR(20) NOT NULL
);

CREATE TABLE producto(
	id_prod SERIAL PRIMARY KEY,
	nombre_prod VARCHAR(20) NOT NULL,
	precio_bs DECIMAL(12,2) NOT NULL,
	precio_usd DECIMAL(4,2)	NOT NULL
);

CREATE TABLE sala(
	id_sala SERIAL PRIMARY KEY,
	nombre_sala VARCHAR(20) NOT NULL
);

CREATE TABLE puesto_trabajo(
	id_ptrabajo SERIAL PRIMARY KEY,
	nombre_ptrabajo VARCHAR(20) NOT NULL
);

CREATE TABLE usuario(
	id_us SERIAL PRIMARY KEY,
	id_tipo_us INT NOT NULL,
	co_us VARCHAR(20) NOT NULL,
	username VARCHAR(20) NOT NULL,
	nombre1 VARCHAR(30) NOT NULL,
	nombre2 VARCHAR(30) NOT NULL,
	apellido1 VARCHAR(30) NOT NULL,
	apellido2 VARCHAR(30) NOT NULL,
	ci INT NOT NULL,
	email VARCHAR(50) NOT NULL,
	contraseña VARCHAR(200) NOT NULL,
	FOREIGN KEY(id_tipo_us) REFERENCES tipo_usuario(id_tipo_us)
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
	FOREIGN KEY(id_ptrabajo) REFERENCES pueto_trabajo(id_ptrabajo)
);

CREATE TABLE produccion_obrero(
	id_prod_ob SERIAL PRIMARY KEY,
	id_obrero INT NOT NULL,
	cant_total DECIMAL(4,2) NOT NULL,
	fe_inicio TIMESTAMP NOT NULL,
	fe_fin TIMESTAMP NOT NULL,
	FOREIGN KEY(id_obrero) REFERENCES obrero(id_obrero)
);

CREATE TABLE detalle_produccion_obrero(
	id_prod_ob INT NOT NULL,
	id_us INT NOT NULL,
	id_prod INT NOT NULL,
	cantidad DECIMAL(2,1) NOT NULL,
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



-- INSERT

	--TIPO_USUARIO
INSERT INTO tipo_usuario(descrip)VALUES ('administrador');
INSERT INTO tipo_usuario(descrip)VALUES ('analista');
INSERT INTO tipo_usuario(descrip)VALUES ('cajero');
INSERT INTO tipo_usuario(descrip) VALUES ('sup_sistema');

	--USUARIO

INSERT INTO public.usuario(id_tipo_us, co_us, username, nombre1, nombre2, apellido1, apellido2, ci, email, contraseña)
VALUES (1, 'ad001', 'luisb', 'Luis', 'Enrique', 'Bocaranda', 'Sanchez', 25342581, 'luisbocaranda19@gmail.com', 'luis1');


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


	--OBRERO
INSERT INTO obrero(	id_sala, id_ptrabajo, co_ob, nombre1, nombre2, apellido1, apellido2, ci, tlf, email, fe_nacimiento, direccion, status)
VALUES (1, 1, 'Jose', 'ob1','Ramon', 'Gonzalez', 'Gonzalez', 10547888, '', 'joseramon@gmail.com', '03/03/1995', 'La Curva de Molina', true);

	--PRODUCTO

INSERT INTO producto (nombre_prod) VALUES ('Jumbo');
INSERT INTO producto (nombre_prod) VALUES ('Lump');
INSERT INTO producto (nombre_prod) VALUES ('Special');
INSERT INTO producto (nombre_prod) VALUES ('Claw');
INSERT INTO producto (nombre_prod) VALUES ('Cocktail');
INSERT INTO producto (nombre_prod) VALUES ('RS/Lump');
INSERT INTO producto (nombre_prod) VALUES ('RS/Claw');
INSERT INTO producto (nombre_prod) VALUES ('Cesta/Jumbo');
INSERT INTO producto (nombre_prod) VALUES ('R/Lump');
INSERT INTO producto (nombre_prod) VALUES ('R/Claw');
INSERT INTO producto (nombre_prod) VALUES ('R/Cocktail');
INSERT INTO producto (nombre_prod) VALUES ('Cesta/Desc');



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


