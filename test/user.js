const chai = require('chai')
const users = require('../seeds/data/user/user')
const config = require('../config')

const url = `http://localhost:${config.app.port}`
const request = require('supertest')(url)

chai.should()


// TODO seed before test mocha global before index

describe('User Resolver', () => {
  describe('Querys', () => {
    describe('User is not authed', () => {
      it('should throw an Error', async () => {
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
        data.login.token.should.be.a('string')
        data.login.user.should.be.deep.equal(expect)
      })
    })
  })
})
