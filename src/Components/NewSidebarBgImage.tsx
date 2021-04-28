import { Form, Button } from 'react-bootstrap'
import ipfs from '../utils/ipfs'
import { FunctionComponent, useState, ChangeEventHandler } from 'react'
import { MySyntheticEvent } from '../types'
import { addSidebarImage } from '../queries/addSidebarImage'

const NewSidebarBgImage: FunctionComponent = (props: any) => {

    const [buffer, setBuffer] = useState<Array<number>>([])

    const handleChange: ChangeEventHandler = ({target: {id, files}}: MySyntheticEvent) => {
        switch(id) {
            case 'sidebarBgImage': {
                const reader = new window.FileReader()
                reader.readAsArrayBuffer(files[0])
                reader.onloadend = () => {
                    setBuffer([])
                    setBuffer(Buffer(reader.result))
                }
                break;
            }
            default: break;
        }
    } 

    const saveImage: Function = async () => {
        try {
            if(buffer.length > 0) {
                const imageHash = await ipfs.add(buffer)
                console.log(imageHash)
                await addSidebarImage(imageHash.path)
                props.history.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderForm: Function = () => {
        return(
            <Form>
                <Form.Group>
                    <Form.Label>Background Image for Sidebar</Form.Label>
                    <Form.File id='sidebarBgImage' type='file' onChange={handleChange} />
                </Form.Group>
            </Form>
        )
    }

    return(
        <>
            {renderForm()}
            <br/>
            {buffer.length > 0 && <Button variant='success' onClick={saveImage}>Save Image</Button>}
        </>
    )
}

export default NewSidebarBgImage