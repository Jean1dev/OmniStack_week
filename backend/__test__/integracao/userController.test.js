const request = require('supertest')
const app = require('../../src/app')

describe('User', () => {
    beforeAll(() => console.log('beforeAll'))
    beforeEach(() => console.log('before each'))

    it('deve salvar o usuario no banco', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "name",
                email: "email@email.test.json.com",
                password: "password",
                provider: true,
            })

        expect(response.body).toHaveProperty('id')
    })

    it('Aprendendo tests', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: "name",
                email: "email@email.test.json.com",
                password: "password",
                provider: true,
            })

        expect(response.status).toBe(400)
    })
})