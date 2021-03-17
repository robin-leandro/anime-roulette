import MongoClient from 'mongodb'

// Start connection
console.log('Connecting to mongo...')
const mongoConnString = 'mongodb://anro-admin:anro-pass@anro-mongo:27017/?appname=seed-script'
const dbClient = await MongoClient.connect(mongoConnString, { useNewUrlParser: true, useUnifiedTopology: true })

// Drop the database
console.log('Dropping anime-roulette database...')
await dbClient.db('anime-roulette').dropDatabase()

// End connection
console.log('Anime databse dropped!\nClosing database connection...')
dbClient.close()
process.exit(0)
