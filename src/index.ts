//to do -  connect to routers
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg'
const app = express();

//middleware
app.use(cors())
app.use(express.json())


//db config
export const connectionPool: Pool = new Pool({
    user:
    password:
    host:
    port:
    database:
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