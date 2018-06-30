
const users = require('../seeds/data/user/user')

const request = require('./requesthelper.js')

describe('User', () => {
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
      const expected = users[2]

      const query = {
        query: `mutation {
          login(data: {email: "${expected.email}", password: "${expected.password}"}) {
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

      const res = await request.anon(query)
      const { body: { data } } = res
      const { login: { user } } = data
      data.login.token.should.be.a('string')
      user.firstName.should.be.equal(expected.firstName)
      user.lastName.should.be.equal(expected.lastName)
      user.email.should.be.equal(expected.email)
    })
  })
})
