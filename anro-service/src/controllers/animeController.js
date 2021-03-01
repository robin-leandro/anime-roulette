import AnimeDao from "../dao/animeDao.js"

async function getRandomAnime(req, res) {
    console.log('/anime/random called')

    // Retrieve a random anime from DB
    const rolledAnime = await AnimeDao.getOneRandom()

    // Roll a random episode
    const randomEp = Math.floor(Math.random() * rolledAnime.episodeCount)+1
    rolledAnime.rolledEpisode = randomEp

    console.log(`returning ${rolledAnime.name} episode ${randomEp}`)

    res.json( rolledAnime)
}

export default {getRandomAnime}