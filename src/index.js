import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.ts';
import { RecoilRoot } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import Loader from './Components/Loader.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const { RecoilPersist, updateState } = recoilPersist(
  [], // configure that atoms will be stored (if empty then all atoms will be stored),
  {
      key: 'recoil-persist', // this key is using to store data in local storage
      storage: localStorage // configurate which stroage will be used to store the data
  }
)

//localStorage.clear()

ReactDOM.render(
  
  <React.StrictMode>
    <RecoilRoot initializeState={({ set }) => updateState({ set })}>
      <Suspense fallback={<Loader type='circles' />}>
      <RecoilPersist />
      <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
