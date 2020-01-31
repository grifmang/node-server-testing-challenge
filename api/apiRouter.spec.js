const request = require('supertest');
const db = require('../data/dbConfig.js');
const api = require('./apiModel.js');
const server = require('./server.js');
const apiRouter = require('./apiRouter.js');

// let token;

// beforeAll((done) => {
//     request(apiRouter)
//         .post('/register')
//         .send({
//             username: "Tim",
//             password: "tim",
//             department: "HR"
//         })
//         .end((err, response) => {
//             token = response.body.token; // save the token!
//             done();
//         });
// });

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return 200', function() {
            return request(server).get('/')
            .then(response => {
                expect(response.status).toBe(200);
            })
        })

        it('should return json', function() {
            return request(server).get('/')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
        })

        it('should return text', function() {
            return request(server).get('/')
            .then(response => {
                expect(response.body.message).toBe('Server returning on /');
            })
        })
    })

})

describe('apiRouter tests', () => {
    describe('check for testing environment', () => {
        it('should run in testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe('add user', () => {
        beforeEach(async () => {
            await db('users').truncate();
        })
    
        it('add a user route', async () => {
            await api.add({ username: "Tim", password: "tim", department: "HR" });
    
            const users = await db('users');
    
            expect(users).toHaveLength(1);
        })

        it('remove a user', async () => {
            const username = "Tim"
            await api.add({ username: "Tim", password: "tim", department: "HR" });
            await api.remove(username);

            const users = await db('users');
            
            expect(users).toHaveLength(0);
        })

        // it('login', async () => {

        //     await api.add({ username: "Tim", password: "tim", department: "HR" });
        //     await request(apiRouter).post('/login').send({ username: "Tim", password: "tim", department: "HR" })
        //     .then(response => {
        //         expect(response.status).toBe(201);
        //     })
        // })
    })
})

