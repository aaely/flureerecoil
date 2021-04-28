import logo from '../logo.svg';
import '../App.css';
import { FunctionComponent } from 'react'
import Test from './Test.tsx'

const Dashboard: FunctionComponent = (props: any) => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <Test />
      </header>
    </div>
  )
}

export default Dashboard;
