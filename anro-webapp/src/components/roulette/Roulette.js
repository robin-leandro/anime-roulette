import React, { Component } from 'react'
import {getRandomAnime} from '../../services/AnimeService.js'

class Roulette extends Component {
    state = {
        rolledAnime: null
    }

    handleRoll = async () => {
        const anime = await getRandomAnime()
        console.log(`from roulette ${anime.name}`)
        this.setState({rolledAnime: anime})
    }

    render() {
        const anime = this.state.rolledAnime
        
        if (anime) {
            if (anime.rolledEpisode) {
                return (
                    <div> 
                        <p>Your anime is {anime.name}, episode #{anime.rolledEpisode}!</p>
                        <button onClick={this.handleRoll}>Another spin?</button>
                    </div>
                )
            } else return (
                <div> 
                    <p>Your anime is {anime.name}!</p>
                    <button onClick={this.handleRoll}>Another spin?</button>
                </div>
            )
        } else return (
            <div>
                <button onClick={this.handleRoll}>Give it a spin!</button>
            </div>
        )
    }
}

export default Roulette