import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const yt_accesstoken = atom<string>({
    key: 'yt_token',
    default: '',
    persistence_UNSTABLE: {
        type: 'yt_token'
    }
})

export const yt_refreshToken = atom<string>({
    key: 'yt_refreshToken',
    default: ''
})

export const yt_timer = atom<number>({
    key: 'yt_timer',
    default: 0,
    persistence_UNSTABLE: {
        type: 'yt_timer'
    }
})
