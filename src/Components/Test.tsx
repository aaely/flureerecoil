import '../App.css';
import Test2 from './Test2.tsx'
import { getProducts } from '../Recoil'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import Test3 from './Test3.tsx'
import Test4 from './Test4.tsx'
import { Product } from '../types'

const Test: Function = () => {

  const products: Product[] = useRecoilValue(getProducts)
  
  return (
    <div className="App">
        <Test2 />
        <br />
          <Test3 />
          <br />
          <Test4 products={products} />
    </div>
  );
}

export default Test;
