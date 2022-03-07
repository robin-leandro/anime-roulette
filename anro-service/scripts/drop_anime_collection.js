import MongoClient from 'mongodb'

// Start connection
console.log('Connecting to mongo...')
const mongoConnString = 'mongodb://anro-admin:anro-pass@anro-mongo:27017/?appname=seed-script'
const dbClient = await MongoClient.connect(mongoConnString, { useNewUrlParser: true, useUnifiedTopology: true })

// Drop anime-collection
console.log('Dropping anime collection...')
try {
    await dbClient.db('anime-roulette').dropCollection('anime')
    console.log('anime collection dropped!\nClosing database connection...')
} catch(e) {
    console.log('collection not dropped, probably did not exist yet...')
}

// End connection
dbClient.close()
process.exit(0)
