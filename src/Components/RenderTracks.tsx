import { Table, Button } from 'reactstrap'
import { playerUri } from '../Recoil'
import { useSetRecoilState } from 'recoil'

type Artists = {
    name: string
}

type Info = {
    name: string,
    artists: Artists[],
    uri: string,
    id: string
}

interface PropTypes {
    tracks: Info[]
}

const RenderTracks = (props: PropTypes) => {

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
                        Artist Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.tracks.length > 0 && props.tracks.map(track => {
                    return(
                        <tr key={track.id}>
                            <td>
                                {track.name}
                            </td>
                            <td>
                                {track.artists[0].name}
                            </td>
                            <td>
                                <Button color='success' onClick={() => play(track.uri)}>Play</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default RenderTracks