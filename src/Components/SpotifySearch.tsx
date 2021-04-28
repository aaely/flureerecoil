import { ChangeEventHandler, FunctionComponent, useState, useRef, RefObject, useEffect } from 'react'
import { accessToken } from '../Recoil'
import { useRecoilValue } from 'recoil'
import { getAlbumTracks, getArtistAlbums, searchSpotify } from '../queries'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { MySyntheticEvent } from '../types'
import { getShowEpisodes } from '../queries'
import RenderArtists from './RenderArtists.tsx'
import RenderTracks from './RenderTracks.tsx'
import RenderArtistAlbums from './RenderArtistAlbums.tsx'
import RenderAlbumTracks from './RenderAlbumTracks.tsx'
import RenderShows from './RenderShows.tsx'
import RenderEpisodes from './RenderEpisodes.tsx'


const Player: FunctionComponent = (props: any) => {

    const searchRef = useRef<RefObject<any>>(null)

    const token: string = useRecoilValue(accessToken)
    const [term, setTerm] = useState<string>('')
    const [type, setType] = useState<string>('artist')
    const [artists, setArtists] = useState<any>([])
    const [tracks, setTracks] = useState<any>([])
    const [shows, setShows] = useState<any>([])
    const [episodes, setShowEpisodes] = useState<any>([])
    const [albumTracks, setAlbumTracks] = useState<any>([])
    const [albums, setAlbums] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    
    const handleChange: ChangeEventHandler = ({target: {value, id}}: MySyntheticEvent) => {
        switch(id) {
            case 'searchType': {
                setType(value)
                break;
            }
            case 'searchText': {
                setTerm(value)
                break;
            }
            default: {
                break;
            }
        }
    }

    const setArtistAlbums: Function = async (artistId: string) => {
        const response = await getArtistAlbums(token, artistId)
        setAlbums(response)
        setArtists([])
    }

    const _setAlbumTracks: Function = async (albumId: string) => {
        const response = await getAlbumTracks(token, albumId)
        setAlbumTracks(response)
        setAlbums([])
    }

    const _setShowEpisodes: Function = async (showId: string) => {
        const response = await getShowEpisodes(token, showId)
        setShowEpisodes(response)
        setShows([])
    }

    const send: Function = async () => {
        const response = await searchSpotify(token, term, type)
        switch(type) {
            case 'artist': {
                setArtists([])
                setArtists(response.artists.items)
                setTracks([])
                setAlbumTracks([])
                setAlbums([])
                setShows([])
                console.log(artists)
                break;
            }
            case 'track': {
                setTracks([])
                setTracks(response.tracks.items)
                setArtists([])
                setAlbums([])
                setAlbumTracks([])
                setShows([])
                console.log(tracks)
                break;
            }
            case 'show': {
                setShows([])
                setShows(response.shows.items)
                setArtists([])
                setAlbums([])
                setAlbumTracks([])
                console.log(shows)
                break;
            }
            default: {
                break;
            }
        }
    }

    useEffect(() => {
        if(loading) {
            searchRef.current.focus()
            setLoading(false)
        }
    }, [])

    const renderForm: Function = () => {
        return(
            <Form>
                <FormGroup>
                    <Label for='track'>Search Text</Label>
                    <Input type='text' id='searchText' innerRef={searchRef} value={term} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='track'>Search By:</Label>
                    <Input type='select' name='searchType' id='searchType' value={type} onChange={handleChange}>
                        <option>artist</option>
                        <option>track</option>
                        <option>show</option>
                    </Input>
                </FormGroup>
                <Button color='success' style={{margin: 'auto', display: 'block'}} onClick={() => send()}>Search</Button>
            </Form>
        )
    }

    return(
        <>
            <h3 style={{textAlign: 'center'}}>Search by {type}:</h3>
            {renderForm()}
            <br/>
            {artists.length > 0 && <RenderArtists artists={artists} getArtistAlbums={setArtistAlbums} />}
            {albums.length > 0 && <RenderArtistAlbums albums={albums} getAlbumTracks={_setAlbumTracks} />}
            {albumTracks.length > 0 && <RenderAlbumTracks tracks={albumTracks} token={token} />}
            {tracks.length > 0 && <RenderTracks tracks={tracks} />}
            {shows.length > 0 && <RenderShows shows={shows} getEpisodes={_setShowEpisodes} />}
            {episodes.length > 0 && <RenderEpisodes episodes={episodes} />}
        </>
    )
}

export default Player