import { Request, Response} from 'express'

export const adminGuard = (req: Request, resp: Response, next: any)=>{
    if(!req.session.principal){
        resp.status(401).json('Please login, no session')
    } else if (req.session.principal.role === 'admin'){
        next()
    }else{
        resp.status(403).json('auth error')
    }
}