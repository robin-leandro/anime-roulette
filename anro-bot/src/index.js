
import dotenv from 'dotenv'
import Discord from 'discord.js'
import AnimeService from './services/AnimeService.js'
dotenv.config()
const client = new Discord.Client()
const prefix = '!'

client.once('ready', () => {
	console.log('Bot is ready!')
})

client.on('message', async message => {
	if (message.content === `${prefix}randomAnime`) {
        const response = await AnimeService.getRandomAnime()
        message.channel.send(`Your anime is ${response.name}`)
    }
})

if (process.env.BOT_TOKEN) {
    console.log('Logging in...')
    client.login(process.env.BOT_TOKEN)
} else {
    console.log('Looks like you don\'t have an BOT_TOKEN environment variable. Kinda cringe.')
}