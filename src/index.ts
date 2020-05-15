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
    port: 5432,
    database: process.env['DB_NAME'],
    max: 5
})




//////routes//////

//login

//user
//get users reimbs 

//get reimb details

//create a reimb
app.post('/myreimb',async (req,res)=>{
    try {
        const { description } = req.body
        const newReimb = await connectionPool.query(
            "insert into ers_reimbursements(description) values($1) returning *",
        [description])

        res.json(newReimb.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})
//update a pending reimb

//admin
//create new user
app.post('/addusers', async (req,res)=>{
    try {
        const { username } = req.body
        const newUser  =await connectionPool.query(
            "insert into ers_users(username) values($1) returning *")
            res.json(newUser.rows[0])
        
    } catch (error) {
        console.log(error.message)
    }
})
//update a user

//delete a user

//finance manager 
//get all reimb
app.get('/reimb', async (req,res)=>{
    try {
        const allReimbs = await connectionPool.query(
        "select * from ers_reimbursements")
        res.json(allReimbs.rows)
       
    } catch (error) {
        console.log(error.message)
    }
    
})
//get all by type or status
app.get('/reimb/:type', async (req,res)=>{
    try {
        const { type } = req.params
        const reimbsByTypes = await connectionPool.query(
            "select * from ers_rimbursements where reimb_type_id = $1", [type])
        res.json(reimbsByTypes.rows)
    } catch (error) {
        
    }
})
//view reimb details

//update reimb from pending to either approved or denied 

app.listen(8080, ()=>{
    console.log('server running on port 8080')
})

