import axios from 'axios'

export const getAlbumTracks = async (token, id) => {
    try {
        const response = await axios({
            url: `https://api.spotify.com/v1/albums/${id}/tracks`,
            method: 'GET',
            headers: {  'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
            },
        })
        console.log(response)
        return response.data.items
    } catch (error) {
        console.log(error)
    }
}