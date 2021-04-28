import { send } from '../ws'
import { exReq } from '../exws'
import { atom, selector, atomFamily, selectorFamily } from 'recoil'
import { Item } from '../types'
import { forceUpdate } from '../Recoil'

/*const localStorage = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };*/

export const totalCost = atom<number>({
    key: 'totalCost',
    default: 0,
    persistence_UNSTABLE: {
        type: 'totalCost'
    }
})

export const cartLength = selector({
    key: 'cartLength',
    get: ({get}) => {
        const length = get(cart).length
        return length
    }
})

export const endpointAtom = atom<string>({
    key: 'endpoint',
    default: 'http://192.168.0.248:5000'
})

export const cart = atom<Array<Item>>({
    key: 'cart',
    default: [],
    persistence_UNSTABLE: {
        type: 'cart'
    },
    dangerouslyAllowMutability: true
})

export const ethUSD = atom({
    key: 'ethUSD',
    default: {
        "type": "hello",
        "apikey": "B64054B0-6E32-4765-83C6-6E29BF4BE732",
        "heartbeat": false,
        "subscribe_data_type": ["quote"],
        "subscribe_filter_asset_id": ["USD", "ETH"]
      }
})

export const msgStateList = atom({
    key: 'msg-list-atom',
    default: [],
});

export const msgStateFamily = atomFamily({
    key: 'msg-state',
    default: {},
});

export const msgSelectorFamily = selectorFamily({
    key: 'msg-family',
    get: id => ({get}) => get(msgStateFamily(id)),
    set: id => ({set}, message) => {
        send('msg.update',message);
        set(msgStateFamily(id), message);
    }
});

export const msgListAdd = selector({
    key: 'msg-list-add',
    set: ({set, get}, note) => {
        console.log(note)
        const list = [...get(msgStateList)];
        list.push(note);
        set(msgStateList, list);
    },
})

export const msgStateListSelector = selector({
    key: 'msg-list-state',
    set: ({set}, list) => {
        const idList = [];
        console.log(list)
        list.forEach(message => {
            console.log(message)
            idList.push(message.id);
            set(msgStateFamily(message.id), message);
        });
        set(msgStateList, idList);
    },
    get: ({get}) => get(msgStateList),
});

export const msgListSelector = selector({
    key: 'msg-list',
    set: ({set}, list) => {
        console.log(list)
        const idList = [];
        list.forEach(message => {
            console.log(message)
            idList.push(message.id);
            set(msgStateFamily(message.id), message);
        });
        set(msgStateList, idList);
    },
    get: ({get}) => get(msgStateList),
});

export const deleteMsgSelector = selector({
    key: 'sticky-note-list-delete',
    set: ({set, get}, id) => {
        const list = get(msgStateList);
        const found = list.findIndex(_id => _id === id);
        if(found === -1) return;
        set(msgStateList, [...list.filter(_id => _id !== id)]);
        send('msg.delete', {id});
    }
})

export const updateMsgSelector = selector({
    key: 'msg-list-update',
    set: ({ set }, data) => {
        set(msgStateFamily(data.id), data);
    }
});

export const newMsgSelector = selector({
    key: 'msg-list-new',
    set: ({set, get}, data) => {
        console.log(data)
        const list = get(msgStateList);
        console.log(list)
        const entry = {from: data.from, message: data.message}
        set(msgStateList, [...list, entry]);
    }
})

export const getEthUSD = selector({
    key: 'getEthUSD',
    get: ({get}) => {
        const req = get(ethUSD)
        exReq('eth.USD', req)
    }
})

export const updateTotalCost = selector({
    key: 'updateTotalCost',
    set: ({set}, data) => {
        const cart: Cart[] = data
        let total: number = 0
        for(let i: number = 0; i < cart.length; i++) {
            total = total + (cart[i].cost * cart[i].quantity)
        }
        set(totalCost, total)
    }
})

export const addToCart = selector({
    key: 'addToCart',
    set: ({get, set}, message) => {
        get(forceUpdate)
        console.log(message)
        const crt: Item[] = message.cart
        const index: number = crt.findIndex(x => x.id === message.item['_id'])
        if(index < 0 && crt.length === 0) {
            console.log('first item')
            const newItem: Item[] = [{ id: message.item['_id'], name: message.item['product/name'], cost: message.item['product/cost'], quantity: 1}]
            set(cart, newItem)
            return
        }
        if(index < 0 && crt.length >= 1) {
            console.log('new item')
            const newItem: Item = { id: message.item['_id'], name: message.item['product/name'], cost: message.item['product/cost'], quantity: 1}
            const newCart: Item[] = [...crt, newItem]
            set(cart, newCart)
            return
        }
        if(index >= 0) {
            console.log('increment quantity')
            let newCart: Item[] = crt
            newCart[index].quantity = newCart[index].quantity + 1
            console.log(newCart)
            set(cart, newCart)
            return
        }
    }
})

export const increaseQuantity = selector({
    key: 'increaseQuantity',
    set: ({get, set}, message) => {
        get(forceUpdate)
        let crt: Item[] = message.cart
        const index: number = crt.findIndex(x => x.id === message.item.id)
        let newCart: Item[] = crt
        newCart[index].quantity = newCart[index].quantity + 1
        set(cart, newCart)
    }
})

export const decreaseQuantity = selector({
    key: 'decreaseQuantity',
    set: ({get, set, reset}, message) => {
        get(forceUpdate)
        const crt: Cart[] = message.cart
        const index: number = crt.findIndex(x => x.id === message.item.id)
        
        if(crt[index].quantity > 1) {
            let newCart: Item[] = crt
            console.log('decreasing quantity > 1')
            newCart[index].quantity = newCart[index].quantity - 1
            set(cart, newCart)
            return
        }
        if(crt[index].quantity === 1 && crt.length > 1) {
            let newCart: Item[] = crt
            newCart.splice(index, 1)
            set(cart, newCart)
            return
        }
        if(crt[index].quantity === 1 && crt.length === 1) {
            console.log('resetting cart')
            reset(cart)
            if(window.location.pathname === '/checkout') {
                window.location.replace('/editProduct')
                return
            }
        }
    }
})

export const resetCart = selector({
    key: 'resetCart',
    set: ({reset}) => {
        reset(cart)
    }
})

export const deleteItem = selector({
    key: 'deleteItem',
    set: ({get, set, reset}, message) => {
        get(forceUpdate)
        console.log(message)
        const crt: Cart[] = message.cart
        const index: number = crt.findIndex(x => x.id === message.item.id)
        let newCart: Cart[] = crt
        newCart.splice(index, 1)
        set(cart, newCart)
    }
})
