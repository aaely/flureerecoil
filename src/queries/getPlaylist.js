import axios from 'axios'

export const getPlaylist = async (token) => {

    const response = await axios({
        url: 'https://api.spotify.com/v1/me/playlists',
        method: 'GET',
        headers: {  'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
        },
    })
    console.log(response)
    return response.data.items
}