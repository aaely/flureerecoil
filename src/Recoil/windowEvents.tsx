import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export const toggled = atom<boolean>({
    key: 'toggled',
    default: true,
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const image = atom<boolean>({
    key: 'image',
    default: false,
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const collapsed = atom<boolean>({
    key: 'collapsed',
    default: false,
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const rtl = atom<boolean>({
    key: 'rtl',
    default: false,
    persistence_UNSTABLE: {
        type: 'accessToken'
    }
})

export const sidebarWidth = atom<number>({
    key: 'sidebarWidth',
    default: 0,
    persistence_UNSTABLE: {
        type: 'sidebarWidth'
    }
})

export const width = atom<number>({
    key: 'width',
    default: 1200,
    persistence_UNSTABLE: {
        type: 'width'
    }
})

export const height = atom<number>({
    key: 'height',
    default: 800,
    persistence_UNSTABLE: {
        type: 'height'
    }
})