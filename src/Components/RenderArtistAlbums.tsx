import { Table, Button } from 'reactstrap'
import { playerUri } from '../Recoil'
import { useSetRecoilState } from 'recoil'

type Artists = {
    name: string,
    id: string,
    uri: string
}

type Images = {
    url: string
}

type Info = {
    name: string,
    artists: Artists[],
    id: string,
    uri: string,
    images: Images[]
}

interface PropTypes {
    albums: Info[],
    getAlbumTracks: Function
}

const RenderArtistAlbums = (props: PropTypes) => {

    const setUri: Function = useSetRecoilState(playerUri)

    console.log(props)

    const play: Function = (newUri: string) => {
        setUri(newUri)
        console.log(newUri)
    }

    return(
        <Table striped responsive style={{maxWidth: '75%', marginLeft: 'auto', marginRight: 'auto'}}>
            <thead>
                <tr>
                    <th>
                        Album Name
                    </th>
                    <th>
                        Artist Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.albums.length > 0 && props.albums.map(album => {
                    return(
                        <tr key={album.id}>
                            <td>
                                <Button color='success' onClick={() => props.getAlbumTracks(album.id)}>{album.name}</Button> 
                            </td>
                            <td>
                                {album.artists[0].name}
                            </td>
                            <td>
                            {window.innerWidth > 600 && album.images.length > 0 && <img src={album.images[1].url} alt={album.name} />}
                            {window.innerWidth <= 600 && album.images.length > 0 && <img src={album.images[2].url} alt={album.name} />}
                            </td>
                            <td>
                                <Button color='success' onClick={() => play(album.uri)}>Play Album</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default RenderArtistAlbums