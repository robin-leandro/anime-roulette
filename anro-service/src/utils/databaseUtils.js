import MongoClient from 'mongodb'

let dbClient = null
let animeDB = null

async function getAnimeCollection(collectionName) {
    if (!dbClient) {
        try {
            dbClient = await MongoClient.connect(process.env.MONGO_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            animeDB = dbClient.db(process.env.DB_NAME)
            console.log(`New DB connection started with ${process.env.MONGO_CONN_STRING}`)
        } catch (err) {
            console.log(`Could not connect to mongo with ${process.env.MONGO_CONN_STRING}`)
            console.log(err)
            return null
        }
    }
    return animeDB.collection(collectionName)
}

process.on('exit', (code) => {
    if (dbClient) {
        dbClient.close()
        console.log('Closed database connection');
    }
});

process.on('SIGINT', (code) => {
    if (dbClient) {
        dbClient.close()
        console.log('Closed database connection');
    }
});

export default { getAnimeCollection }