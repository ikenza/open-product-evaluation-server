const { seedDatabase } = require('mongo-seeding')
const config = require('../config')


beforeEach(async () => {
  await seedDatabase(config.seeder)
})
