import { DBClient } from '../utility/databaseClient';
import { UserModel } from '../models/UserModel'

export class UserRepository {
    constructor() {
        
    }

    async createAccount({ email, password, salt, phone, userType } : UserModel) {
        const client = await DBClient()
        await client.connect()

        const query = `INSERT INTO users(phone, email, password, salt, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const values = [phone, email, password, salt, userType]

        const result: any = await client.query(query, values);
        await client.end()
        if(result && result.rowCount > 0) return result.rows[0] as UserModel

        return result;
    }

    async findAccount(email: string) {
        const client = await DBClient()
        await client.connect()

        const query = `SELECT user_id, email, password, phone, salt FROM users WHERE email = $1`
        const values = [email]
        const result: any = await client.query(query, values);
        await client.end();

        if(result && result.rowCount < 1) throw  new Error("User does not exist")

        if(result && result.rowCount > 0) return result.rows[0] as UserModel

        return result;
    }
}
