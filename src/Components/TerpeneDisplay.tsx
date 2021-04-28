import { useState } from 'react'
import { Terpene } from '../types/types.ts'
import { Button, Table } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';

interface PropTypes {
    terpenes: Terpene[],
    concentrations: JSON[]
}

const TerpeneDisplay: Function = (props: PropTypes) => {
    const [openId, setOpenId] = useState<undefined | number>();
    const toggle = (id: number) => {
        openId === id ? setOpenId(undefined) : setOpenId(id);
    };

    const renderTerpeneProfile: Function = () => {
        return (
            <>
              <h3>Terpene Profile: </h3>
              <Accordion openId={openId} toggle={toggle}>
              {props.terpenes.map((terp: Terpene, index: number) => {
                  return (
                    <AccordionItem key={terp['_id']}>
                    <AccordionHeader targetId={`${index}`}>
                        {renderEntryHeader(terp, index)}
                    </AccordionHeader>
                    <AccordionBody accordionId={`${index}`}>
                        {renderEntryBody(terp, index)}
                    </AccordionBody>
                    </AccordionItem>
                  )
              })}
              </Accordion>
            </>
        )
    }
    
    const renderEntryBody: Function = (terp: Terpene, idx: number) => {
        return(
            <Table striped responsive style ={{margin: 'auto', maxWidth: '80%'}} >
                <tbody>
                    <tr key={idx}>
                        <td>
                            {idx + 1}
                        </td>
                        <td>
                            {terp['terpene/name']} 
                        </td>
                        <td>
                            <Editor 
                            editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(terp['terpene/effectDesc'].replace(/'''/g, '"')).contentBlocks))}
                            readOnly='true'
                            toolbarHidden='true'
                            />
                        </td>
                        <td>
                            <Editor 
                            editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(terp['terpene/effectDesc'].replace(/'''/g, '"')).contentBlocks))}
                            readOnly='true'
                            toolbarHidden='true'
                            />
                        </td>
                        <td>
                            {props.concentrations[idx][`${terp['_id']}`]}%
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    const renderEntryHeader: Function = (terp: Terpene, idx: number) => {
        const con: JSON = JSON.parse(props.concentrations[idx])
        return (
            <>
                <span>
                    {terp['terpene/name']}{'\u00A0'}
                </span>
                <span>
                    {con[`${terp['_id']}`]}%
                </span>
            </>
        )
    }

    const renderEmpty: Function = () => {
        return <h5 style={{textAlign: 'center'}}>No Cannabinoids Selected</h5>
    }
    return(
        <div style={{textAlign: 'center'}}>
            {props.terpenes.length > 0 && renderTerpeneProfile()}
            {props.terpenes.length === 0 &&  renderEmpty()}
        </div>
    )
}

export default TerpeneDisplay