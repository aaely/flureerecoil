import { cannabinoid } from '../types/types.ts'
import { useRecoilValue } from 'recoil'
import { getCannabinoids } from '../Recoil/fluree.tsx'
import { Table, Button } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


interface PropTypes {
    handleEdit: Function
}

const Cannabinoids: Function = (props: PropTypes) => {
    const cannabinoids: cannabinoid[] = useRecoilValue(getCannabinoids)

    return(
        <Table striped responsive style={{margin: 'auto', maxWidth: '80%'}}>
            <thead>
                <tr>    
                    <th>
                        #
                    </th>
                    <th>
                        Cannabinoid Name
                    </th>
                    <th>
                        Effect Description
                    </th>
                </tr>    
            </thead>
            <tbody>
                {cannabinoids.length > 0 && cannabinoids.map((cannabinoid, index) => {
                    return(
                        <tr key={cannabinoid['_id']}>
                            <td style={{verticalAlign: 'middle'}}>
                                {index + 1}
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                {cannabinoid['cannabinoid/name']}
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                <Editor 
                                editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(cannabinoid['cannabinoid/effectDesc'].replace(/'''/g, '"')).contentBlocks))}
                                readOnly='true'
                                toolbarHidden='true'
                                />
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                <Button color='info' onClick={() => props.handleEdit(cannabinoid)}>Edit</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Cannabinoids