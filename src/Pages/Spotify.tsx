import { FunctionComponent } from 'react'
import SpotifySearch from '../Components/SpotifySearch'
import Player from '../Components/SpotifyPlayer.tsx'
import Exp from '../Components/Exp.tsx'


const Spotify: FunctionComponent = () => {

    return(
        <div style={{marginLeft: '10%', marginRight: '10%', backgroundColor: '#eee', textAlign: 'center'}}>
            <br/>
            <Exp />
            <br/>
            <a href='/auth/spotify' >Login to Spotify</a>
            <h1 style={{textAlign: 'center'}}>Manage Your Spotify Account Here:</h1>
            <br />
            <SpotifySearch />
        </div>
    )
}

export default Spotify