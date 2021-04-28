import { useState, FunctionComponent } from 'react'
import { useSetRecoilState } from 'recoil'
import { forceUpdate as upd } from '../Recoil'
import Terpenes from '../Components/Terpenes.tsx'
import TerpeneEdit from '../Components/TerpeneEdit.tsx'
import { terpene } from '../types/types.ts'
import { Link } from 'react-router-dom'

const ManageTerpenes: FunctionComponent = () => {

    const [edit, setEdit] = useState<boolean>(false)
    const [activeTerpene, setActiveTerpene] = useState<terpene>({})

    const update: Function = useSetRecoilState(upd)

    const changeEdit: Function = () => {
        update(Math.random())
        setEdit(!edit)
    }
    
    const onEdit: Function = (_terpene: terpene) => {
        setEdit(true)
        setActiveTerpene(_terpene)
    }

    return(
        <div >
            {!edit && <Terpenes handleEdit={onEdit} />}
            {edit && <TerpeneEdit terpene={activeTerpene} handleEdit={changeEdit} />}
            <br/>
            {!edit && <Link style={{textAlign: 'center'}} to='/addTerpene'>Add Terpene</Link>}
        </div>
    )
}

export default ManageTerpenes