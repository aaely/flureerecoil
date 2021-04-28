import { useInterval } from '../utils/useInterval'
import { expTime, getToken } from '../Recoil'
import { useRecoilState, useRecoilValue } from 'recoil'

const useExpTimer: Function = () => {

    const [timer, setTimer] = useRecoilState<number>(expTime)
    const token: string = useRecoilValue(getToken)

    useInterval(() => {
        if(timer > 0) {
            setTimer(timer - 1)
        }
        if(token === undefined) {
            setTimer(0)
        }
    }, 1000)

}

export default useExpTimer