import * as supertest from "supertest";
import {user} from "./user";

const request = supertest('localhost:8001/api/v1');

export async function deleteUserFunc(cookie: [x:string]): Promise <any> {
    return await request
        .delete('/users/deleteMe')
        .set('Cookie', cookie)
}

export async function signUpFunction(user:string | object): Promise<any> {
    return await request
        .post('/users/signup')
        .send(user)
}

export async function logInFunc(user:{email:string, password: string}): Promise<any>{
        return await request
        .post('/users/login')
        .send({
        email: user.email,
        password: user.password
    })
}
