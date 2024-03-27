import { DBClient } from "../utility/databaseClient";
import { UserModel } from "../models/UserModel";
import { DBOperation } from "./dbOperation";

export class UserRepository extends DBOperation {
  constructor() {
    super();
  }

  async createAccount({ email, password, salt, phone, userType }: UserModel) {
    const query = `INSERT INTO users(phone, email, password, salt, user_type) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [phone, email, password, salt, userType];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async findAccount(email: string) {
    const query = `SELECT user_id, email, password, phone, salt, verification_code, expiry FROM users WHERE email = $1`;
    const values = [email];
    const result: any = await this.executeQuery(query, values);

    if (result && result.rowCount < 1) throw new Error("User does not exist");

    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async updateVerificationCode(userId: string, code: number, expiry: Date) {
    const query = `UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 RETURNING *`;
    const values = [code, expiry, userId];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async updateVerifyUser(userId: string) {
    const query = `UPDATE users SET verified=true WHERE user_id=$1 AND verified=false RETURNING *`;
    const values = [userId];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }
}
