import { useState, FunctionComponent, FormEventHandler, MouseEventHandler } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { MySyntheticEvent } from '../types'
import { userLogin } from 'src/queries/userLogin'
import { userToken, account } from '../Recoil'


const Landing: FunctionComponent = (props: any) => {
    const username: string = useRecoilValue(account)
    const setUserToken: Function = useSetRecoilState(userToken)
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
        try {
            const token = await userLogin(username, pass)
            setUserToken(token)
            props.history.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <Form>
                <FormGroup>
                    <Label for='pass'>Enter Password:</Label>
                    <Input type='password' id='pass' value={pass} onChange={onValueChange} />
                </FormGroup>
            </Form>
            <Button color='success' onClick={login} >Login</Button>
        </div>
    )
}

export default Landing
