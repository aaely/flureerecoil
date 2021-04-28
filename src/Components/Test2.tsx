import { Input, Button } from 'reactstrap'
import { useState, useEffect, useRef, RefObject } from 'react'
import { initializeAccount, msgStateList  } from '../Recoil'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { MySyntheticEvent } from '../types'
import { send } from '../ws'

type MsgList = {
  message: string,
  from: string
}

function Test2() {
  const [newMessage, setNewMessage] = useState<string>('')
  const account: string = useRecoilValue(initializeAccount)
  const messageList: MsgList[] = useRecoilValue(msgStateList)
  const msgRef: RefObject<any> = useRef(null)
  const [loading, setLoading] = useState<boolean>(true)

  function handleClick() {
    if(newMessage.length > 0) {
        send('msg.new', newMessage, `${account}`)
        setNewMessage('')
    }
  }

  const ClearMessages = () => {
      const clear: any = useResetRecoilState(msgStateList)
      return <Button color='danger' onClick={clear}>Clear</Button>
  }

  const onChange = ({target: {value}}: MySyntheticEvent) => {
    setNewMessage(value);
  };
  
  useEffect(() => {
    if(loading) {
      msgRef.current.focus()
      setLoading(false)
    }
  }, [])

  return (
    <>
        {ClearMessages()}
        <h4>{messageList.length > 0 && messageList.map((message, index) => {
            return(
                <p key={index}>
                   {message.from}: {message.message}
                </p>
            )
        })}</h4>
        <Input style={{maxWidth: '50%', margin: '0 auto'}} innerRef={msgRef} type='text' id='message' name='message' value={newMessage} onChange={onChange} />
        <Button
          color='success'
          target="_blank"
          onClick={handleClick}
        >
          Send Message
        </Button>
    </>
  );
}

export default Test2;
