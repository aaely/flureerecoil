import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import exws from '../exws';
import { newMsgSelector, deleteMsgSelector, updateMsgSelector, msgStateListSelector  } from "../Recoil/socket.tsx";

const useWebsocket = () => {

    const setMsg = useSetRecoilState(msgStateListSelector);
    const updateMsg = useSetRecoilState(updateMsgSelector);
    const deleteMsg = useSetRecoilState(deleteMsgSelector);
    const ethUSD = useSetRecoilState(newMsgSelector);
    
    useEffect(() => {
        exws.onmessage = ({ data }) => {
            const message = JSON.parse(data);
            switch(message.type){
                case "init": {
                    setMsg(message.data);
                    ws.id = message.id;
                    console.log('init')
                    break;
                }
                case "notes.update": {
                    updateMsg(message.data);
                    break;
                }
                case "eth.USD": {
                    deleteMsg(message.data);
                    break;
                }
                case "msg.new": {
                    newMsg(message.data);
                }
                default: {
                    break;
                }
            }
        };
    }, [newMsg, deleteMsg, updateMsg, setMsg]);

    return null;
} 

export default useWebsocket;