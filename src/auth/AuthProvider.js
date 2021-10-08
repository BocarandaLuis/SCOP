import { createContext, useState, useEffect } from 'react'
import { loginAPI } from '../api/login'
import { logoutAPI } from '../api/logout'


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    )

    useEffect(() => {
        try {
            localStorage.setItem('user', JSON.stringify(user))
        } catch (error) {
            localStorage.removeItem('user')
        }
    }, [user])

    const contextValue = {
        user,
        async login(data) {
            try {
                const res = await loginAPI(data)
                if (res.status == 200) setUser(res.body)
                else alert(res.message)
            } catch (error) {
                alert("Error de direccionamiento")
            }

        },
        async logout() {
            try {
                const res = await logoutAPI()
                if (res.status == 200) setUser(null)
                else alert(res.message)
            } catch (error) {
                alert("Error de direccionamiento")
            }

        },
        isLogged() {
            return !!user
        }
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider