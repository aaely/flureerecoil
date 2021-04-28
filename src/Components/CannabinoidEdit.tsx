import { ChangeEventHandler, useEffect, useState } from 'react'
import { cannabinoid, MySyntheticEvent, ImageObject } from '../types/types.ts'
import { updateCannabinoid } from '../queries/updateCannabinoid'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

interface PropTypes {
    cannabinoid: cannabinoid,
    handleEdit: Function
}

const CannabinoidEdit: Function = (props: PropTypes) => {

    let initializeState: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.cannabinoid['cannabinoid/effectDesc']).contentBlocks))
    const [editorState, setEditorState] = useState<EditorState | null>(initializeState)
    const [name, setName] = useState<string>('')
    const [effectDesc, setEffectDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setEffectDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/[\n]/g, ''))
    }

    useEffect(() => {
        if (loading) {
            setName(props.cannabinoid['cannabinoid/name'])
            setEffectDesc(props.cannabinoid['cannabinoid/effectDesc'])
            setLoading(false)
        }
        console.log(name, effectDesc, loading)
    }, [loading, setLoading])

    const _uploadImageCallback = (file: any) => {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
       // Make sure you have a uploadImages: [] as your default state
        const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([])
        console.log(uploadedImages);
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

    const handleChange: ChangeEventHandler = ({target: {id, value}}: MySyntheticEvent) => {
        switch(id) {
            case 'name': {
                setName(value)
                break;
            }
            default: {
                break;
            }
        }
    }

    const saveCannabinoid: Function = async (_id: number, _name: string, _effectDesc: string) => {
        await updateCannabinoid(_id, _name, _effectDesc)
        props.handleEdit()
    }

    return(
        <div style={{textAlign: 'center', maxWidth: '75%', margin: 'auto', marginTop: '5%'}}>
            <h1>Update Cannabinoid</h1>
            <br/>
            <Form>
            <FormGroup>
                <Label for='name'>Cannabinoid Name</Label>
                <Input type='text' id='name' value={name} onChange={handleChange} /> 
            </FormGroup>
            <FormGroup>
                <Label for='name'>Cannabinoid Effect Description</Label>
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
            <Button color='success' onClick={() => saveCannabinoid(props.cannabinoid['_id'], name, effectDesc)}>Save</Button>
        </Form>
        </div>
    )
}

export default CannabinoidEdit