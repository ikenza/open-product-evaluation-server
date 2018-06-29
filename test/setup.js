const { seedDatabase } = require('mongo-seeding')
const config = require('../config')

console.log('-----------------Preparing Test-----------------')


beforeEach(async () => {
  console.log('seeding db...')
  await seedDatabase(config.seeder)
})


console.log('---------------Preparing Finished---------------')
