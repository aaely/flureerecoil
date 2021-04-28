import { useState, FunctionComponent, ChangeEventHandler, MouseEventHandler } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Form, Input, Button, Label, FormGroup, Col } from 'reactstrap';
import { addTerpene } from '../queries/addTerpene'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MySyntheticEvent } from '../types'
import ipfs from '../utils/ipfs'

interface ImageObject {
    file: any,
    localSrc: string
}

const AddTerpene: FunctionComponent = (props: any) => {
    let initializeState: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('').contentBlocks))
    let initializeState1: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('').contentBlocks))
    const [editorState, setEditorState] = useState<EditorState | null>(initializeState)
    const [editorState1, setEditorState1] = useState<EditorState | null>(initializeState1)
    const [text, setText] = useState<string>('')
    const [text1, setText1] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([])
    const [buffer, setBuffer] = useState<Array<number>>([])
    const [ipfsHash, setIpfsHash] = useState<string>('')

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setText(draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/[\n]/g, ''))
        console.log(text)
    }

    const onEditorStateChange1 = (editorState1: EditorState) => {
        setEditorState1(editorState1)
        setText1(draftToHtml(convertToRaw(editorState1.getCurrentContent())).replace(/[\n]/g, ''))
        console.log(text1)
    }

    const onNameChange: ChangeEventHandler = ({target: {value, id}}: MySyntheticEvent) => {
        console.log(value, id)
        setName(value)
    }

    const save: MouseEventHandler = async () => {
        await addTerpene(name, text, text1)
        props.history.push('/editTerpene')
    }

    const _uploadImageCallback: Function = async (file: any) => {
        
        uploadedImages.push(file);
        setUploadedImages(uploadedImages)
        
        
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(uploadedImages[0].file); // convert file to array for buffer
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
        }
        const res = await saveFile()
        setIpfsHash(res.path)
        return new Promise(
            (resolve, reject) => {
              resolve({ data: { link: `https://ipfs.io/ipfs/${res.path}` } });
            }
          );
    }

    const handleFile: ChangeEventHandler = ({target: {files}}: MySyntheticEvent) => {
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(files[0]); // convert file to array for buffer
        // after reader finishes, initialise buffer and store in component state
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
        }
    }

    const saveFile: Function = async () => {
        try {
            console.log('sending request to ipfs...')
            const response = await ipfs.add(buffer)
            setIpfsHash(response.path)
            console.log(ipfsHash)
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <div style={{textAlign: 'center', maxWidth: '75%', margin: 'auto', marginTop: '5%'}}>
            <h1>Add Terpene</h1>
            <br/>
            <img src={`https://ipfs.io/ipfs/${ipfsHash}`} alt='test' />
            <Form>
            <FormGroup>
                <Label for='name' style={{textAlign: 'center'}} >Terpene Name</Label>
                <Input type='text' id='name' onChange={onNameChange} value={name} />
            </FormGroup>
            <FormGroup>
                <Label for='draftEditor' >Scent Description</Label>
                <Col sm={10} style={{margin: 'auto'}}>
                    <Editor
                    editorStyle={{borderStyle: 'solid', borderWidth: '2px', borderColor: '#aaa', backgroundColor: '#eee'}}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: _uploadImageCallback },
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                        }}
                    />
                </Col>
            </FormGroup>
            <FormGroup>
                <Label for='draftEditor'>Effect Description</Label>
                <Col sm={10} style={{margin: 'auto'}}>
                    <Editor
                    editorStyle={{borderStyle: 'solid', borderWidth: '2px', borderColor: '#aaa', backgroundColor: '#eee'}}
                    editorState={editorState1}
                    onEditorStateChange={onEditorStateChange1}
                    toolbar={{
                        image: { uploadCallback: _uploadImageCallback },
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                        }}
                    />
                    <Button color='success' onClick={save}>Save</Button>
                </Col>
            </FormGroup>
            <FormGroup>
                <Label for='file'>File Test</Label>
                <Input type='file' id='file' onChange={handleFile} />
            </FormGroup>
        </Form>
        <Button color='success' onClick={saveFile}>Save File</Button>
        </div>
    )

}

export default AddTerpene