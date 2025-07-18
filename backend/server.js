import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'


const app = express()
const PORT = 4000

app.use(cors())


//Connect DB

connectDB()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', userRouter)

//Routes
app.get('/', (req, res) => {
        res.send('Hello World!')
    })

app.listen(PORT, () =>
     console.log(`Server running on port ${PORT}`))