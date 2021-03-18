import axios from 'axios'

async function getRandomAnime(user=null, channel=null, server=null) {
    const url = `${process.env.API_URL}/anime/random`
    const serviceResponse = await axios({method: 'get', url: url, params: {user, channel, server}})
    console.log(`Response from server: ${serviceResponse.data.name}`)
    return serviceResponse.data
}

export default {getRandomAnime}