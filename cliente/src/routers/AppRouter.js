import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import NotFoundPAge from '../pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import DashboardRouter from './DashboardRouter'

export default function AppRouterCustom() {
    return (
        <Router>
            <Switch>

                <PublicRoute path="/login" component={LoginPage} />

                <PrivateRoute path="/dashboard" component={DashboardRouter} />
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
                <Route path="404" component={NotFoundPAge} />
                <Route path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </Router>
    )
}