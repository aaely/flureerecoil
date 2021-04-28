
const exws = new WebSocket('ws://ws.coinapi.io/v1/');

exws.onopen = () => {
    console.log("WS Connection Sucess");
};

export const sendHello = (type, data) => {
    exws.send(JSON.stringify({
        type,
        id: exws.id,
        data: {
            ...data
        }
    }))
}

export const exReq = (type, data) => {
    exws.send(JSON.stringify({
        type,
        id: exws.id,
        data: {
            ...data
        }
    }));
}

export default exws;