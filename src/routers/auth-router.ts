
import express from 'express';
//import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';
import { UserRepository } from '../repos/user-repo'

export const AuthRouter = express.Router();

//const userService = AppConfig.userService;
const userRepo = new UserRepository();


AuthRouter.get('', (req, resp) => {
    delete req.session?.principal;
    resp.status(204).send();
});

AuthRouter.post('', async (req, resp) => {

    try {

        const { username, password } = req.body;
        
        let authUser = await userRepo.authenticate(username, password);
        
        let payload = new Principal(authUser.ers_user_id, authUser.username, authUser.user_role_id);
        
      
        //@ts-ignore
        req.session.principal= payload;
        
        
        resp.status(200).json(payload);
        
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }

    resp.send();
})