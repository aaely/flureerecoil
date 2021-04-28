import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { width as w, height as h } from '../Recoil'

const useViewport = () => {

        const setWidth: Function = useSetRecoilState(w);
        // Add a second state variable "height" and default it to the current window height
        const setHeight: Function = useSetRecoilState(h);
      
        useEffect(() => {
          const handleWindowResize = () => {
            setWidth(window.innerWidth);
            // Set the height in state as well as the width
            setHeight(window.innerHeight);
          }
      
          window.addEventListener("resize", handleWindowResize);
          return () => window.removeEventListener("resize", handleWindowResize);
        }, []);
      
  }

  export default useViewport