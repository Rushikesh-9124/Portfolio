import express from 'express'
const app = express()
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import detailsRouter from './routes/detailsRouter.js'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}))
connectDB()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/details', detailsRouter)

app.get('/', async(req, res)=>{
    res.json({
        success: true,
        message: "API Working"
    })
})


app.listen(8000, ()=>{
    console.log('Server is listening on http://localhost:8000')
})
export default app