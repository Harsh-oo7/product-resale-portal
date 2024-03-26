import { autoInjectable } from "tsyringe";
import { UserRepository } from "../repository/userRepository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utility/errors";
import {
  GetHashedPassword,
  GetSalt,
  GetToken,
  ValidatePassword,
  VerifyToken,
} from "../utility/password";
import { LoginInput } from "../models/dto/LoginInput";
import {
  GenerateAccessCode,
  SendVerificationCode,
} from "../utility/notification";
@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User creation, Validation and Login
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const body = JSON.parse(event.body as string);
      const input = plainToClass(SignupInput, body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: "BUYER",
        salt: salt,
      });

      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    try {
      const body = JSON.parse(event.body as string);
      const input = plainToClass(LoginInput, body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const data = await this.repository.findAccount(input.email);
      const verify = await ValidatePassword(
        input.password,
        data.password,
        data.salt
      );

      if (!verify) return ErrorResponse(400, "Wrong Password or Email");

      const token = GetToken(data);

      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const payload = await VerifyToken(token as string);
    if (payload) {
      const { code, expiry } = GenerateAccessCode();

      const response = await SendVerificationCode(code, payload.phone);
      return SuccessResponse({ message: "Verification Code sent." });
    }
    return ErrorResponse(500, "Some error sending code");
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  // User Profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async EditProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  // cart
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  // Payment
  async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }
}
