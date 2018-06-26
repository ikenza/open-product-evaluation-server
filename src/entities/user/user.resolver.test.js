const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.should()
chai.use(chaiAsPromised)

require('chai/register-should')
const users = require('../../../seeds/data/user/user')

const resolvers = require('./user.resolvers')


const context = {
  db: {
    user: {
      get: () => users,
      insert: data => data,
    },
  },
  request: {
    auth: null,
  },
}


describe('User Resolver', () => {
  describe('Querys', () => {
    describe('User is not authed', () => {
      it('should throw an Error', async () => {
        const resolved = resolvers.Query.users({}, {}, context, {})
        await resolved.should.be.rejectedWith(Error, 'Not authorized or no permissions.')
      })
    })
    describe('User is authed', () => {
      before(() => {
        context.request.auth = {
          user: {
            id: 'b3daa77b4c04a9551b8781d0',
            isAdmin: false,
          },
        }
      })
      it('should return just own user', async () => {
        const resolved = await resolvers.Query.users({}, {}, context, {})
        resolved.should.be.equal(users[0])
      })
    })
    describe('User is admin', () => {
      before(() => {
        context.request.auth = {
          user: {
            isAdmin: true,
          },
        }
      })
      it('should return all Users', async () => {
        const resolved = await resolvers.Query.users({}, {}, context, {})
        resolved.should.be.length(3).and.equal(users)
      })
      it('should return User with requested ID', async () => {
        const resolved = await resolvers.Query.user({}, { userID: 'b3daa77b4c04a9551b8781d0' }, context, {})
        resolved.should.be.equal(users[0])
      })
    })
  })
  describe('Mutations', () => {
    describe('Login', () => {
      const args = {
        data: {
          email: 'null',
          password: 'null',
        },
      }
      it('should deny login of invalid users', async () => {
        args.data.email = 'wrong@hack.to'
        args.data.password = 'Hack0r'
        const resolved = resolvers.Mutation.login({}, args, context, {})
        await resolved.should.be.rejectedWith(Error, 'Email or password wrong.')
      })
      it('should login valid users', async () => {
        args.data.email = users[0].email
        args.data.password = users[0].password
        const resolved = await resolvers.Mutation.login({}, args, context, {})
        resolved.token.should.be.a('string')
        resolved.user.should.equal(users[0])
      })
    })
    describe('Create User', () => {
      /* before(() => {
        context.request.auth = {
          user: {
            isAdmin: true,
          },
        }
      }) */
      it('should create a new user')
      it('should throw an error if user already exists', async () => {
        const user = {
          id: 'aefaef',
          firstName: 'John',
          lastName: 'Doe',
          password: '7c4a8d09ca3762af61e59520943dc26494f8941b',
          email: 'john@doe.com',
          isAdmin: false,
        }
        const resolved = await resolvers.Mutation.createUser({}, { data: user }, context, {})
        resolved.token.should.be.a('string')
        resolved.user.should.equal(user)
      })
    })
  })
})
