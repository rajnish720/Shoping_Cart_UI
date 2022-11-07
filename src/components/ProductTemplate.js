import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../cssFiles/ProductTemplate.css'
import { context } from './Context';


function ProductTemplate(props) {
  // console.log(props);
  // let categoryPath = '/' +  props.product.category;
  const [products, setProductData] = useContext(context);
  const currUser = localStorage.getItem('currUser');
  const navigate = useNavigate();
// style={{backgroundImage: `url(${props.product.image})`}}

  let preProductCount = 0;
  for(let i=0;i<products.length;i++){
    if(products[i].id === props.product.id){
      preProductCount = products[i].count;
      break;
    }
  }

  const [productCount, setProductCount] = useState(preProductCount);
  const decrementProductCount = () =>{
    if(! currUser){
      alert('Please login first')
      navigate('/login')
    }
    setProductCount(prevCount => prevCount -1);
    if(productCount <= 0) setProductCount(0);

    const tempProduct = products.map(currProduct =>{
      if(currProduct.id === props.product.id && currProduct.count > 0) currProduct.count --;
      return currProduct;
    } )
    
    setProductData(() => tempProduct);
    
  }

  const incrementProductCount = () =>{
    if(! currUser){
      alert('Please login first')
      navigate('/login')
    }
    setProductCount(prevCount => prevCount +1);
    // console.log(index);
    
    const tempProduct = products.map(currProduct =>{
      if(currProduct.id === props.product.id ) currProduct.count ++;
      return currProduct;
    } )
    
    setProductData(() => tempProduct);
  }

  return (
    
      <div className='ProductTemplate' style={{minWidth:'18rem'}}>
        <div className='details' style={{}}>
          <div className='image'>
            <img src={props.product.images[0]} />
          </div>
          <p className='productCategory' >{props.product.title}</p>
          <div className='data'>
            <div>Price </div>
            <div>&#8377;<del>{props.product.price}</del>  {Math.round(props.product.price * (100 - props.product.discountPercentage) / 100)}</div>
          </div>
          <div className='data'>
            <div>
              <button onClick={decrementProductCount}>-</button>
              <button>{productCount}</button>
              <button onClick={incrementProductCount}>+</button>
            </div>
            <Link to={{pathname:`/product/${props.product.id}`}}>Show More...</Link>
          </div>
        </div>
      <div>&nbsp;</div>
      </div>
    
  )
}

export default ProductTemplate