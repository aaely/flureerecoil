import axios from 'axios'

export const addToMyTracks = async (token, id) => {
    try {
        const response = await axios({
            url: `https://api.spotify.com/v1/me/tracks?ids=${id}`,
            method: 'PUT',
            headers: {  'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
            },
        })
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}