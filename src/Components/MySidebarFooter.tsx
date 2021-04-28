import { Menu, MenuItem } from 'react-pro-sidebar'
import { Row, Badge } from 'react-bootstrap'
import { FaSpotify } from 'react-icons/fa'
import { totalCost, expTime } from '../Recoil'
import { useRecoilValue } from 'recoil'
import '../css/app.scss';


const MySidebarFooter: Function = () => {

    const total: number = useRecoilValue(totalCost)
    const exp: number = useRecoilValue(expTime)

    return(
        <>
            <Menu iconShape='circle'>
                <Row>
                    <MenuItem><FaSpotify /> {exp > 0 && <span>{exp}</span>}</MenuItem>
                    <MenuItem><Badge variant='success'>${total}</Badge></MenuItem>
                </Row>
            </Menu>
        </>
    )
}

export default MySidebarFooter