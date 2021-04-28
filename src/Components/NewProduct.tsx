import { Category } from '../types/types.ts'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useRef, ChangeEventHandler, MouseEventHandler, useEffect, useState, MutableRefObject } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { MySyntheticEvent, Product } from '../types'
import { productName,
         productCost,
         productInventory,
         category as cat,
         tabId as tab,
         buffer as b,
         getCategories,
         getProduct,
         forceUpdate,
         handle as h } from 'src/Recoil'

interface PropTypes {
    currentView: string
}

const NewProduct: Function = (props: PropTypes) => {

    const update: Function = useSetRecoilState(forceUpdate)

    const textRef = useRef<MutableRefObject<any>>(null)

    const categories = useRecoilValue<Array<Category>>(getCategories)
    const [name, setName] = useRecoilState<string>(productName)
    const [cost, setCost] = useRecoilState<number>(productCost)
    const [tabId, setTabId] = useRecoilState<number>(tab)
    const [inventory, setInventory] = useRecoilState<number>(productInventory)
    const [category, setCategory] = useRecoilState<Category>(cat)
    const [buffer, setBuffer] = useRecoilState<Array<number>>(b)
    const handle: string = useRecoilValue(h)
    const activeProduct: Product = useRecoilValue(getProduct(handle))
    const [showItem, setShowItem] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
            if(loading) {        
            setCategory(categories[0])
            if(activeProduct.length > 0) {
                setName(activeProduct[0]['product/name'])
                setCost(activeProduct[0]['product/cost'])
                setInventory(activeProduct[0]['product/inventory'])
                setCategory(activeProduct[0]['product/category'])
                if(activeProduct[0]['product/imageHash']){
                    if(activeProduct[0]['product/imageHash'].length > 0) {
                        setShowItem(false)
                    }
                }
            }
            setLoading(false)
            setTimeout(() => {textRef.current.focus()}, 300)
        }    
    }, [props, setCategory, categories, activeProduct, setName, setCost, setInventory, update, loading, setLoading, handle])

    const handleChange: ChangeEventHandler = ({target: {id, value, files}}: MySyntheticEvent) => {
        switch(id) {
            case 'name': {
                setName(value)
                break;
            }
            case 'cost': {
                setCost((parseInt(value)))
                console.log(cost)
                break;
            }
            case 'inventory': {
                setInventory((parseInt(value)))
                console.log(inventory)
                break;
            }
            case 'category': {
                const ctg: Category = categories.filter(prop => {
                    return prop['category/name'].includes(value)
                })
                setCategory(ctg[0])
                break;
            }
            case 'image': {
                const reader = new window.FileReader()
                reader.readAsArrayBuffer(files[0])
                reader.onloadend = () => {
                    setBuffer([])
                    setBuffer(Buffer(reader.result))
                }
                break;
            }
            default: break;
        }
    }

    const incrementTab: MouseEventHandler = () => {
        setTabId(tabId + 1)
    }

    const renderImage: Function = () => {
        return(
            <FormGroup>
                <Label for='name'>Image</Label>
                <Input type='file' id='image' onChange={handleChange} />
            </FormGroup>
        )
    }

    const renderForm: Function = () => {
        return(
            <Form>
                <FormGroup>
                    <Label for='name'>Product Name</Label>
                    <Input type='text' id='name' value={name} onChange={handleChange} innerRef={textRef} />
                </FormGroup>
                <FormGroup>
                    <Label for='name'>Cost</Label>
                    <Input type='number' id='cost' value={cost} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='name'>Inventory</Label>
                    <Input type='number' id='inventory' value={inventory} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='name'>Category Name</Label>
                    <Input type='select' id='category' onChange={handleChange} value={category['category/name']}>
                    {categories.map(cat => {
                        return(
                            <option key={cat['_id']}>{cat['category/name']}</option>
                        )
                    })}
                    </Input>
                </FormGroup>
                {showItem && renderImage()}
                {!showItem && <Button color='info' onClick={() => setShowItem(!showItem)}>Change Image</Button>}
            </Form>
        )
    }

    return(
        <div style={{maxWidth: '75%', margin: 'auto'}}>
            {props.currentView === 'newProduct' && <h3 style={{textAlign: 'center'}} >Add a New Product</h3>}
            {props.currentView === 'editProduct' && <h3 style={{textAlign: 'center'}} >Edit Product</h3>}
            <br/>
            {renderForm()}
            <Button color='success' onClick={incrementTab}>Next</Button>
        </div>
    )
}

export default NewProduct