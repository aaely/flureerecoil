import { MouseEventHandler, FunctionComponent } from "react"
import { Button } from "reactstrap"
import { useRecoilState } from "recoil"
import { tabId as tab } from "src/Recoil"
import TerpeneProfile from './TerpeneProfile.tsx'
import CannabinoidProfile from './CannabinoidProfile.tsx'
import CannabinoidForm from './CannabinoidForm.tsx'
import TerpeneForm from "./TerpeneForm.tsx"

const NewProductProfile: FunctionComponent = (props: any) => {
    
    const [tabId, setTabId] = useRecoilState<number>(tab)
    
    const incrementTab: MouseEventHandler = () => {
        setTabId(tabId + 1)
    }

    const decrementTab: MouseEventHandler = () => {
        setTabId(tabId - 1)
    }

    return(
        <>
            <TerpeneForm />
            
            <br/>
            
            <CannabinoidForm />
            <br/>
            <h3 style={{textAlign: 'center'}}>Terpenes Selected:</h3>
            <br/>
            <TerpeneProfile />
            <br/>
            <h3 style={{textAlign: 'center'}}>Cannabinoids Selected:</h3>
            <br/>
            <CannabinoidProfile />
            <br/>
            <Button color='danger' onClick={decrementTab}>Back</Button><Button color='success' onClick={incrementTab}>Next</Button>
        </>
    )
}

export default NewProductProfile