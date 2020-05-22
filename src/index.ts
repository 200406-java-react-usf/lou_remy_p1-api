//to do -  make rest of routes, 
//view reimb details part of api? the query should return those details but doesnt right now,
//start ecapsulating and abstracting logic into 
//respective directories,
//make authorization,
import express from 'express';
import { corsFilter } from './middleware/cors-filter-middleware'
import cors from 'cors';
import { Pool } from 'pg'
import dotenv from 'dotenv'
import session from 'express-session';
import { sessionMiddleware } from './middleware/session-middleware';
import { AuthRouter } from './routers/auth-router';


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

const app = express();
//middleware
app.use(corsFilter)
app.use('/',express.json())
app.use(sessionMiddleware)
app.use('/auth', AuthRouter)


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
app.put('/myreimb/:id/:reimbid', async (req,res)=>{
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
           
    } catch (error) {
        console.log(error.message)
        
    }
})
//admin
//create new user
app.post('/admin', async (req,res)=>{
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
app.put('/admin/:userid', async (req,res)=>{
    try {
        const userid = parseInt(req.params.userid)
        const { 
            new_username,
            new_first_name,
            new_last_name,
            new_email,
            new_user_role_id
            } = req.body
        const updateUser = await connectionPool.query(
            `update ers_users eu
             set username = '${new_username}',
                 first_name = '${new_first_name}',
                 last_name = '${new_last_name}',
                 email = '${new_email}',
                 user_role_id = ${new_user_role_id}
                 where ers_user_id = $1`,[userid]); 
        res.json(updateUser)
    } catch (error) {
        console.log(error.message)
    }
})
//delete a user
app.delete('/admin/:userid', async (req,res)=>{
    try {
//update or delete on table "ers_users" violates 
//foreign key constraint 
//"ers_reimbursements_author_id_fkey" on table "ers_reimbursements" 
        const userid = parseInt(req.params.userid)
        const deleteUser = await connectionPool.query(
            `delete from ers_users er
            where er.ers_user_id = ${userid}`)
            res.json("User deleted")
    } catch (error) {
        console.log(error.message)

    }
})
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
app.get('/reimb/t/:typeid', async (req,res)=>{
//currently returning [] w postman
    try {
        const  typeid  = parseInt(req.params.typeid)
        const reimbsByTypes = await connectionPool.query(
            `select * from ers_reimbursements er
            inner join ers_reimbursement_types ert on er.reimb_type_id = ert.reimb_type_id
            where er.reimb_type_id = ${typeid}`)
        res.json(reimbsByTypes.rows)
    } catch (error) {
        
    }
})

app.get('/reimb/s/:statusid', async (req,res)=>{
    //
        try {
            const statusid  = parseInt(req.params.statusid)
            const reimbsBystatus = await connectionPool.query(
                `select * from ers_reimbursements er
                inner join ers_reinbursement_statuses ers on er.reimb_status_id = ers.reimb_status_id
                where er.reimb_status_id = ${statusid}`)
            res.json(reimbsBystatus.rows)
        } catch (error) {
            console.log(error)
        }
    })

//view reimb details 

//update reimb from pending to either approved or denied 
app.put('/reimb/:reimbid', async (req,res)=>{
    try {
        const reimbid = parseInt(req.params.reimbid)
        const {new_status} = req.body
        const updateStatus = await connectionPool.query(
            `update ers_reimbursements er
                set er.reimb_status_id = ${new_status}
                where er.reimbid=${reimbid}`
        )
    } catch (error) {
        console.log(error)
    }
})



app.listen(8080, ()=>{
    console.log('server running on port 8080')
})

//router  auth, other?

