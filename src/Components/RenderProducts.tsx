import { Row, Col } from 'react-bootstrap'
import '../App.css';
import { Product } from '../types'
import RenderProduct from './RenderProduct.tsx'


interface PropTypes {
    products: Product[],
    setCurrentView: Function
}

const RenderProducts: Function = (props: PropTypes) => {


    const setView: Function = (view: string) => {
        props.setCurrentView(view)
    }

    return(
        <>
            {props.products.map((a: Product, index: number) => {
                return(
                    <Row style={{display: 'inline-block', margin: '5px', height: '500px'}} key={a['_id']}>
                        <Col md={50}>
                            <RenderProduct
                            setCurrentView={setView}
                            product={a}
                            />
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}

export default RenderProducts