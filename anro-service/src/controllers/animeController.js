import AnimeDao from "../dao/animeDao.js"
import HistoryDao from "../dao/historyDao.js"

async function getRandomAnime(req, res) {
    console.log(`/anime/random called by user ${req.query.user} in channel ${req.query.channel} in server ${req.query.server}`)

    // Retrieve a random anime from DB
    const rolledAnime = await AnimeDao.getOneRandom()

    // Roll a random episode
    if (rolledAnime.episodeCount) {
        rolledAnime.rolledEpisode = Math.floor(Math.random() * rolledAnime.episodeCount)+1
    }

    // Record roll
    if (req.query.user || req.query.channel) {
        HistoryDao.recordRoll(rolledAnime.id, req.query.user, req.query.channel, req.query.server).then(()=> {console.log('Roll recorded')})
    }
    
    console.log(`returning ${rolledAnime.name}`)
    res.json( rolledAnime)
}

export default {getRandomAnime}