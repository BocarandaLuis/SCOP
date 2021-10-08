import jwt from 'jsonwebtoken'
import config from '../config'
import db from '../database'
import authQuery from '../helpers/auth'
import * as authCtrl from '../controllers/auth.controller'

export const verifyToken = async (req, res, next) => {
    try {
    	console.log("test")
        const token = req.headers["x-access-token"]
        let decoded
        if (!token) return res.status(403).json({ response: "No se proporciono un token" })
    		try{
			decoded = jwt.verify(token, config.SECRET)
    		}catch(error){
    			next();
    			return
    		}
        
        req.id_us = decoded.id_us
        const resUser = await db.query(`${authQuery.getUserById}`, [req.id_us])
        if (!resUser) return res.status(404).json({ message: "Usuario no encontrado" })
        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({message:'No autorizado'})
    }
}

export const checkDuplicateSession = async(req, res, next)=>{
      try {
        const { username } = req.body
        let resSession = await db.query(`${authQuery.getSessionByUsername}`, [username])
        if(resSession.rows.length>0) return res.status(401).json({message:'Usted ya ha iniciado sesión'})
        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({message:'No autorizado'})
    }
}

export const isAdmin = async (req, res, next) =>{
    const id_rol = await db.query(`${authQuery.getRolUserByIdUser}`, [req.id_us])
    if(id_rol.rows[0].id_rol === 1) { next(); return }
    return res.status(403).json({message: "Requiere permiso de administrador"})
}

export const isAnalyst = async (req, res, next) =>{
    const id_rol = await db.query(`${authQuery.getRolUserByIdUser}`, [req.id_us])
    let check = false
    id_rol.rows.forEach(element => {
        if(element.id_rol === 2 || element.id_rol === 4) { check = true; return  }
    })
    if(check) { next(); return} 
    return res.status(403).json({message: "Requiere permiso de analista"})
}

export const isSystemSupervisor= async (req, res, next) =>{
    const id_rol = await db.query(`${authQuery.getRolUserByIdUser}`, [req.id_us])
    let check = false
    id_rol.rows.forEach(element => {
        if(element.id_rol === 4) { check = true; return  }
    })
    if(check) { next(); return} 
    return res.status(403).json({message: "Requiere permiso de supervisor de sistema"})
}

export const isWeightSupervisor = async (req, res, next) =>{
    const id_rol = await db.query(`${authQuery.getRolUserByIdUser}`, [req.id_us])
    if(id_rol.rows[0].id_rol === 5) { next(); return }
    return res.status(403).json({message: "Requiere permiso de supervisor de pesaje"})
}

export const isCashier = async (req, res, next) =>{
    const id_rol = await db.query(`${authQuery.getRolUserByIdUser}`, [req.id_us])
    if(id_rol.rows[0].id_rol === 3) { next(); return }
    return res.status(403).json({message: "Requiere permiso de Cajero"})
}