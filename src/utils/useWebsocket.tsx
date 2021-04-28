import { useSetRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import ws from '../ws';
import { deleteItem, account as address, decreaseQuantity, increaseQuantity,
         newMsgSelector, deleteMsgSelector, updateMsgSelector, 
         msgStateListSelector, setFilteredProducts as sfp, addToCart as atc } from "../Recoil";

const useWebsocket = () => {
    const setMsg: Function = useSetRecoilState(msgStateListSelector);
    const updateMsg: Function = useSetRecoilState(updateMsgSelector);
    const deleteMsg: Function = useSetRecoilState(deleteMsgSelector);
    const newMsg = useSetRecoilState(newMsgSelector);
    const account = useRecoilValue(address)
    const addToCart: Function = useSetRecoilState(atc)
    const decrement: Function = useSetRecoilState(decreaseQuantity)
    const increment: Function = useSetRecoilState(increaseQuantity)
    const removeItem: Function = useSetRecoilState(deleteItem)
    const setFilteredProducts: Function = useSetRecoilState(sfp)
    
    useEffect(() => {
        ws.onmessage = ({ data }: any) => {
            const message = JSON.parse(data);
            console.log(message)
            switch(message.type){
                case "init": {
                    setMsg(message.data);
                    console.log('init')
                    break;
                }
                case "notes.update": {
                    updateMsg(message.data);
                    break;
                }
                case "msg.delete": {
                    deleteMsg(message.data);
                    break;
                }
                case "msg.new": {
                    newMsg(message.data);
                    break;
                }
                case "add.to.cart": {
                    if(message.data.from === account) {
                        addToCart(message.data.message)
                    }
                    break;
                }
                case "increaseQuantity": {
                    if(message.data.from === account) {
                        increment(message.data.message)
                    }
                    break;
                }
                case "decreaseQuantity": {
                    if(message.data.from === account) {
                        decrement(message.data.message)
                    }
                    break;
                }
                case "deleteItem": {
                    if(message.data.from === account) {
                        removeItem(message.data.message)
                    }
                    break;
                }
                case "filter.name": {
                    if(message.data.from === account) {
                        setFilteredProducts(message)
                    }
                    break;
                }
                case "filter.cat": {
                    if(message.data.from === account) {
                        setFilteredProducts(message)                    
                    }
                    break;
                }
                case "filter.terpene": {
                    if(message.data.from === account) {
                        setFilteredProducts(message)
                    }
                    break;
                }
                case "filter.cannabinoid": {
                    if(message.data.from === account) {
                        setFilteredProducts(message)
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        };

    return() => ws.close()
    }, [newMsg, deleteMsg, updateMsg, setMsg, setFilteredProducts, removeItem, decrement, increment, addToCart, account]);

    return null;
} 

export default useWebsocket;