import { account as a, getCannabinoids, getProducts, getCategories, getTerpenes, forceUpdate, filteredProducts as f } from '../Recoil'
import { ChangeEventHandler, useState, useEffect, useRef, RefObject } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { Product, Category, Terpene } from '../types'
import { fetchTerpeneProducts, fetchCannabinoidProducts } from '../queries'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { MySyntheticEvent } from 'src/types/types';
import { send } from '../ws'
import RenderProducts from './RenderProducts.tsx'

interface PropTypes {
    setCurrentView: Function,
    setHandle: Function
}
  
const Products: Function = (props: PropTypes) => {

    const account: string = useRecoilValue(a)
    const update: Function = useSetRecoilState(forceUpdate)
    const allProducts: Product[] = useRecoilValue(getProducts)
    const allCategories: Category[] = useRecoilValue(getCategories)
    const allTerpenes: Terpene[] = useRecoilValue(getTerpenes)
    const allCannabinoids: Terpene[] = useRecoilValue(getCannabinoids)
    const [search, setSearch] = useState<string>('')
    const [catFilter, setCatFilter] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useRecoilState<Array<Product>>(f)
    const [loading, setLoading] = useState<boolean>(true)
    const filterRef: RefObject<any> = useRef(null)

    useEffect(() => {
        if(loading) {
            if(filteredProducts.length < 1 || filteredProducts.length === allProducts.length - 1) {
                setFilteredProducts(allProducts)
            }
            setTimeout(() => {filterRef.current.focus()}, 300)
            setLoading(false)
        }
        if(!loading && !filterRef.current.focus()){
            filterRef.current.focus()
        }
    }, [loading, setLoading, setFilteredProducts, allProducts])

    const handleChange: ChangeEventHandler = async ({target: {value, id}}: MySyntheticEvent) => {
        switch(id) {
            case 'search': {
                setSearch(value)
                send('filter.name', value, account)
                break;
            }
            case 'category': {
                setCatFilter(value)
                if(value === 'All') {
                    setFilteredProducts(allProducts)
                    break;
                }
                send('filter.cat', value, account)
                break;
            }
            case 'terpene': {
                update(Math.random())
                const queryHandle: string = await setFilter('terpeneFilter', value)
                const id: string = await setFilter('terpeneId', value)
                const filter: Product[] = await setFilter('terpene', queryHandle)
                const data: any = { id: id.toString(), filter: filter}
                send('filter.terpene', data, account)
                break;
            }
            case 'cannabinoid': {
                update(Math.random())
                const queryHandle: string = await setFilter('cannabinoidFilter', value)
                const id: string = await setFilter('cannabinoidId', value)
                const filter: Product[] = await setFilter('cannabinoid', queryHandle)
                const data: any = { id: id, filter: filter}
                send('filter.cannabinoid', data, account)
                break;
            }
            default: break;
        }
    }

    const setFilter: Function = async (property: string, term: string) => {
        switch(property) {
            case 'terpeneFilter': {
                const response = await allTerpenes.findIndex(x => x['terpene/name'] === term)
                return allTerpenes[response]['terpene/handle']
            }
            case 'terpeneId': {
                const response = await allTerpenes.findIndex(x => x['terpene/name'] === term)
                return allTerpenes[response]['_id'].toString()
            }
            case 'terpene': {
                const response: Product[] = await fetchTerpeneProducts(term)
                return response[0]['terpene/products']
            }
            case 'cannabinoidFilter': {
                const response = await allCannabinoids.findIndex(x => x['cannabinoid/name'] === term)
                return allCannabinoids[response]['cannabinoid/handle']
            }
            case 'cannabinoid': {
                const response: Product[] = await fetchCannabinoidProducts(term)
                return response[0]['cannabinoid/products']
            }
            case 'cannabinoidId': {
                const response = await allCannabinoids.findIndex(x => x['cannabinoid/name'] === term)
                return allCannabinoids[response]['_id'].toString()
            }
            default: break;
        }
        
    }

    const categoryForm: Function = () => {
        return(
            <>
                <Form>
                    <FormGroup>
                        <Label for='search'>Search for a Product by Category</Label>
                        <Input type='select' id='category' onChange={handleChange}>
                            <option>All</option>
                            {allCategories.map(cat => {
                                return <option key={cat['_id']}>{cat['category/name']}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Form>
            </>
        )
    }

    const terpeneForm: Function = () => {
        return(
            <>
                <Form>
                    <FormGroup>
                        <Label for='search'>Search for a Product by Terpene</Label>
                        <Input type='select' id='terpene' onChange={handleChange}>
                            {allTerpenes.map(terp => {
                                return <option key={terp['_id']}>{terp['terpene/name']}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Form>
            </>
        )
    }

    const cannabinoidForm: Function = () => {
        return(
            <>
                <Form>
                    <FormGroup>
                        <Label for='search'>Search for a Product by Cannabinoid</Label>
                        <Input type='select' id='cannabinoid' onChange={handleChange}>
                            {allCannabinoids.map(cann => {
                                return <option key={cann['_id']}>{cann['cannabinoid/name']}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Form>
            </>
        )
    }

    const searchForm: Function = () => {
        return(
            <>
                <Form style={{margin: '0 auto', maxWidth: '400px'}} >
                    <FormGroup>
                        <Label for='search'>Search for a Product by Name</Label>
                        <Input type='text' id='search' value={search} innerRef={filterRef} onChange={handleChange} />
                    </FormGroup>
                </Form>
            </>
        )
    }

    const setView: Function = (view: string) => {
        props.setCurrentView(view)
    }

    const renderProducts: Function = () => {
        return(
            <>
                <RenderProducts
                setCurrentView={setView}
                products={filteredProducts}
                />
            </>
        )
    }

    return(
        <div style={{textAlign: 'center', margin: '0 auto'}} >
            <br/>
            <Button color='warning' onClick={() => setFilteredProducts(allProducts)}>Remove All Filters</Button>
            <br />
            {searchForm()}
            <br/>
            {categoryForm()}
            <br/>
            {terpeneForm()}
            <br/>
            {cannabinoidForm()}
            <br/>
            {filteredProducts !== undefined && filteredProducts.length > 0 && renderProducts()}
        </div>
    )

}

export default Products