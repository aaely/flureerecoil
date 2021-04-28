import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { terpene, MySyntheticEvent, ImageObject } from '../types/types.ts'
import { updateTerpene } from '../queries/updateTerpene'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

interface PropTypes {
    terpene: terpene,
    handleEdit: Function
}

const TerpeneEdit: Function = (props: PropTypes) => {

    let initializeState: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.terpene['terpene/scentDesc']).contentBlocks))
    let initializeState1: EditorState = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(props.terpene['terpene/effectDesc']).contentBlocks))
    const [editorState, setEditorState] = useState<EditorState | null>(initializeState)
    const [editorState1, setEditorState1] = useState<EditorState | null>(initializeState1)
    const [name, setName] = useState<string>('')
    const [scentDesc, setScentDesc] = useState<string>('')
    const [effectDesc, setEffectDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState)
        setScentDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/[\n]/g, ''))
    }

    const onEditorStateChange1 = (editorState1: EditorState) => {
        setEditorState1(editorState1)
        setEffectDesc(draftToHtml(convertToRaw(editorState1.getCurrentContent())).replace(/[\n]/g, ''))
    }

    useEffect(() => {
        if (loading) {
            setName(props.terpene['terpene/name'])
            setScentDesc(props.terpene['terpene/scentDesc'])
            setEffectDesc(props.terpene['terpene/effectDesc'])
            setLoading(false)
        }
        console.log(name, scentDesc, effectDesc, loading)
    }, [loading, setLoading])

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

    const saveTerpene: Function = async (_id: number, _name: string, _scentDesc: string, _effectDesc: string) => {
        await updateTerpene(_id, _name, _scentDesc, _effectDesc)
        props.handleEdit()
    }

    const _uploadImageCallback: Function = (file: any) => {
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

    return(
        <div style={{textAlign: 'center', maxWidth: '75%', margin: 'auto', marginTop: '5%'}}>
            <h1>Update Cannabinoid</h1>
            <br/>
            <Form>
            <FormGroup>
                <Label for='name'>Terpene Name</Label>
                <Input type='text' id='name' value={name} onChange={handleChange} /> 
            </FormGroup>
            <FormGroup>
                <Label for='name'>Terpene Scent Description</Label>
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
            <FormGroup>
                <Label for='name'>Terpene Effect Description</Label>
                <Editor
                    editorStyle={{borderStyle: 'solid', borderWidth: '2px', borderColor: '#aaa', backgroundColor: '#eee'}}
                    editorState={editorState1}
                    onEditorStateChange={onEditorStateChange1}
                    toolbar={{
                        image: { uploadCallback: _uploadImageCallback },
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                        }}
                />
            </FormGroup>
            <Button color='success' onClick={() => saveTerpene(props.terpene['_id'], name, scentDesc, effectDesc)}>Save</Button>
        </Form>
        </div>
    )
}

export default TerpeneEdit