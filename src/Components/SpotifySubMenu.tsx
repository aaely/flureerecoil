import { SubMenu, MenuItem } from "react-pro-sidebar"
import { useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import SpotifyPlayer from './SpotifyPlayer.tsx'
import { expTime } from '../Recoil'
import { useRecoilValue } from 'recoil'
import '../css/app.scss';
import 'react-pro-sidebar/dist/css/styles.css';

const SpotifySubMenu: Function = () => {

    const exp: number = useRecoilValue(expTime)
    const [showPlayer, setShowPlayer] = useState<boolean>(false)
    
    setTimeout(() => {setShowPlayer(true)}, 2000)

    return(
        <>
            <SubMenu icon={<FaSpotify />} suffix={exp}>
                {exp === undefined && <MenuItem><a href='/auth/spotify'>Spotify Login</a></MenuItem>}
                {showPlayer && exp > 0 && <MenuItem>
                    <SpotifyPlayer />
                </MenuItem>}
            </SubMenu> 
        </>
    )
}

export default SpotifySubMenu                