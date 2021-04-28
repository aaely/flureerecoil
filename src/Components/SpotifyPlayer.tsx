import SpotifyPlayer from 'react-spotify-web-playback'
import { FunctionComponent } from 'react'
import { accessToken, playerUri } from '../Recoil'
import { useRecoilValue } from 'recoil'

const Player: FunctionComponent = () => {
    const acctoken: string = useRecoilValue(accessToken)
    const uri: string = useRecoilValue(playerUri)
    return(
        <SpotifyPlayer
            token={acctoken}
            magnifySliderOnHover={true}
            autoPlay={false}
            uris={uri}
            showSaveIcon={false}
        />
    )
}

export default Player