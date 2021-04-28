import { balance, account } from '../Recoil'
import { useRecoilValue } from 'recoil'

export default function Test3 () {
    const acct: string = useRecoilValue(account)
    const currentBalance: number = useRecoilValue(balance(acct))
    
    return(
        <div>
            Balance: <br /> {currentBalance}
        </div>
    )
}