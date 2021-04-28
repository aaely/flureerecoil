import { useEffect, FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import useWebsocket from './utils/useWebsocket.tsx'
import { bgImage, width as w, sidebarWidth as sw, getRefToken, refreshToken, networkId as ni, getNetworkId as gni, account, initializeAccount, rtl as r, toggled as t, getToken, accessToken, userProfile as prf, getUserProfile as getPrf, getTokenExp, expTime } from './Recoil'
import { UserProfile } from './types/types.ts'
//import Landing from './Components/Landing.tsx'
import Checkout from './Pages/Checkout.tsx';
import Spotify from './Pages/Spotify.tsx'
import AddTerpene from './Components/AddTerpene.tsx';
import Cannabinoid from './Components/AddCannabinoid.tsx';
import ManageCannabinoids from './Pages/ManageCannabinoids.tsx'
import ManageTerpenes from './Pages/ManageTerpenes'
import ManageCustomers from './Pages/ManageCustomers';
import Dashboard from './Components/Dashboard';
import ManageProducts from './Pages/ManageProducts';
import MySidebar from './Components/MySidebar.tsx'
import useTransListener from './utils/useTransListener.tsx'
import useSidebarWidth from './utils/useSidebarWidth.tsx'
import useViewport from './utils/useViewport.tsx'
import NewSidebarBgImage from './Components/NewSidebarBgImage.tsx'
import 'react-pro-sidebar/dist/css/styles.css';

const App: FunctionComponent = () => {

  useWebsocket()
  useTransListener()
  useSidebarWidth()
  useViewport()
  
  const [networkId, setNetworkId] = useRecoilState<number>(ni)
  const getNetworkId: number = useRecoilValue(gni)
  const getExp: number = useRecoilValue(getTokenExp)
  const setExpTime: Function = useSetRecoilState(expTime)
  const currentExpTime: number = useRecoilValue(expTime)
  const setAccess: Function = useSetRecoilState(accessToken)
  const token: string = useRecoilValue(getToken)
  const setRefToken: Function = useSetRecoilState(refreshToken)
  const refToken: string = useRecoilValue(getRefToken)
  const setAccount: Function = useSetRecoilState(account)
  const acct: string = useRecoilValue(initializeAccount)
  const getUserProfile: UserProfile = useRecoilValue(getPrf)
  const setUserProfile: Function = useSetRecoilState(prf)
  const toggled: boolean = useRecoilValue(t)
  const rtl: boolean = useRecoilValue(r)
  const sidebarWidth: number = useRecoilValue(sw)
  const width: number = useRecoilValue(w)

  const derivedWidth: number = width - sidebarWidth

  useEffect(() => {
    setNetworkId(getNetworkId)
    setAccess(token)
    setAccount(acct)
    setRefToken(refToken)
    setUserProfile(getUserProfile)
    if(currentExpTime < 1 || currentExpTime === undefined) {
      setExpTime(getExp)
    } 
  }, [refToken, setRefToken, currentExpTime, acct, setAccount, token, setAccess, getUserProfile, setUserProfile, getExp, setExpTime, getNetworkId, setNetworkId])

  return (
    <Router>
      <div style={{overflowX: 'hidden'}} className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
        <MySidebar />
        <div style={{width: `${derivedWidth}px`, transform: `translate(${sidebarWidth}px, 0)`, transition: 'transform .15s linear'}}>
      <Switch>
        <Route component={Dashboard} exact path='/' />
        <Route component={Checkout} path='/checkout' />
        <Route component={Spotify} path='/spotify' />
        <Route component={NewSidebarBgImage} path='/newSidebarImage' />
        <Route component={AddTerpene} path='/addTerpene' />
        <Route component={Cannabinoid} path='/addCannabinoid' />
        <Route component={ManageCannabinoids} path='/editCannabinoid' />
        <Route component={ManageTerpenes} path='/editTerpene' />
        <Route component={ManageCustomers} path='/editCustomer' />
        <Route component={ManageProducts} path='/editProduct' /><Route component={Dashboard} exact path='/' />
        <Route component={Checkout} path='/checkout' />
        <Route component={Spotify} path='/spotify' />
        <Route component={AddTerpene} path='/addTerpene' />
        <Route component={Cannabinoid} path='/addCannabinoid' />
        <Route component={ManageCannabinoids} path='/editCannabinoid' />
        <Route component={ManageTerpenes} path='/editTerpene' />
        <Route component={ManageCustomers} path='/editCustomer' />
        <Route component={ManageProducts} path='/editProduct' />
      </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
