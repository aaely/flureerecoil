import { terpene } from '../types/types.ts'
import { useRecoilValue } from 'recoil'
import { getTerpenes } from '../Recoil/fluree.tsx'
import { Table, Button } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


interface PropTypes {
    handleEdit: Function
}

const Terpenes: Function = (props: PropTypes) => {
    const terpenes: terpene[] = useRecoilValue(getTerpenes)

    return(
        <Table striped responsive style={{margin: 'auto', maxWidth: '80%'}}>
            <thead>
                <tr>    
                    <th>
                        #
                    </th>
                    <th>
                        Terpene Name
                    </th>
                    <th>
                        Scent Description
                    </th>
                    <th>
                        Effect Description
                    </th>
                </tr>    
            </thead>
            <tbody>
                {terpenes.length > 0 && terpenes.map((terpene, index) => {
                    return(
                        <tr key={terpene['_id']}>
                            <td style={{verticalAlign: 'middle'}}>
                                {index + 1}
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                {terpene['terpene/name']}
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                <Editor 
                                editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(terpene['terpene/scentDesc'].replace(/'''/g, '"')).contentBlocks))}
                                readOnly='true'
                                toolbarHidden='true'
                                />
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                <Editor 
                                editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(terpene['terpene/effectDesc'].replace(/'''/g, '"')).contentBlocks))}
                                readOnly='true'
                                toolbarHidden='true'
                                />
                            </td>
                            <td style={{verticalAlign: 'middle'}}>
                                <Button color='info' onClick={() => props.handleEdit(terpene)}>Edit</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Terpenes