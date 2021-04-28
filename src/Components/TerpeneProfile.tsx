import { FunctionComponent, useEffect } from 'react'
import { Terpene, Product } from '../types/types.ts'
import { Button, Table } from 'reactstrap'
import { getProduct, handle as h } from '../Recoil/fluree.tsx'
import { useRecoilState, useRecoilValue } from 'recoil'
import { terpConcentrations, selectedTerps } from 'src/Recoil/productForm.tsx'

const TerpeneProfile: FunctionComponent = (props: any) => {

    const handle: string = useRecoilValue(h)
    const activeProduct: Product = useRecoilValue(getProduct(handle))
    
    const [selectedTerpenes, setSelectedTerpenes] = useRecoilState<Array<Terpene>>(selectedTerps)
    const [concentrations, setConcentrations] = useRecoilState<Array<JSON>>(terpConcentrations)

    useEffect(() => {
        if(activeProduct.length > 0 && selectedTerpenes.length < 1) {
            deriveTerps()
        }
    }, [activeProduct])

    const deriveTerps: Function =  () => {
        setSelectedTerpenes([])
        setConcentrations([])
        const terpenes: Terpene[] = activeProduct[0]['product/productProfileId']['productprofile/terpeneIds']
        const concs: JSON[] = activeProduct[0]['product/productProfileId']['productprofile/terpConc']
        for(let i: number = 0; i < terpenes.length; i++) {
            selectedTerpenes.push(terpenes[i])
            setSelectedTerpenes(selectedTerpenes)
            concentrations.push(concs[i])
            setConcentrations(concentrations)
            console.log(concentrations)
        }
    }
    
    const remove: Function = (idx: number) => {
        selectedTerpenes.splice(idx, 1)
        concentrations.splice(idx, 1)
        console.log(selectedTerpenes.length, concentrations.length)
        if (selectedTerpenes.length < 1 && concentrations.length < 1) {
            setSelectedTerpenes([])
            setConcentrations([])
            return
        } 
        if (selectedTerpenes.length >= 1 && concentrations.length >= 1) {
            setSelectedTerpenes([])
            setConcentrations([])
            setSelectedTerpenes(selectedTerpenes)
            setConcentrations(concentrations)
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
                            Terpene Name
                        </th>
                        <th>
                            Terpene Concentration
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {selectedTerpenes.map((terp: Terpene, index: number) => {
                        const con: JSON = JSON.parse(concentrations[index])
                        return(
                            <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {terp['terpene/name']}
                                </td>
                                <td>
                                    {con[`${terp['_id']}`]}%
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
        return <h5 style={{textAlign: 'center'}}>No Terpenes Selected</h5>
    }

    return(
        <>
            {selectedTerpenes.length > 0 && renderContent()}
            {selectedTerpenes.length === 0 &&  renderEmpty()}
        </>
    )
}

export default TerpeneProfile