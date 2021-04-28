import { ChangeEventHandler, FunctionComponent, useEffect, useState, MouseEventHandler } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { terpConcentrations, selectedTerps } from '../Recoil/productForm.tsx'
import { Terpene, MySyntheticEvent, Product } from '../types/types.ts'
import { getTerpenes } from 'src/Recoil/fluree.tsx'

const TerpeneForm: FunctionComponent = (props:any) => {
    const allTerpenes: Terpene[] = useRecoilValue(getTerpenes)
    const [concentration, setConcentration] = useState<number>()
    const [terpene, setTerpene] = useState<Terpene>({})
    const [terpConc, setTerpConc] = useRecoilState<Array<JSON>>(terpConcentrations)
    const [selectedTerpenes, setSelectedTerpenes] = useRecoilState<Array<Terpene>>(selectedTerps)
    const [loading, setLoading] = useState<boolean>(true)
    const handleChange: ChangeEventHandler = ({target: {id, value}}: MySyntheticEvent) => {
        switch(id) {
            case 'conc': {
                setConcentration(value)
                break;
            }
            case 'terpenes': {
                let terpene: Terpene = allTerpenes.filter(prop => {
                    return prop['terpene/name'].includes(value)
                })
                setTerpene(terpene[0])
                break;
            }
            default: break;
        }
    }

    useEffect(() => {
        if(loading) {
            setTerpene(allTerpenes[0])

            setLoading(false)
        }
    }, [loading, setLoading, setTerpene, allTerpenes])

    const addToTerpProfile: MouseEventHandler = () => {
        if (selectedTerpenes.length === 0) {
            const index: number = allTerpenes.findIndex(x => x._id === terpene._id)
            const tag: string = allTerpenes[index]._id.toString()
            let l: any = []
            l.push({[tag]: parseInt(concentration)})
            setSelectedTerpenes([])
            setTerpConc([])
            setSelectedTerpenes([allTerpenes[index]])
            setTerpConc([JSON.stringify(l[0])])
            setConcentration(0)
            return
        }
        if (selectedTerpenes.length > 0) {
            const index: number = selectedTerpenes.findIndex(x => x._id === terpene._id)
            if (index < 0) {
                let l: any = []
                const spliceIndex: number = allTerpenes.findIndex(x => x._id === terpene._id)
                const newSelTerpArray: Terpene[] = [...selectedTerpenes, allTerpenes[spliceIndex]]
                const tag: string = allTerpenes[spliceIndex]['_id']
                l.push({[tag]: parseInt(concentration)})
                const newTerpConcArray: JSON[] = [...terpConc, JSON.stringify(l[0])]
                setSelectedTerpenes([])
                setSelectedTerpenes(newSelTerpArray)
                setTerpConc([])
                setTerpConc(newTerpConcArray)
                setConcentration(0)
                return
            }
            return
        }
        return
    } 
 
    return(
        <div style={{maxWidth: '75%', margin: 'auto'}} >
            <h3 style= {{textAlign: 'center'}} >New Product Profile Pages</h3>
            <Form>
                <FormGroup>
                    <Label for='terpene'>Terpene</Label>
                    <Input type='select' id='terpenes' onChange={handleChange}>
                        {allTerpenes.length >= 0 && allTerpenes.map(terp => {
                            return(
                                <option key={terp._id}>{terp['terpene/name']}</option>
                            )
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for='concentration'>Concentration %</Label>
                    <Input type='number' id='conc' value={concentration} onChange={handleChange} />
                </FormGroup>
                {concentration > 0 && <Button color='success' onClick={addToTerpProfile}>Add to Terpenes</Button>}
            </Form>
        </div>
    )
}

export default TerpeneForm