import { FunctionComponent, useEffect } from 'react'
import { Cannabinoid, Product } from '../types/types.ts'
import { Button, Table } from 'reactstrap'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getProduct, handle as h } from '../Recoil/fluree.tsx'
import { cannConcentrations, selectedCanns } from 'src/Recoil/productForm'

const CannabinoidProfile: FunctionComponent = (props: any) => {

    const handle: string = useRecoilValue(h)
    const activeProduct: Product = useRecoilValue(getProduct(handle))
    
    const [selectedCannabinoids, setSelectedCannabinoids] = useRecoilState<Array<Cannabinoid>>(selectedCanns)
    const [concentrations, setConcentrations] = useRecoilState<Array<number>>(cannConcentrations)
    useEffect(() => {
        if(activeProduct.length > 0 && selectedCannabinoids.length < 1) {
            deriveCanns()
        }
    }, [activeProduct])

    const deriveCanns: Function =  () => {
        setSelectedCannabinoids([])
        setConcentrations([])
        const cannabinoids: Cannabinoid[] = activeProduct[0]['product/productProfileId']['productprofile/cannabinoidIds']
        const concs: Cannabinoid[] = activeProduct[0]['product/productProfileId']['productprofile/cannConc']
        for(let i: number = 0; i < cannabinoids.length; i++) {
            selectedCannabinoids.push(cannabinoids[i])
            setSelectedCannabinoids(selectedCannabinoids)
            concentrations.push(concs[i])
            setConcentrations(concentrations)
        }
        console.log(selectedCannabinoids, concentrations)
    }
    
    const remove: Function = (idx: number) => {
        selectedCannabinoids.splice(idx, 1)
        concentrations.splice(idx, 1)
        if (selectedCannabinoids.length < 1 && concentrations.length < 1) {
            setSelectedCannabinoids([])
            setConcentrations([])
            return
        } 
        if(selectedCannabinoids.length >=1 && concentrations.length >= 1) {
            setSelectedCannabinoids([])
            setConcentrations([])
            setSelectedCannabinoids(selectedCannabinoids)
            setConcentrations(concentrations)
            return
        }
    }

    const renderContent: Function = () => {
        return(
            <Table striped responsive style ={{margin: 'auto', maxWidth: '80%'}} >
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Cannabinoid Name
                        </th>
                        <th>
                            Cannabinoid Concentration
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {selectedCannabinoids.map((cann: Cannabinoid, index: number) => {
                        const con: JSON = JSON.parse(concentrations[index])
                        return(
                            <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {cann['cannabinoid/name']} 
                                </td>
                                <td>
                                    {con[`${cann['_id']}`]}%
                                </td>
                                <Button color='danger' onClick={() => remove(index)}>Remove</Button>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    const renderEmpty: Function = () => {
        return <h5 style={{textAlign: 'center'}}>No Cannabinoids Selected</h5>
    }

    return(
        <>
            {selectedCannabinoids.length > 0 && renderContent()}
            {selectedCannabinoids.length === 0 &&  renderEmpty()}
        </>
    )
}

export default CannabinoidProfile