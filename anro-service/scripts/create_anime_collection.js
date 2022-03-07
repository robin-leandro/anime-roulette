import MongoClient from 'mongodb'
import axios from 'axios'

const wikipediaUrl = 'https://en.wikipedia.org/w/api.php'
const yearCategoryTemplate = 'Category:{year}_anime_television_series_debuts‎' 
const firstYear = 1961
const lastYear = new Date().getFullYear();
let years = []
for(let year=firstYear; year<=lastYear; year++) years.push(year)

const yearCategoryRequests = years.map(year => getCategoryMembersByTitle(yearCategoryTemplate.replace('{year}', year)))
const awaitedRequests = await Promise.all(yearCategoryRequests)

const animeDocs = awaitedRequests.flatMap(yearCategory => Object.values(yearCategory.data.query.pages).map(anime => {
    return {name: anime.title, wikipediaUrl: anime.canonicalurl}
}))
console.log(`Fetched ${animeDocs.length} fuckin anime!!!! Have a random one:`)
console.log(animeDocs[Math.floor(Math.random() * animeDocs.length)])

// Push to DB
// First start connection
const mongoConnString = 'mongodb://anro-admin:anro-pass@anro-mongo:27017/?appname=seed-script'
const dbClient = await MongoClient.connect(mongoConnString, { useNewUrlParser: true, useUnifiedTopology: true })
const animeCollection = dbClient.db('anime-roulette').collection('anime')
console.log('Connection with mongo established!')
console.log('And now pushing to DB...')
// Then batch insert all the docs
await animeCollection.insertMany(animeDocs)

// Finally. end connection
dbClient.close()
console.log('Data seeded and connection with mongo closed!')
process.exit(0)

// Makes a call to the wikipedia API fetching all the children pages of a category by title
function getCategoryMembersByTitle(title) {
    const params = {
        format: 'json', action: 'query', generator: 'categorymembers', gcmtitle: title, gcmlimit: 500, prop: 'info', inprop: 'url', 
    }
    return axios({method: 'get', url: wikipediaUrl, params: params})
}