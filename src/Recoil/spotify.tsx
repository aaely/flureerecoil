
import { atom, atomFamily, selector, selectorFamily, useRecoilCallback } from 'recoil'
import { getPlaylist } from '../queries/getPlaylist'
import { getPlayer } from '../queries/getPlayer'
import { token } from '../queries/getUser'
import { initUser, UserProfile } from '../types/types.ts'

export const api = atom({
    key: 'api',
    default: 'https://api.spotify.com/v1/'
})

export const expTime = atom<number>({
    key: 'expTime',
    default: 0,
    persistence_UNSTABLE: {
        type: 'expTime'
    }
})

export const playerUri = atom<string>({
    key: 'playerUri',
    default: '',
    persistence_UNSTABLE: {
        type: 'playerUri'
    }
})

export const accessToken = atom<string>({
    key: 'accessToken',
    default: '',
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const refreshToken = atom<string>({
    key: 'refreshToken',
    default: '',
    persistence_UNSTABLE: {
        type: 'refreshToken'
    }
})

export const userProfile = atom<UserProfile>({
    key: 'userProfile',
    default: initUser(),
    persistence_UNSTABLE: {
        type: 'userProfile'
    }
})

export const getUserProfile = selector({
    key: 'getUserProfile',
    get: async ({}) => {
        const response = await token()
        return response.data.prf
    }
})

export const getToken = selector({
    key: 'getToken',
    get: async ({}) => {
        const response = await token()
        console.log(response)
        return response.data.acc_token
    }
})

export const getRefToken = selector({
    key: 'getRefToken',
    get: async ({}) => {
        const response = await token()
        return response.data.ref_token
    }
})

export const getTokenExp = selector({
    key: 'getTokenExp',
    get: async ({}) => {
        const response = await token()
        console.log(response)
        return response.data.exp
    }
})

export const getMyPlayer = selector({
    key: 'getMyPlayer',
    get: async ({get}) => {
        try {
            const token: string = get(accessToken)
            console.log(token)
            const response = await getPlayer(token)
            console.log(response)
        return response.data.exp
        } catch (error) {
            console.log(error)
        }
    }
})

export const getMyPlaylist = selector({
    key: 'getMyPlaylist',
    get: async ({get}) => {
        try {
            const token: string = get(accessToken)
            console.log(token)
            const response = await getPlaylist(token)
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }
})
