import axios from 'axios'

async function getRandomAnime() {
    const url = `${process.env.API_URL}/anime/random`
    const serviceResponse = await axios.get(url)
    console.log(`Received ${serviceResponse.data.name} from server`)
    return serviceResponse.data
}

export default {getRandomAnime}