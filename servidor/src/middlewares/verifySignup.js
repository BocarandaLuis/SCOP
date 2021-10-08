import authQuery from '../helpers/auth'
import db from '../database'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await db.query(`${authQuery.getUserByUsername}`, [req.body.username])
    if (user.rows.length > 0) return res.status(400).json({ message: "El nombre de usuario ya existe" })
    const email = await db.query(`${authQuery.getUserByEmail}`, [req.body.email])
    if (email.rows.length > 0) return res.status(400).json({ message: "El email ya existe" })
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Ha ocurrido un error en el chequeo de duplicidad de username y email"})
  }
}

// export const checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let index = 0; index < req.body.roles.length; index++) {
//       if (!ROLES.includes(req.body.roles[index])) {
//         return res.status(400).json({
//           message: `Role ${req.body.roles[index]} does not exists`
//         })
//       }
//     }
//   }

//   next();
// }