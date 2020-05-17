//to do -  make rest of routes, 
//view reimb details part of api? the query should return those details but doesnt right now,
//start ecapsulating and abstracting logic into 
//respective directories,
//make authorization,
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
app.get('/myreimb/:id', async (req,res)=>{
    try {
        const { id } = req.params
        const reimbsByid = await connectionPool.query(
            `select * from ers_reimbursements er
            where er.author_id = $1`,[id])
        res.json(reimbsByid.rows)
    } catch (error) {
        
    }
})
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
app.put('/myreimb/:id&:reimbid', async (req,res)=>{
    try {
        const  id  = parseInt(req.params.id)
        console.log(req.params.id)
        const reimbid =parseInt(req.params.reimbid)
        const { description, amount } = req.body
        const updateReimb = await connectionPool.query(
            `update ers_reimbursements er
            set description = $1,
            amount = $2
            where (er.author_id = $3 and
            er.reimb_id = $4 and
            er.reimb_status_id =1)`, [description,amount,id,reimbid]) 
            res.json(updateReimb)
            console.log(updateReimb)
    } catch (error) {
        console.log(error.message)
        
    }
})
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
app.get('/reimb/:typeid', async (req,res)=>{
    //currently returning [] w postman
    try {
        const { type } = req.params
        const reimbsByTypes = await connectionPool.query(
            `select * from ers_reimbursements er
            inner join ers_reimbursement_types ert on er.reimb_type_id = ert.reimb_type_id
            where er.reimb_type_id = $1`, [type])
        res.json(reimbsByTypes.rows)
    } catch (error) {
        
    }
})
//view reimb details 

//update reimb from pending to either approved or denied 
app.put



app.listen(8080, ()=>{
    console.log('server running on port 8080')
})

