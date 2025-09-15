import express from 'express'
import { StartApolloServer } from './GraphQL/ApolloServer.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { GoogleAuthRoutes } from './Routes/AuthRoutes.js'
import { CreateNewApplication } from './Routes/ApplicationRoute.js';
import './MiddleWare/ScheduleAts.js'
import './MiddleWare/ScheduleEmail.js'
dotenv.config();

const port = process.env.PORT
const DataBase = process.env.DBName
const app = express()

//MiddleWares-----------------------------------------------
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/Uploads', express.static('Uploads'));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Auth Route------------------------------------------------
GoogleAuthRoutes(app)
CreateNewApplication(app)


// DataBase Connection--------------------------------------`mongodb://127.0.0.1/${DataBase}`
mongoose.connect(process.env.MONGO_URI || `mongodb://127.0.0.1/${DataBase}`)
.then(async ()=>{
    console.log('DataBase is Connected Successfuly')
    
})
.catch(()=>{
    console.log('Error While Connecting DB')
})


//Servers---------------------------------------------------
StartApolloServer(app)

app.listen(port, () => {
    console.log(`Server is Running On Port ${port}`)
})
