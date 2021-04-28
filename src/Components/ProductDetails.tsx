import { Button } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { getProduct, handle as h } from '../Recoil'
import { Product } from '../types'
import TerpeneDisplay from './TerpeneDisplay.tsx'
import CannabinoidDisplay from './CannabinoidDisplay.tsx'

interface PropTypes {
    setCurrentView: Function,
    currentView: string
}

const ProductDetails: Function = (props: PropTypes) => {

    const handle: string = useRecoilValue(h)
    const product: Product = useRecoilValue(getProduct(handle))

    const renderProduct: Function = () => {
        return (
            <div style={{marginTop: '3%'}} >
                <h3 style={{ textAlign: 'center'}}>{product[0]['product/name']} </h3>
                <br/>
                {<img src={`https://ipfs.io/ipfs/${product[0]['product/imageHash']}`}  style={{maxHeight: '500px', maxWidth: '700px', margin: 'auto', display: 'block'}} alt={product._id} />}
                <br/>
                <h5 style={{ textAlign: 'center'}}>${product[0]['product/cost']} per gram</h5>
                <br/>
                <h5 style={{ textAlign: 'center'}}>{product[0]['product/inventory']}g in stock</h5>
                <br/>
                <TerpeneDisplay terpenes={product[0]['product/productProfileId']['productprofile/terpeneIds']} concentrations={product[0]['product/productProfileId']['productprofile/terpConc']} />
                <br/>
                <CannabinoidDisplay cannabinoids={product[0]['product/productProfileId']['productprofile/cannabinoidIds']} concentrations={product[0]['product/productProfileId']['productprofile/cannConc']} />
                <br/>
                <Button style={{display: 'block', marginLeft: 'auto', marginRight: '3%'}} color='info' onClick={() => props.setCurrentView('editProduct')}>Edit</Button>
                <Button style={{display: 'block', marginRight: 'auto', marginLeft: '3%'}} color='danger' onClick={() => props.setCurrentView('allProducts')}>Back</Button>
            </div>
        )
    }
    return (
        <>
            {product.length > 0 && renderProduct()}
        </>
    )

}

export default ProductDetails