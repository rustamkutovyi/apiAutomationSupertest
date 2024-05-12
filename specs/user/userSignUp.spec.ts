import * as supertest from "supertest";
import {createRandomUser, user} from '../../data/user'

const request = supertest('localhost:8001/api/v1');

describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING', () => {
        it('Create new user', async () => {
            const res = await request
                .post('/users/signup')
                .send({
                    name: "Rustam",
                    email: "test4@gmail.com",
                    password: "pass1234",
                    passwordConfirm: "pass1234"
                })
                .expect(201)
            expect(res.body.status).toEqual('success')
            expect(res.body.token).toBeDefined()
            expect(typeof res.body.token).toBe('string')
            expect(res.body.data.user.name).toEqual('Rustam')
            expect(typeof res.body.data.user._id).toEqual('string')

            console.log(res.body)
        });
        it('Create new user with imported data', async () => {
            const res = await request
                .post('/users/signup')
                .send(user)
                .expect(201)
            expect(res.body.status).toEqual('success')
            expect(res.body.token).toBeDefined()
            expect(typeof res.body.token).toBe('string')
            expect(res.body.data.user.name).toEqual(user.name)
            expect(res.body.data.user.email).toEqual(user.email)
            expect(typeof res.body.data.user._id).toEqual('string')

            console.log(res.body)
        });
        it('Create a new user with imported data using done', (done) => {
            request
                .post('/users/signup')
                .send(user)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body.status).toEqual('success')
                    expect(res.body.token).toBeDefined()
                    expect(typeof res.body.token).toBe('string')
                    expect(res.body.data.user.name).toEqual(user.name)
                    expect(res.body.data.user.email).toEqual(user.email)
                    expect(typeof res.body.data.user._id).toEqual('string')
                    console.log(res.body)
                    done()
                })
        });
        it('Create a new user with imported data using then', async () => {
            await request
                .post('/users/signup')
                .send(user)
                .expect(201)
                .then(res => {
                    expect(res.body.status).toEqual('success')
                    expect(res.body.token).toBeDefined()
                    expect(typeof res.body.token).toBe('string')
                    expect(res.body.data.user.name).toEqual(user.name)
                    expect(res.body.data.user.email).toEqual(user.email)
                    expect(typeof res.body.data.user._id).toEqual('string')
                    console.log(res.body)
                })
        })
    });
    describe.only('NEGATIVE TESTING', () => {
        // BUG user can be crated with existing email
        it('Should not create user with existing email', async () => {
            await request.post('/users/signup').send(user)
            await request.post('/users/signup').send(user).then(resp => {
                // console.log(resp.body)
            })
        });
        it('Should not create user without name field', async () => {
            await request.post('/users/signup').send({
                email: user.email,
                password: user.password,
                passwordConfirm: user.password
            }).then(resp => {
                // console.log(resp.body)
                expect(resp.statusCode).toEqual(500)
                expect(resp.body.status).toBe('error')
                expect(resp.body.message).toEqual('User validation failed: name: Please tell us your name!')
            })
        });
        it('Should not create user without email field', async () => {
            await request.post('/users/signup').send({
                name: user.name,
                password: user.password,
                passwordConfirm: user.password
            }).then(resp => {
                // console.log(resp.body)
                expect(resp.statusCode).toEqual(500)
                expect(resp.body.status).toBe('error')
                expect(resp.body.message).toEqual('User validation failed: email: Please provide your email')
            })
        });
        it('Should not create user without password field', (done) => {
            request.post('/users/signup').send({
                name: user.name,
                email: user.email,
                passwordConfirm: user.password
            }).expect(500)
                .end((err, res) => {
                    if (err) return done(err)
                    // console.log(res.body)
                    expect(res.body.status).toEqual('error')
                    expect(res.body.message).toEqual('User validation failed: password: Please provide a password, passwordConfirm: Passwords are not the same!')
                    done()
                })
        });
        it('Should not create a user without confirm password field', async () => {
            const res = await request.post('/users/signup').send({
                name: user.name,
                email: user.email,
                password: user.password
            })
            // console.log(res.body)
            expect(res.statusCode).toEqual(500)
            expect(res.body.status).toEqual('error')
            expect(res.body.message).toEqual('User validation failed: passwordConfirm: Please confirm your password')
        });
    });
});