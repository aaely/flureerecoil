import { ChangeEventHandler, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Form, Input, Button, Label, FormGroup } from 'reactstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addCannabinoid } from '../queries/addCannabinoid'
import { ImageObject, MySyntheticEvent } from '../types'


const Cannabinoid = () => {
    let initializeState: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft('').contentBlocks))
    const [editorState, setEditorState] = useState<EditorState | null>(initializeState)
    const [cannabinoidName, setName] = useState<string>('');
    const [effectDesc, setEffectDesc] = useState<string>('');
    const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([])
    const handleChange: ChangeEventHandler = ({target: {id, value}}: MySyntheticEvent) => {
        console.log(id, value)
        switch(id) {
            case 'cannabinoidName': {
                setName(value)
                break;
            }
            default: {
                break;
            }
        }
    }

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setEffectDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/[\n]/g, ''))
        console.log(text)
    }

    const saveCannabinoid = () => {
        addCannabinoid(cannabinoidName, effectDesc)
    }

    const _uploadImageCallback: Function = (file: any) => {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
       // Make sure you have a uploadImages: [] as your default state
        
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
    
        uploadedImages.push(imageObject);
    
        setUploadedImages(uploadedImages)
    
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }

    return(
        <div style={{textAlign: 'center', maxWidth: '75%', margin: 'auto', marginTop: '5%'}}>
            <h1>Add Cannabinoid</h1>
            <br/>
            <Form>
            <FormGroup>
                <Label for='name'>Cannabinoid name</Label>
                <Input type='text' id='cannabinoidName' value={cannabinoidName} onChange={handleChange} /> 
            </FormGroup>
            <FormGroup>
                <Editor
                    editorStyle={{borderStyle: 'solid', borderWidth: '2px', borderColor: '#aaa', backgroundColor: '#eee'}}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: _uploadImageCallback },
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                        }}
                />
            </FormGroup>
            <Button color='success' onClick={saveCannabinoid}>Save</Button>
        </Form>
        </div>
    )
}

export default Cannabinoid