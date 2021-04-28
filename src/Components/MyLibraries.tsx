import { Table, Button } from 'reactstrap'
import { playerUri } from '../Recoil'
import { useSetRecoilState } from 'recoil'

type Images = {
    url: string
}

type Info = {
    name: string,
    images: Images[],
    uri: string
}

interface PropTypes {
    artists: Info[]
}

const RenderArtists: Function = (props: PropTypes) => {

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
                        Artist Name
                    </th>
                    <th>
                        Image
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.artists.length > 0 && props.artists.map(artist => {
                    return(
                        <tr key={artist.name}>
                            <td>
                                {artist.name}
                            </td>
                            <td>
                                {artist.images.length > 0 && window.innerWidth > 600 && <img src={artist.images[1].url} alt={artist.name} />}
                                {artist.images.length > 0 && window.innerWidth <= 600 && <img src={artist.images[2].url} alt={artist.name} />}
                            </td>
                            <td>
                                <Button color='success' onClick={() => play(artist.uri)}>Play</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default RenderArtists