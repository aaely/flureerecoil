import { useInterval } from '../utils/useInterval'
import { expTime, accessToken } from '../Recoil'
import { useSetRecoilState, useRecoilValue } from 'recoil'

const ExpTimer: Function = () => {

    const exp: number = useRecoilValue(expTime)
    const setExpTime: Function = useSetRecoilState(expTime)
    const token: string = useRecoilValue(accessToken)

    useInterval(() => {
        if(exp >= 1) {
            setExpTime(exp - 1)
        }
    }, 1000)

    return (
        <>
            {token !== '' && exp > 0 && <span>{exp}</span> }
        </>
    )
}

export default ExpTimer