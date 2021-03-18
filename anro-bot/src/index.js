
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
	if (message.content.split(' ')[0] === `${prefix}randomAnime`) {
        console.log(`anime requested from user ${message.author.tag} in channel ${message.channel.toString()} in server ${message.channel.guild.id}`)
        const rolledAnime = await AnimeService.getRandomAnime(message.author.tag, message.channel.toString(), message.channel.guild.id)
        if(rolledAnime.wikipediaUrl) {
            message.channel.send(`Your anime is ${rolledAnime.name}\nWikipedia link: ${rolledAnime.wikipediaUrl}`)
        } else {
            message.channel.send(`Your anime is ${rolledAnime.name}`)
        }
    }
})

if (process.env.BOT_TOKEN) {
    console.log('Logging in...')
    client.login(process.env.BOT_TOKEN)
} else {
    console.log('Looks like you don\'t have an BOT_TOKEN environment variable. Kinda cringe.')
}