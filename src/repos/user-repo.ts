import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '..';

export class UserRepository {
     async authenticate(un:string, pw:string){
         let client: PoolClient;
         try {
            client = await connectionPool.connect();
            let sql = `select * from ers_users where username = $1 and password = $2`;
            let rs = await client.query(sql, [un, pw]);
            //console.log(rs.rows[0])
            return (rs.rows[0]);
        } catch (e) {
            console.log(e);
        } finally {
            //@ts-ignore
            client && client.release();
        }
     }

}

