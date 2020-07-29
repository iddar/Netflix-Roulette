require('dotenv').config()

const fetch = require('node-fetch')
const MongoClient = require('mongodb').MongoClient

const getTitlesURI = (days = 15, region = 'mx') => {
    return `${process.env['ROOT_API']}/aaapi.cgi?q=get%3Anew${days}%3A${region}&p=1&t=ns&st=adv`
}

const requestConf = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env['APYKEY']
    },
}

function getTitle(days, region) {
    return fetch(getTitlesURI(days, region), requestConf)
        .then(resp => resp.json())
        .then(respJson => respJson['ITEMS'])
}

async function run () {
    let titles = await getTitle()
    let mongoClient = await MongoClient.connect(process.env['DB_URI'], { useNewUrlParser: true, useUnifiedTopology: true })
    
    let db = mongoClient.db(process.env['DATABASE'])
    let collection = db.collection(process.env['DB_COLLECTION'])
   
    collection.insertMany(titles)

    mongoClient.close()
    process.exit(0)
}

module.exports = run

run()
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
