import { useState, ChangeEventHandler, MouseEventHandler } from 'react'
import { useRecoilValue } from 'recoil'
import { Form, Input, Label, FormGroup, Button } from 'reactstrap'
import { MySyntheticEvent } from '../types'
import { account } from 'src/Recoil'
import { newCustomer } from '../queries'

const NewCustomer: Function = (props: any) => {
    
    const addr: string = useRecoilValue(account)
    
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [license, setLicense] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [dob, setDob] = useState<string>('')

    const onValueChange: ChangeEventHandler = ({target: {value, id}}: MySyntheticEvent) => {
        console.log(id)
        switch(id) {
            case 'firstName': {
                setFirstName(value)
                break;
            }
            case 'lastName': {
                setLastName(value)
                break;
            }
            case 'license': {
                setLicense(value)
                break;
            }
            case 'phone': {
                setPhone(value)
                break;
            }
            case 'email': {
                setEmail(value)
                break;
            }
            case 'dob': {
                setDob(value)
                break;
            }
            default: break;
        }
    }

    const saveCustomer: MouseEventHandler = async () => {
        try {
            await newCustomer(addr, firstName, lastName, license, phone, email, dob)
            props.history.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <h3>Your Address: {addr}</h3>
            <Form>
                <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input type='text' id='firstName' value={firstName} onChange={onValueChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>Last Name</Label>
                    <Input type='text' id='lastName' value={lastName} onChange={onValueChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>License #</Label>
                    <Input type='text' id='license' value={license} onChange={onValueChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>Phone</Label>
                    <Input type='text' id='phone' value={phone} onChange={onValueChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>Email</Label>
                    <Input type='text' id='email' value={email} onChange={onValueChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='firstName'>Date of Birth</Label>
                    <Input type='date' id='dob' value={dob} onChange={onValueChange} />
                </FormGroup>
            </Form>
            <Button color='success' onClick={saveCustomer} >Add New Customer</Button>
        </>
    )
}

export default NewCustomer