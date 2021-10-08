import express from 'express'
import morgan from 'morgan'


import authRoutes from './routes/auth.routes'
import workerRoutes from './routes/worker.routes'
import paymentRoutes from './routes/payment.routes'
import resportWorker from './routes/reportWorker.routes'
import dataProduction from './routes/dataProduction.routes'
import weighing from './routes/weighing.routes'
import product from './routes/product.routes'

// import {createRoles} from './libs/initialSetup'
import cors from 'cors'
const app = express()

// createRoles()

app.use(cors())

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(200).json("welcome")
})

app.use('/api/auth', authRoutes)
app.use('/api/worker', workerRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/reportWorker', resportWorker)
app.use('/api/production', dataProduction)
app.use('/api/weighing', weighing)
app.use('/api/product', product)


export default app;