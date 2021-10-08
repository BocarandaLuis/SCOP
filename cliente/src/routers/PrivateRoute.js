import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import useAuth from '../auth/useAuth'

export default function PrivateRoute({ component: Component, ...rest }) {
    const auth = useAuth()
    const location = useLocation()

    return (
        <Route {...rest} >
            {
                auth.isLogged()
                    ? (<Component />)
                    : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            }
        </Route>
    )
}