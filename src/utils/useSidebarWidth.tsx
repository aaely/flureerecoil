import { useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sidebarWidth as sw, collapsed as c, toggled as t } from '../Recoil'

const useSidebarWidth: Function = () => {

    const setSidebarWidth: Function = useSetRecoilState(sw);
    const collapsed: boolean = useRecoilValue(c);
    const toggled: boolean = useRecoilValue(t);
      
    useEffect(() => {
        if(toggled && collapsed) {
            setSidebarWidth(80)
        }
        if(toggled && !collapsed) {
            setSidebarWidth(270)
        }
        if(!toggled) {
            setSidebarWidth(0)
        }

    }, [collapsed, toggled])

    return null
      
  }

  export default useSidebarWidth