import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcryptjs'
import authQuery from '../helpers/auth'
import db from '../database'

export const signup = async (req, res) => {
    try {
        const { rol, username, nombre1, nombre2, apellido1, apellido2, contraseña } = req.body
     
        const id_rol = rol.id_rol
        const resIdRol = await db.query(`${authQuery.getRolByIdRol}`, [id_rol])
        const user_count = await db.query(`${authQuery.getUserCount}`)
        const new_user_count = parseInt(user_count.rows[0].count) + 1
        const contraseñaEncrip = await encryptPassword(contraseña)
        const co_us = `${(resIdRol.rows[0].nombre_rol.substr(0, 2)).toUpperCase()}${new_user_count}`
        const resIdUs = await db.query(`${authQuery.signup} RETURNING id_us`, [co_us, username, nombre1, nombre2, apellido1, apellido2, contraseñaEncrip])
        await db.query(`${authQuery.insertIdRolUs}`,[id_rol, resIdUs.rows[0].id_us])
        res.status(200).json({ status:200, message: "Se ha guardado correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}

export const signin = async (req, res) => {
    try {

        const { username, contraseña } = req.body
        const resUser = await db.query(`${authQuery.signin}`, [username])
        if (resUser.rows.length == 0) {
            res.status(404).json({ status:404, message: "Usuario no registrado"})
            return
        }
        if (await comparePassword(contraseña, resUser.rows[0].contraseña)) {
            let roles = [];
            resUser.rows.forEach(element => roles.push(element.id_rol))
            await db.query(`${authQuery.insertSession}`, [resUser.rows[0].id_us])
            const token = jwt.sign({ id_us: resUser.rows[0].id_us, rol: roles }, config.SECRET, { expiresIn: 80000 })
            // datos a guardar en la sesion: user
            res.status(200).json({
                status:200,
                message: "Usted ha iniciado sesión correctamente",
                body: {
                    token,
                    id_us: resUser.rows[0].id_us,
                    rol: roles
                }
            })
            return
        }
        res.status(404).json({status: 404, message: "Su contraseña es incorrecta, intente nuevamente"})
    } catch (error) {
        console.log(`${error}`)
        res.status(500).json({status: 500, message: "Ha ocurrido un error"})
    }
}


export const logout = async (req, res) => {
    try {
        console.log("logout")
        const { id_us } = req.body
        console.log("id_us: ", id_us )
        await db.query(`${authQuery.deleteSession}`, [id_us])

        res.status(200).json({ status:200, message: "Se ha guardado correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status:500, message: "Ha ocurrido un error" })
    }
}


const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compareSync(password, receivedPassword)
}

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

