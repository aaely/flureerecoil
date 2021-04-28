import axios from 'axios'

export const getAlbumTracks = async (token, id) => {

    const response = await axios({
        url: `/v1/tracks/${id}`,
        method: 'GET',
        headers: {  'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
        },
    })
    console.log(response)
    return response.data.items
}