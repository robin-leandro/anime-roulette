import databaseUtils from '../utils/databaseUtils.js'

async function recordRoll(rolledAnime, user, channel, server) {
    const collection = await databaseUtils.getAnimeCollection('history')
    await collection.insertOne({rolledAnime, user, channel, server, timestamp: new Date()})
}

export default {recordRoll}