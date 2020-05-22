import session from 'express-session'

const sessionConfig ={
    secret: 'something',
    cookie: {
        secure: false
    },
    resave: false,
    saveUninitialized: false
}

export const sessionMiddleware = session(sessionConfig)