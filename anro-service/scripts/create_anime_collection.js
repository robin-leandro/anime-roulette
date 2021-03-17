import MongoClient from 'mongodb'
import axios from 'axios'

// Name of a Wikipedia subcategory that contains a list of subcategories of anime per year
// Each of these subcategories contains all the anime published that year
// We'll use this to get the id of each year subcategory, and use those ids to get every anime ever documented in wikipedia
const animeByYearsCategory = 'Category:Anime television series by year'
const wikipediaUrl = 'https://en.wikipedia.org/w/api.php'
const getCategoryMembersParams = {
    format: 'json',
    action: 'query',
    list: 'categorymembers',
    cmprop: 'ids|title',
    cmlimit: 500
}

// Fetch all the items in the list Category:Animes by year (or whatever its fuckn called) 
// This returns an array of subcategories (animes in year 1969, 1970, 1971, etc)
const yearCategories = await getCategoryMembersByTitle(animeByYearsCategory)

// Build an array containing axios promises 
// Each promise will resolve into a response with all the members in each subcategory returned by the last call 
const yearCategoryRequests = yearCategories.data.query.categorymembers
    .flatMap(category => { return getCategoryMembersById(category.pageid)})

// Await all the calls
// TODO: BEWARE! All these calls right here are assuming that there's 500 anime or less each year.
// Should do something about that at some point lol
const allResponses = await Promise.all(yearCategoryRequests)

// TODO: Here we could add an improvement to fetch the raw data for each pageid and parse it to obtain episode count etc.

// Arrange them into neat lil docs with some sexy-ass javascript array handling
const animeDocs = allResponses.flatMap(response => {
    return response.data.query.categorymembers.flatMap(anime=>{return {name: anime.title}}) 
})
console.log('Fetched some fuckin anime!!!! Have a random one:')
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
    return axios({method: 'get', url: wikipediaUrl, params: {...getCategoryMembersParams, cmtitle: title}})
}

// Makes a call to the wikipedia API fetching all the children pages of a category by id
function getCategoryMembersById(id) {
    return axios({method: 'get', url: wikipediaUrl, params: {...getCategoryMembersParams, cmpageid: id}})
}