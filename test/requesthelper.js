const config = require('../config')

const url = `http://localhost:${config.app.port}`
const request = require('supertest')(url)

const graphqlEndpoint = '/'

module.exports = {
  anon: query => request.post(graphqlEndpoint)
    .set({ Accept: 'application/json' })
    .send(query),
  user: (query, token) => request.post(graphqlEndpoint)
    .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
    .send(query),
}
