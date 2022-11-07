import React, { useContext, useState } from 'react'
import { context } from './Context'
import { useLocation } from 'react-router-dom';

import '../cssFiles/ProductDetail.css'


function ProductDetail() {
    const [products] = useContext(context);
    const [imageId, setImageId] = useState(1)
    let productLocation = useLocation().pathname;
    if (products.length === 0) return null
    // console.log(productLocation);

    let pathLength = productLocation.length;

    if (pathLength <= 9) return null;

    let productId = productLocation.substring(9);

    if (isNaN(productId)) return null;

    productId = parseInt(productId);
    var product = null;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }
    // console.log(product);
    if (product === null) return null

    return (
        <div className='ProductDetail'>
            <div className='productImg'>
                <img src={product.images[imageId -1]}></img>
                <div className='imageSelector'>
                    <input type='radio' id='1' value='img1' onClick={() => setImageId(1)} />
                    <input type='radio' id='2' value='img2' onClick={() => setImageId(2)} />
                    <input type='radio' id='3' value='img3' onClick={() => setImageId(3)} />
                    <input type='radio' id='4' value='img4' onClick={() => setImageId(4)} />
                    <input type='radio' id='5' value='img5' onClick={() => setImageId(5)} />
                </div>
            </div>
            <div className='productDetail'>
                <h4>{product.title}</h4>
                <div className='detail'>
                    <div>Brand</div>
                    <div>{product.brand}</div>
                </div> <hr />
                <div className='detail'>
                    <div>Price:</div>
                    <div>&#8377; <del>{product.price}</del>  {Math.round(product.price * (100 - product.discountPercentage) / 100)}</div>
                </div> <hr />

            </div>
            <div style={{height : '100px'}}></div>
        </div>
    )
}

export default ProductDetail