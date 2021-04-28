import { MouseEventHandler } from 'react'
import { Table, Button } from 'reactstrap'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { category as cat, productCost, productInventory, productName, selectedCanns,
         tabId as tab, selectedTerps, cannConcentrations, forceUpdate,
         terpConcentrations, buffer as b, getProduct, handle as h } from 'src/Recoil'
import { Cannabinoid, Category, Terpene, Product } from 'src/types'
import CannabinoidProfile from './CannabinoidProfile.tsx'
import TerpeneProfile from './TerpeneProfile.tsx'
import ipfs from '../utils/ipfs'
import { updateProduct, updateTerpene, updateCannabinoid, addProduct } from '../queries'

interface PropTypes {
    clearProfile: Function,
    clearProductInfo: Function,
    setCurrentView: Function
}


const Review: Function = (props: PropTypes) => {
    console.log(props)

    const name = useRecoilValue<string>(productName)
    const cost = useRecoilValue<string>(productCost)
    const inventory = useRecoilValue<string>(productInventory)
    const category = useRecoilValue<Category>(cat)
    const selCanns = useRecoilValue<Array<Cannabinoid>>(selectedCanns)
    const selTerps = useRecoilValue<Array<Terpene>>(selectedTerps)
    const terpCon = useRecoilValue<Array<number>>(terpConcentrations)
    const cannCon = useRecoilValue<Array<number>>(cannConcentrations)
    const buffer = useRecoilValue<Array<number>>(b)
    const [tabId, setTabId] = useRecoilState<number>(tab)
    const update: Function = useSetRecoilState(forceUpdate)
    const handle: string = useRecoilValue(h)
    const activeProduct = useRecoilValue<Array<Product>>(getProduct(handle))

    const saveProduct: Function = async () => {
        
        const t = await getTerps()
        const c = await getCanns()
        const tc = await getTerpConcs()
        const cc = await getCannConcs()
        if(buffer.length > 0) {
            const imageHash = await ipfs.add(buffer)
            console.log(imageHash)
            await addProduct(name, category._id, cost, inventory, imageHash.path, c, cc, t, tc)
        } else {
            await addProduct(name, category._id, cost, inventory, '', c, cc, t, tc)
        }
        update(Math.random())
        props.clearProductInfo()
        props.clearProfile()
        setTabId(1)
        window.location.replace('/editProduct')
    }

    const updProduct: Function = async () => {
        try {
            const t = await getTerps()
            const c = await getCanns()
            const tc = await getTerpConcs()
            const cc = await getCannConcs()
            console.log(tc)
            if(buffer.length > 0) {
                const imageHash = await ipfs.add(buffer)
                await updateProduct(activeProduct[0]['_id'], name, category._id, cost, inventory, imageHash.path, activeProduct[0]['product/productProfileId']._id, c, cc, t, tc)
            } else {
                await updateProduct(activeProduct[0]['_id'], name, category._id, cost, inventory, activeProduct[0]['product/imageHash'], activeProduct[0]['product/productProfileId']._id, c, cc, t, tc)
            }
            update(Math.random())
            props.clearProductInfo()
            props.clearProfile()
            setTabId(1)
            props.setCurrentView('allProducts')
        } catch(error) {
            console.log(error)
        }
    }

    const getTerps: Function = async () => {
        try {
            let t: number[] = []
            for(let i: number = 0; i < selTerps.length; i++) {
                if(t.length === 0) {
                    t = [parseInt(selTerps[i]._id)]
                } else {
                    t = [...t, parseInt(selTerps[i]._id)]
                }
            }
            return t
        } catch (error) {
            console.log(error)
        }
    }

    const getTerpConcs: Function = async () => {
        try {
            let tc: any = []
            for(let i: number = 0; i < selTerps.length; i++) {
                if(tc.length === 0) {
                    tc = [JSON.parse(terpCon[i])]
                } else {
                    tc = [...tc, JSON.parse(terpCon[i])]
                }
            }
            return tc
        } catch (error) {
            console.log(error)
        }
    }
    
    const getCannConcs: Function = async () => {
        try {
            let cc: any = []
            for(let i: number = 0; i < selCanns.length; i++) {
                if(cc.length === 0) {
                    cc = [JSON.parse(cannCon[i])]
                } else {
                    cc = [...cc, JSON.parse(cannCon[i])]
                }
            }
            return cc
        } catch(error) {
            console.log(error)
        }
    }

    const getCanns: Function = async () => {
        try {
            let c: number[] = []
            let cc: number[] = []
            for(let i: number = 0; i < selCanns.length; i++) {
                if(c.length === 0) {
                    c = [parseInt(selCanns[i]._id)]
                    cc = [JSON.parse(cannCon[i])]
                } else {
                    c = [...c, parseInt(selCanns[i]._id)]
                    cc = [...cc, JSON.parse(cannCon[i])]
                }
            }
            return c
        } catch (error) {
            console.log(error)
        }
    }

    const decrementTab: MouseEventHandler = () => {
        setTabId(tabId - 1)
    }

    const renderProductInfoReview: Function = () => {
        return(
            <Table responsive striped style={{margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Product Cost
                        </th>
                        <th>
                            Product Inventory
                        </th>
                        <th>
                            Category
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {name}
                        </td>
                        <td>
                            {cost}
                        </td>
                        <td>
                            {inventory}
                        </td>
                        <td>
                            {category['category/name']}
                        </td>
                    </tr>
                    <tr/>
                </tbody>
            </Table>
        )
    }

    return(
        <div style={{maxWidth: '80%', margin: 'auto', marginTop: '3%'}} >
            <h3 style={{textAlign: 'center'}}>Product Info:</h3>
            <br/>
            {renderProductInfoReview()}
            <br/>
            {buffer.length > 0 && <h3 style={{textAlign: 'center'}}>Image is successfully attached</h3>}
            <br/>
            <h3 style={{textAlign: 'center'}}>Cannabinoid Profile</h3>
            <br/>
            <CannabinoidProfile />
            <br/>
            <h3 style={{textAlign: 'center'}}>Terpene Profile</h3>
            <br/>
            <TerpeneProfile />
            <br/>
            <Button color='danger' onClick={decrementTab}>Back</Button>
            {activeProduct.length === 0 && <Button color='success' onClick={saveProduct}>Save Product</Button>}
            {activeProduct.length === 1 && <Button color='success' onClick={updProduct}>Update Product</Button>}
        </div>
    )
}

export default Review