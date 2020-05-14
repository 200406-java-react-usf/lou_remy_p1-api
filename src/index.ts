//to do -  connect to routers
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg'
import dotenv from 'dotenv'
const app = express();

//middleware
app.use(cors())
app.use(express.json())


//db config
dotenv.config()

export const connectionPool: Pool = new Pool({
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    max: 5
})

//////routes//////

//login

//user
//get users reimbs 

//get reimb details

//create a reimb

//update a pending reimb

//admin
//create new user
app.post('/',)
//update a user

//delete a user

//finance manager 
//get all reimb

//get all by type or status

//view reimb details

//update reimb from pending to either approved or denied 

app.listen(8080, ()=>{
    console.log('server running on port 8080')
})