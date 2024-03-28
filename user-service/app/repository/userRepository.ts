import { DBClient } from "../utility/databaseClient";
import { UserModel } from "../models/UserModel";
import { DBOperation } from "./dbOperation";
import { ProfileInput } from "../models/dto/AddressInput";
import { AddressModel } from "app/models/AddressModel";

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

  async updateVerificationCode(userId: number, code: number, expiry: Date) {
    const query = `UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 RETURNING *`;
    const values = [code, expiry, userId];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async updateVerifyUser(userId: number) {
    const query = `UPDATE users SET verified=true WHERE user_id=$1 AND verified=false RETURNING *`;
    const values = [userId];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    userType: string
  ) {
    const query = `UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 RETURNING *`;
    const values = [firstName, lastName, userType, userId];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as UserModel;

    return result;
  }

  async createProfile(
    user_id: number,
    {
      firstName,
      lastName,
      userType,
      address: { addressLine1, addressLine2, city, postCode, country },
    }: ProfileInput
  ) {
    const updatedUser = await this.updateUser(
      user_id,
      firstName,
      lastName,
      userType
    );

    const query = `INSERT INTO address(user_id, address_line1, address_line2, city, post_code, country) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      user_id,
      addressLine1,
      addressLine2,
      city,
      postCode,
      country,
    ];

    const result: any = await this.executeQuery(query, values);
    if (result && result.rowCount > 0) return result.rows[0] as AddressModel;

    return { result, updatedUser };
  }

  async getUserProfile(user_id: number) {
    const profileQuery = `SELECT first_name, last_name, email, phone, user_type, verified FROM users WHERE user_id=$1`;
    const profileValues = [user_id];
    const profileResult: any = await this.executeQuery(
      profileQuery,
      profileValues
    );
    if (profileResult && profileResult?.rowCount < 1) {
      throw new Error("User profile does not exist.");
    }

    const userProfile = profileResult.rows[0] as UserModel;

    const addressQuery = `SELECT id, address_line1, address_line2, city, post_code, country FROM address WHERE user_id=$1`;
    const addressValues = [user_id];

    const addressResult: any = await this.executeQuery(
      addressQuery,
      addressValues
    );
    if (addressResult.rowCount > 0) {
      userProfile.address = addressResult.rows as AddressModel[];
    }

    return userProfile;
  }

  async editProfile(
    user_id: number,
    {
      firstName,
      lastName,
      userType,
      address: { addressLine1, addressLine2, city, postCode, country, id },
    }: ProfileInput
  ) {
    const updatedUser = await this.updateUser(
      user_id,
      firstName,
      lastName,
      userType
    );

    const addressQuery = `UPDATE address SET address_line1=$1, address_line2=$2, city=$3, post_code=$4, country=$5 WHERE id=$6`;
    const addressValues = [
      addressLine1,
      addressLine2,
      city,
      postCode,
      country,
      id,
    ];

    const addressResult: any = await this.executeQuery(
      addressQuery,
      addressValues
    );

    if (addressResult.rowCount < 1) {
      throw new Error("Error while updating profile.");
    }

    return addressResult;
  }
}
