import { useRecoilValue } from 'recoil'
import { tabId as t } from '../Recoil'
import { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import NewProduct from './NewProduct.tsx'
import NewProductProfile from './NewProductProfile.tsx'
import Review from './Review.tsx'

interface PropTypes {
    clearProductInfo: Function,
    clearProfile: Function,
    changeView: Function,
    currentView: string
}

const EditProduct: Function = (props: PropTypes) => {

    const tabId: number = useRecoilValue<number>(t)
    const view: string = props.currentView
    const [loading, setLoading] = useState<boolean>(true)

    const setView: Function = (view: string) => {
        console.log(view)
        props.changeView(view)
    }

    useEffect(() => {
        if(loading) {
            if(props.currentView === 'newProduct') {
                props.clearProductInfo()
            }
            setLoading(false)
        }
    }, [loading, setLoading, props])

    return (
        <>
            {tabId === 1 && <NewProduct currentView={view} />}
            {tabId === 2 && <NewProductProfile />}
            {tabId === 3 && <Review clearProductInfo={props.clearProductInfo} clearProfile={props.clearProfile} setCurrentView={setView} />}
            <br/>
            {tabId === 2 && <Button style={{margin: 'auto', display: 'block'}} color='danger' onClick={props.clearProfile}>Clear Profile</Button>}
            <br/>
            {tabId === 1 && <Button style={{margin: 'auto', display: 'block'}} color='danger' onClick={props.clearProductInfo}>Clear Product Info</Button>}
        </>
    )
}

export default EditProduct