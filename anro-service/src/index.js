import Express from "express"
import AnimeController from "./controllers/animeController.js"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = Express()
const port = process.env.PORT

app.use(cors())

app.get("/health", (req, res)=> {
    console.log('health endpoint called')
    res.send("OK")
})

app.get("/anime/random",  AnimeController.getRandomAnime)


app.listen(port, ()=> {
    console.log(`listening on ${port}`)
})