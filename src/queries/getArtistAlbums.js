import axios from 'axios'

export const getArtistAlbums = async (token, id) => {
    try {
        const response = await axios({
            url: `https://api.spotify.com/v1/artists/${id}/albums`,
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