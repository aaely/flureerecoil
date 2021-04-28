import { ChangeEventHandler, FunctionComponent, useEffect, useState, MouseEventHandler } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { cannConcentrations, selectedCanns } from '../Recoil/productForm.tsx'
import { Cannabinoid, MySyntheticEvent } from '../types/types.ts'
import { getCannabinoids, handle as h } from 'src/Recoil/fluree.tsx'

const CannabinoidForm: FunctionComponent = (props:any) => {
    const allCannabinoids: Cannabinoid[] = useRecoilValue(getCannabinoids)
    const [concentration, setConcentration] = useState<number>()
    const [cannabinoid, setCannabinoid] = useState<Cannabinoid>({})
    const [cannConc, setCannConc] = useRecoilState<Array<number>>(cannConcentrations)
    const [selectedCannabinoids, setSelectedCannabinoids] = useRecoilState<Array<Cannabinoid>>(selectedCanns)
    const [loading, setLoading] = useState<boolean>(true)
    
    const handleChange: ChangeEventHandler = ({target: {id, value}}: MySyntheticEvent) => {
        switch(id) {
            case 'conc': {
                setConcentration(value)
                break;
            }
            case 'cann': {
                let cbn: Cannabinoid = allCannabinoids.filter(prop => {
                    return prop['cannabinoid/name'].includes(value)
                })
                setCannabinoid(cbn[0])
                break;
            }
            default: break;
        }
    }

    useEffect(() => {
        if(loading) {
            setCannabinoid(allCannabinoids[0])
            setLoading(false)
        }
    }, [loading, setLoading, setCannabinoid, allCannabinoids])

    const addToCannProfile: MouseEventHandler = () => {
        if (selectedCannabinoids.length === 0) {
            const index: number = allCannabinoids.findIndex(x => x._id === cannabinoid._id)
            const tag: string = allCannabinoids[index]._id.toString()
            let l: any = []
            l.push({[tag]: parseInt(concentration)})
            setSelectedCannabinoids([])
            setCannConc([])
            setSelectedCannabinoids([allCannabinoids[index]])
            setCannConc([JSON.stringify(l[0])])
            setConcentration(0)
            return
        }
        if (selectedCannabinoids.length > 0) {
            console.log(cannabinoid)
            const index: number = selectedCannabinoids.findIndex(x => x._id === cannabinoid._id)
            console.log(index)
            if (index < 0) {
                let l: any = []
                const spliceIndex: number = allCannabinoids.findIndex(x => x._id === cannabinoid._id)
                const newSelCannArray: Cannabinoid[] = [...selectedCannabinoids, allCannabinoids[spliceIndex]]
                const tag: string = allCannabinoids[spliceIndex]['_id']
                l.push({[tag]: parseInt(concentration)})
                const newCannConcArray: number[] = [...cannConc, JSON.stringify(l[0])]
                setSelectedCannabinoids([])
                setSelectedCannabinoids(newSelCannArray)
                setCannConc([])
                setCannConc(newCannConcArray)
                setConcentration(0)
                return
            }
            return
        }
    }
 
    return(
        <div style={{maxWidth: '75%', margin: 'auto'}}>
            <Form>
                <FormGroup>
                    <Label for='cannabinoid'>Cannabinoid</Label>
                    <Input type='select' id='cann' onChange={handleChange} >
                        {allCannabinoids.map(cann => {
                            return(
                                <option key={cann._id}>{cann['cannabinoid/name']}</option>
                            )
                        })}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for='cannConcentration'>Concentration %</Label>
                    <Input type='number' id='conc' onChange={handleChange} />
                </FormGroup>
                {concentration > 0 && <Button color='success' onClick={addToCannProfile}>Add to Cannabinoids</Button>}
            </Form>
        </div>
    )
}

export default CannabinoidForm