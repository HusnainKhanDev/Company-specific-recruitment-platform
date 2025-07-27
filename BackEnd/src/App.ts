import express from 'express'
import { StartApolloServer } from './GraphQL/ApolloServer.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();

const port = process.env.PORT
const DataBase = process.env.DBName
const app = express()

//MiddleWares-----------------------------------------------
app.use(express.json())


//Servers---------------------------------------------------
StartApolloServer(app)

app.listen(port, () => {
    console.log(`Server is Running On Port ${port}`)
})

mongoose.connect(`mongodb://127.0.0.1/${DataBase}`)
.then(()=>{
    console.log('DataBase is Connected Successfuly')
})
.catch(()=>{
    console.log('Error While Connecting DB')
})



