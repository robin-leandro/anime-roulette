import databaseUtils from '../utils/databaseUtils.js'

async function getOneRandom() {
    //return collection.aggregate({$sample: {size: 1}})
    const collection = await databaseUtils.getAnimeCollection('anime')
    const anime = await collection.aggregate(
        [
            {$sample: {size: 1}}
        ]).toArray()
    return anime[0]
}

export default {getOneRandom}