import { useState } from 'react'
import { Cannabinoid } from '../types'
import { Button, Table } from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';

interface PropTypes {
    cannabinoids: Cannabinoid[],
    concentrations: JSON[]
}

const CannabinoidDisplay: Function = (props: PropTypes) => {

    const [openId, setOpenId] = useState<undefined | number>();
    const toggle = (id: number) => {
        openId === id ? setOpenId(undefined) : setOpenId(id);
    };

    const renderCannabinoidProfile: Function = () => {
        return (
            <>
              <h3>Cannabinoid Profile:</h3>
              <br/>
              <Accordion openId={openId} toggle={toggle}>
              {props.cannabinoids.map((cann: Cannabinoid, index: number) => {
                  return (
                    <AccordionItem key={cann['_id']} style={{margin: 'auto', display: 'block'}}>
                    <AccordionHeader targetId={`${index}`}>
                        {renderEntryHeader(cann, index)}
                    </AccordionHeader>
                    <AccordionBody accordionId={`${index}`}>
                        {renderEntryBody(cann, index)}
                    </AccordionBody>
                    </AccordionItem>
                  )
              })}
              </Accordion>
            </>
        )
    }

    const renderEntryHeader: Function = (cann: Cannabinoid, idx: number) => {
        const con: JSON = JSON.parse(props.concentrations[idx])
        return(
            <>
                <span>
                    {cann['cannabinoid/name']}{'\u00A0'}
                </span>
                <span>
                    {con[`${cann['_id']}`]}%
                </span>
            </>
        )
    }

    const renderEntryBody: Function = (cann: Cannabinoid, idx: number) => {
        const con: JSON = JSON.parse(props.concentrations[idx])
        return(
            <Table striped responsive style ={{margin: 'auto', maxWidth: '80%'}} >
                <tbody>
                    <tr key={idx}>
                        <td>
                            {idx + 1}
                        </td>
                        <td>
                            {cann['cannabinoid/name']} 
                        </td>
                        <td>
                            <Editor 
                            editorState={EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(cann['cannabinoid/effectDesc'].replace(/'''/g, '"')).contentBlocks))}
                            readOnly='true'
                            toolbarHidden='true'
                            />
                        </td>
                        <td>
                            {con[`${cann['_id']}`]}%
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    const renderEmpty: Function = () => {
        return <h5 style={{textAlign: 'center'}}>No Cannabinoids Selected</h5>
    }

    return(
        <div style={{textAlign: 'center'}}>
            {props.cannabinoids.length > 0 && renderCannabinoidProfile()}
            {props.cannabinoids.length === 0 &&  renderEmpty()}
        </div>
    )
}

export default CannabinoidDisplay