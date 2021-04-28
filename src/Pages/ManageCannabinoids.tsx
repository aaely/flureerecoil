import { useState, FunctionComponent } from 'react'
import { useSetRecoilState } from 'recoil'
import { forceUpdate as upd } from '../Recoil/fluree.tsx'
import Cannabinoids from '../Components/Cannabinoids.tsx'
import CannabinoidEdit from '../Components/CannabinoidEdit.tsx'
import { cannabinoid } from '../types/types.ts'
import { Link } from 'react-router-dom'

const ManageCannabinoids: FunctionComponent = () => {

    const [edit, setEdit] = useState<boolean>(false)
    const [activeCannabinoid, setActiveCannabinoid] = useState<cannabinoid>({})

    const update: Function = useSetRecoilState(upd)

    const changeEdit: Function = () => {
        update(Math.random())
        setEdit(!edit)
    }
    
    const onEdit: Function = (_cannabinoid: cannabinoid) => {
        setEdit(true)
        setActiveCannabinoid(_cannabinoid)
    }

    return(
        <div>
            {!edit && <Cannabinoids handleEdit={onEdit} />}
            {edit && <CannabinoidEdit cannabinoid={activeCannabinoid} handleEdit={changeEdit} />}
            <br/>
            {!edit && <Link to='/addCannabinoid'>Add Cannabinoid</Link>}
        </div>
    )
}

export default ManageCannabinoids