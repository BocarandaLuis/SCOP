import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


import DashboardPage from '../pages/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import InsertDataPage from '../pages/InsertDataPage'
import ReportPage from '../pages/ReportPage'
import WeighingPage from '../pages/WeighingPage'
import ReportPaymentPage from '../pages/ReportPaymentPage'
import SignupWorkerPage from '../pages/SignupWorkerPage'
import SignupEmployeePage from '../pages/SignupEmployeePage'
import ReportDataWeighingPage from '../pages/ReportDataWeighingPage'
import ProductPage from '../pages/ProductPage'

export default function DashboardRouter() {
    return (
        <Router>
            <Switch>

                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/insertData" component={InsertDataPage} />
                <Route path="/report" component={ReportPage} />
                <Route path="/reportPayment" component={ReportPaymentPage} />
                <Route path="/weighing" component={WeighingPage} />
                <Route path="/signupWorker" component={SignupWorkerPage} />
                <Route path="/signupEmployee" component={SignupEmployeePage} />
                <Route path="/reportDataWeighing" component={ReportDataWeighingPage} />
                <Route path="/product" component={ProductPage} />

                <Route path="404" component={NotFoundPage} />
                <Route path="*">
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </Router>
    )
}