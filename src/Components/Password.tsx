import { useState, FunctionComponent, FormEventHandler, MouseEventHandler } from 'react'
import { useRecoilValue } from 'recoil'
import { account } from '../Recoil/contract'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { MySyntheticEvent } from '../types'


const Password: FunctionComponent = (props: any) => {
    const username: string = useRecoilValue(account)
    const [pass, setPass] = useState<string>('')

    const onValueChange: FormEventHandler = ({target: {value, id}}: MySyntheticEvent) => {
        switch(id) {
            case 'pass': {
                setPass(value)
                break;
            }
            default: break;
        }
    }

    const login: MouseEventHandler = async () => {
        console.log(username)
    }

    return(
        <div className='App'>
            <Form style={{margin: '0 auto', maxWidth: '400px', display: 'block'}}>
                <FormGroup>
                    <Label for='password'>Enter Password:</Label>
                    <Input type='password' id='pass' value={pass} onChange={onValueChange} />
                </FormGroup>
            </Form>
            <Button color='success' onClick={login} >Login</Button>
        </div>
    )
}

export default Password
