import * as supertest from "supertest";
import {user} from '../../data/user'
import {deleteUserFunc, logInFunc, signUpFunction} from '../../data/helpers'

const request = supertest('localhost:8001/api/v1');

describe('USER SIGN UP AND LOG IN', () => {
    describe('Positive tests', () => {
        let cookie: [x:string]
        it('User log in', async () => {
            // const resSignUp = await request
            //     .post('/users/signup')
            //     .send(user)
            //     .expect(201)
            const resSignUp = await signUpFunction(user)
            console.log(resSignUp.body)
            const resLogIn = await logInFunc(user)
            cookie = resLogIn.header['set-cookie']
            // console.log(resLogIn.body, 'LOGIN==========')
            expect(resLogIn.statusCode).toEqual(200)
            expect(resLogIn.body.status).toEqual('success')
            expect(resLogIn.body.token).not.toBe('')
            expect(typeof resLogIn.body.data.user).toBe('object')
            expect(typeof resLogIn.body.data.user._id).toBe('string')
            expect(resLogIn.body.data.user.name).toEqual(user.name)
            expect(resLogIn.body.data.user.email).toEqual(user.email)
            expect(resLogIn.header['content-type']).toContain('application/json')
            // console.log(resLogIn.header)
            // const deleteRes = await request
            //     .delete('/users/deleteMe').set('Cookie', resLogIn.headers['set-cookie'])
            //     .expect(204)
            await deleteUserFunc(cookie).then(el => {
                expect(el.statusCode).toEqual(204)
                expect(el.body).toEqual({})
                // console.log(el)
            })
            await logInFunc(user).then(res => {
                console.log(res.body, "LOGIN WITH DELETED USER")
                expect(res.statusCode).toEqual(401)
            })

        });
    });

    describe.only('Negative tests', () => {
        let cookie: [x:string]
        beforeEach(async () => {
           const res =  await signUpFunction(user)
            cookie = res.header['set-cookie']
        })
        afterEach(async() => {
            await deleteUserFunc(cookie)
        })
        it('User can not login with invalid credentials', async () => {
         await logInFunc({
              email: user.email + '1',
              password: user.password + '1'
          }).then(res => {
             console.log(res.body)
             expect(res.statusCode).toEqual(401)
             expect(res.body.message).toEqual('Incorrect email or password')
         })
        });
    });
});