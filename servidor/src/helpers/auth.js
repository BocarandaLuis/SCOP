const auth = {
	signin: `SELECT U.id_us, U.contraseña, RU.id_rol FROM usuario AS U 
	INNER JOIN rol_usuario AS RU ON U.id_us = RU.id_us WHERE username=$1`,
	signup: `INSERT INTO usuario(co_us, username, nombre1, nombre2, apellido1, apellido2, contraseña)
		VALUES ($1, $2, $3, $4, $5, $6, $7)`,
	insertIdRolUs: `INSERT INTO rol_usuario(id_rol, id_us)VALUES ($1, $2)`,
	getUserByUsername: `SELECT username FROM usuario WHERE username=$1`,
	getUserByEmail: `SELECT email FROM usuario WHERE email=$1`,
	getUserById: `SELECT id_us FROM usuario WHERE id_us=$1`,
	getRolByIdRol: `SELECT nombre_rol FROM rol WHERE id_rol=$1`,
	getUserCount: `SELECT count(*) FROM usuario`,
	getRolUserByIdUser: `SELECT id_rol FROM rol_usuario WHERE id_us=$1`,
	getSessionByUsername: `SELECT U.id_us FROM usuario AS U INNER JOIN sesion AS S ON U.id_us = S.id_us WHERE U.username=$1`,
	insertSession:`INSERT INTO sesion(id_us) VALUES ($1)`,
	deleteSession:`DELETE FROM sesion WHERE id_us=$1`
}	

export default auth