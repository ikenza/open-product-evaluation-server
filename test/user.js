const chai = require('chai')
const users = require('../seeds/data/user/user')
const config = require('../config')

const url = `http://localhost:${config.app.port}`
const request = require('supertest')(url)

chai.should()

describe('User Resolver', () => {
  describe.skip('Querys', () => {
    it('should return a list of all Users')
    it('should return a specific User')
  })
  describe('Mutations', async () => {
    it('should create a User')
    it('should update a User')
    it('should delete a User')
    it('should deny login of an invalid User')
    it('should login a valid User', async () => {
      const query = {
        query: `mutation {
          login(data: {email: "Jake@doe.com", password: "fe605d3cac6d5698bd85e76ebfbdee18763519c7"}) {
            token
            user {
              id
              creationDate
              lastUpdate
              firstName
              lastName
              email
            }
          }
        }`,
      }

      const expect = users[2]

      const res = await request.post('/')
        .set('Accept', 'application/json')
        .send(query)
      const { body: { data } } = res
      const { login: { user } } = data
      data.login.token.should.be.a('string')
      user.firstName.should.be.equal(expect.firstName)
      user.lastName.should.be.equal(expect.lastName)
      user.email.should.be.equal(expect.email)
    })
  })
})
