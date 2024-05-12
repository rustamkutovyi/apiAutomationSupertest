import * as supertest from "supertest"

const request = supertest('https://jsonplaceholder.typicode.com')

describe('POSTS', () => {
    it('GET request ', async () => {
        const res = await request.get('/posts')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].id).toBe(1)
        expect(res.body.length).toBe(100)
        // console.log(res)
        // console.log(res.body[0].id)
    });
    it('POST request ', async () => {
        const data = {
            userId: 101,
            title: "My new title",
            body: "text for body"
        }
        const res = await request.post('/posts').send(data)
        expect(res.statusCode).toEqual(201)
        expect(res.body.title).toEqual('My new title')
        // console.log(res)
    });
    it('PATCH request version 1', async () => {
        const data = {
            title: "My updated title",
        }
        const getRes = await request.get('/posts/1')
        const beforeTitle = getRes.body.title
        console.log(beforeTitle)
        const res = await request.patch('/posts/1').send(data)
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('My updated title')

    });
    it('DELETE request', async () => {
        const res = await request.delete('/posts/1')
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({})

    })
    it('PATCH request version 2', async () => {
        const data = {
            title: "My updated title",
        }
        const getRes = await request.get('/posts/1')
        const beforeTitle = getRes.body.title
        console.log(beforeTitle)
        await request
            .patch('/posts/1')
            .send(data)
            .then(res => {
                console.log(res.body)
                expect(res.statusCode).toEqual(200)
                expect(res.body.title).toEqual('My updated title')
                expect(res.body.title).not.toEqual(beforeTitle)
            })

    });
    it.only('PATCH request version 3', (done) => {
        const data = {
            title: "My updated title",
        }
        // const getRes =   request.get('/posts/1')
        // const beforeTitle = getRes.body.title
        // console.log(beforeTitle)
        request
            .patch('/posts/1')
            .expect(200)
            .send(data)
            .end((err, res) => {
                if (err) return done(err)
                console.log(res.body)
                expect(res.body.title).toEqual('My updated title')
                done()
            })

    });
});