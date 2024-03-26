import { container } from 'tsyringe'
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "../service/userService";
import { ErrorResponse } from "../utility/response";

const service = container.resolve(UserService);

export const Signup = async (event: APIGatewayProxyEventV2) => {
    console.log("signup....")
    return await service.CreateUser(event);
}

export const Login = async (event: APIGatewayProxyEventV2) => {
    return await service.UserLogin(event);
}

export const Verify = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if(httpMethod === 'post') {
        return await service.VerifyUser(event);
    }
    else if(httpMethod === 'get') {
        return await service.GetVerificationToken(event);
    }

    return ErrorResponse(404, "required method not found");
}

export const Profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if(httpMethod === 'post') {
        return service.CreateProfile(event)
    }
    else if(httpMethod === 'put') {
        return service.EditProfile(event);
    }
    else if(httpMethod === 'get') {
        return service.GetProfile(event);
    }

    return ErrorResponse(404, "required method not found");
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if(httpMethod === 'post') {
        return service.CreateCart(event)
    }
    else if(httpMethod === 'put') {
        return service.UpdateCart(event);
    }
    else if(httpMethod === 'get') {
        return service.GetCart(event);
    }

    return ErrorResponse(404, "required method not found");
}

export const Payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if(httpMethod === 'post') {
        return service.CreatePaymentMethod(event)
    }
    else if(httpMethod === 'put') {
        return service.UpdatePaymentMethod(event);
    }
    else if(httpMethod === 'get') {
        return service.GetPaymentMethod(event);
    }

    return ErrorResponse(404, "required method not found");
}