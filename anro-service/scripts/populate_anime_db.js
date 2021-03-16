import MongoClient from 'mongodb'
import axios from 'axios'

const animeByYearsCategory = 'Category:Anime television series by year'
const wikipediaUrl = 'https://en.wikipedia.org/w/api.php'
const getCategoryMembersParams = {
    format: 'json',
    action: 'query',
    list: 'categorymembers',
    cmprop: 'ids|title',
    cmlimit: 500
}

// Start connection
const mongoConnString = 'mongodb://anro-admin:anro-pass@anro-mongo:27017/?appname=seed-script'
const dbClient = await MongoClient.connect(mongoConnString, { useNewUrlParser: true, useUnifiedTopology: true })
const animeCollection = dbClient.db('anime-roulette').collection('anime')
console.log('Connection with mongo established!')

// Fetch all the items in the Category:Animes by year (or whatever its fuckn called) 
// This returns an array of subcategories (animes in year 1969, 1970, 1971, etc)
const yearCategories = await getCategoryMembersByTitle(animeByYearsCategory)

// Build an array containing an array of promises 
// Each promise will resolve into an axios GET all the members in each category returned by the last call 
const yearCategoryRequests = yearCategories.data.query.categorymembers
    .flatMap(category => { return axios({
        method: 'get', 
        url: wikipediaUrl,
        params: {
            ...getCategoryMembersParams, 
            cmpageid: category.pageid
        }
    })
})

// Await all the calls
// BEWARE! All these calls right here are assuming that there's 500 anime or less each year.
// Should do something about that at some point.
const allResponses = await Promise.all(yearCategoryRequests)

// Here we could add an improvement to fetch the raw data for each pageid and parse it to obtain episode count etc.

// Arrange them into nice lil docs with a some sexy-ass javascript array handling
const animeDocs = allResponses.flatMap(response => {
    return response.data.query.categorymembers.flatMap(anime=>{return {name: anime.title}}) 
})
console.log('Fetched some fuckin anime!!!! Take a look-see:')
console.log(animeDocs)

// Push to DB
console.log('And now pushing to DB...')
await animeCollection.insertMany(animeDocs)

// End connection
dbClient.close()
console.log('Data seeded and connection with mongo closed!')
process.exit(0)



async function getCategoryMembersByTitle(title) {
    return await axios({method: 'get', url: wikipediaUrl, params: {...getCategoryMembersParams, cmtitle: title}})
}

async function getCategoryMembersById(id) {
    return await axios({method: 'get', url: wikipediaUrl, params: {...getCategoryMembersParams, cmpageid: id}})
}