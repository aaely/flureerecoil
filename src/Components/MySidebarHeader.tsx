import { Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { GiConvergenceTarget } from 'react-icons/gi'
import { FaBars } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import { collapsed as c } from '../Recoil'

interface PropTypes {
    changeHandler: Function
}

const MySidebarHeader: Function = (props: PropTypes) => {

    const collapsed: boolean = useRecoilValue(c)

    return(
        <>
            <Menu iconShape='round'>
                {collapsed && <MenuItem icon={<FaBars />} >
                    <Link onClick={() => props.changeHandler('collapsed')}>
                        Expand
                    </Link>
                </MenuItem>}
                {!collapsed && <MenuItem icon={<GiConvergenceTarget />} >
                    <Link onClick={() => props.changeHandler('collapsed')}>
                        Collapse
                    </Link>
                </MenuItem>}
            </Menu>
        </>
    )
}

export default MySidebarHeader