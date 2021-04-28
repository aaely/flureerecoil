import { Table, Button } from 'reactstrap'
import { playerUri } from '../Recoil'
import { useSetRecoilState } from 'recoil'
import { addToMyTracks } from '../queries/addToMyTracks'

type Episodes = {
    name: string
}

type Info = {
    name: string,
    artists: Episodes[],
    uri: string,
    id: string
}

interface PropTypes {
    episodes: Info[],
    token: string
}

const RenderAlbumTracks = (props: PropTypes) => {

    console.log(props)

    const setUri: Function = useSetRecoilState(playerUri)

    const play: Function = (newUri: string) => {
        setUri(newUri)
        console.log(newUri)
    }

    return(
        <Table striped responsive style={{maxWidth: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
            <thead>
                <tr>
                    <th>
                        Track Name
                    </th>
                    <th>
                        {/*props.tracks[0].artists[0].name*/}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.episodes.length > 0 && props.episodes.map((episode, index) => {
                    return(
                        <tr key={episode.id}>
                            <td>
                                {episode.name}
                            </td>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <Button color='success' onClick={() => addToMyTracks(props.token, episode.id)}>Add to Favorites</Button>
                            </td>
                            <td>
                                <Button color='success' onClick={() => play(episode.uri)}>Play</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default RenderAlbumTracks