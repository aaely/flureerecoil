import axios from 'axios'

export const searchSpotify = async (token, term, type) => {
    term.replace(/\ /g, '%20')
    console.log(term)
    const response = await axios({
        url: `https://api.spotify.com/v1/search?q=${term}&type=${type}`,
        method: 'GET',
        headers: {  'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
        },
    })
    console.log(response)
    return response.data
}