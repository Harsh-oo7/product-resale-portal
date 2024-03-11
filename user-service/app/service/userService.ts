import { SuccessResponse } from "app/utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export class UserService {
  constructor() {}

  async CreateUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async UserLogin(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "User created successfully" });
  }
}
