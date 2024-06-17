import express from 'express'
import { PORT } from './util/config'
import morgan from 'morgan'
import cors from 'cors'
import testRoutes from './routes/test.routes'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// * Middlewares
app.set('port', PORT)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// * Routes
app.use('/api', testRoutes)

export default app
