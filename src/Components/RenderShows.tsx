import { Table, Button } from 'react-bootstrap'
import { playerUri } from '../Recoil'
import { useSetRecoilState } from 'recoil'

type Shows = {
    name: string
}

type Info = {
    name: string,
    artists: Shows[],
    uri: string,
    id: string
}

interface PropTypes {
    shows: Info[],
    getEpisodes: Function
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
                {props.shows.length > 0 && props.shows.map(show => {
                    return(
                        <tr key={show.id}>
                            <td>
                                {show.name} <Button color='success' onClick={() => props.getEpisodes(show.id)}>Get Episodes</Button>
                            </td>
                            <td>
                                <Button color='success' onClick={() => play(show.uri)}>Play</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default RenderTracks