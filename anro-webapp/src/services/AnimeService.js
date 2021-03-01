import env from "react-dotenv";

const randomAnimeEndpoint = `${env.API_URL}/anime/random`

async function getRandomAnime() {
    console.log(`Making GET request to ${randomAnimeEndpoint}`)
    const req = await fetch(randomAnimeEndpoint)
    const json = await req.json()
    console.log(`Received ${json.name}`)
    return json
}


export {getRandomAnime}