import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "app/service/userService";

const service = new UserService()

export const Signup = async (event: APIGatewayProxyEventV2) => {
    return await service.CreateUser(event);
}

export const Login = async (event: APIGatewayProxyEventV2) => {
    return await service.UserLogin(event);
}

export const Verify = async (event: APIGatewayProxyEventV2) => {
    return await service.VerifyUser(event);
}

export const Profile = async (event: APIGatewayProxyEventV2) => {
    return await service.CreateUser(event);
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
    console.log(event);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            message: "res from signup",
            data: {}
        })
    }
}

export const Payment = async (event: APIGatewayProxyEventV2) => {
    console.log(event);

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            message: "res from signup",
            data: {}
        })
    }
}