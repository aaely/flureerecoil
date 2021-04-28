import { FunctionComponent, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { tabId as t, 
         selectedTerps,
         selectedCanns,
         terpConcentrations,
         cannConcentrations,
         category,
         productCost,
         productInventory,
         productName } from '../Recoil/productForm.tsx'
import { getCategories, handle as h, forceUpdate } from '../Recoil/fluree.tsx'
import { Button } from 'reactstrap'
import { Category } from 'src/types/types.ts'
import Products from '../Components/Products.tsx'
import ProductDetails from '../Components/ProductDetails.tsx'
import EditProduct from '../Components/EditProduct.tsx'

const ManageProducts: FunctionComponent = (props: any) => {
    
    const allCategories: Category[] = useRecoilValue(getCategories)
    const setSelTerps: Function = useSetRecoilState(selectedTerps)
    const setSelCanns: Function = useSetRecoilState(selectedCanns)
    const setCannConc: Function = useSetRecoilState(cannConcentrations)
    const setTerpConc: Function = useSetRecoilState(terpConcentrations)
    const setName: Function = useSetRecoilState(productName)
    const setCost: Function = useSetRecoilState(productCost)
    const setInventory: Function = useSetRecoilState(productInventory)
    const setCategory: Function = useSetRecoilState(category)
    const [handle, setHandle] = useRecoilState<string>(h)
    const [tabId, setTabId] = useRecoilState<number>(t)
    const [currentView, setCurrentView] = useState<string>('allProducts')
    const update: Function = useSetRecoilState(forceUpdate)
    const [loading, setLoading] = useState<boolean>(true)
    const clearProfile: Function = () => {
        setSelTerps([])
        setSelCanns([])
        setCannConc([])
        setTerpConc([])
    }

    const clearProductInfo: Function = () => {
        setName('')
        setCost(0)
        setInventory(0)
        setCategory(allCategories[0])
        setHandle('')
        update(Math.random())
    }

    useEffect(() => {
        if(loading) {
            clearProductInfo()
            clearProfile()
            setHandle('')
            //update(Math.random())
            setLoading(false)
        }
    }, [loading, setLoading])

    const changeView: Function = (view: string) => {
        switch(view) {
            case 'newProduct' : {
                setHandle('')
                update(Math.random())
                clearProductInfo()
                clearProfile()
                setCurrentView(view)
                setTabId(1)
                break;
            }
            case 'allProducts': {
                setHandle('')
                update(Math.random())
                clearProductInfo()
                clearProfile()
                setTabId(1)
                setCurrentView(view)
                break;
            }
            case 'editProduct': {
                setCurrentView(view)
                break
            }
            default: break;
        }
    }

    return (
        <div className='App'>
            {currentView === 'newProduct' && <EditProduct currentView={currentView} clearProductInfo={clearProductInfo} clearProfile={clearProfile} changeView={changeView} />}
            {currentView === 'newProduct' && <Button color='info' onClick={() => changeView('allProducts')}>View all Products</Button>}
            {currentView === 'allProducts' && <Button color='info' style={{margin: 'auto', marginTop: '3%'}} onClick={() => changeView('newProduct')}>Add New Product</Button>}
            {currentView === 'allProducts' && <Products setCurrentView={setCurrentView} setHandle={setHandle} />}
            {currentView === 'product' && <ProductDetails currentView={currentView} setCurrentView={setCurrentView} handle={handle} setHandle={setHandle} />}
            {currentView === 'product' && <Button color='info' onClick={() => changeView('newProduct')}>Add New Product</Button>}
            {currentView === 'editProduct' && <EditProduct currentView={currentView} clearProductInfo={clearProductInfo} clearProfile={clearProfile} />}
            {currentView === 'editProduct' && <Button color='info' onClick={() => changeView('allProducts')}>View all Products</Button>}
        </div>
    )
}

export default ManageProducts