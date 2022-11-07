import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const context = createContext();

export const ContextProvider = ({children}) =>{
    const [productsData, setProductData] = useState([]);
    // const orderCount = 0;

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then((res) => {
                // console.log(res);
             const updatedProducts =   res.data.products.map(product=> {
                    return {...product,'count':0}
                });
                // console.log('updatedProducts',updatedProducts);
                setProductData(updatedProducts)
            })
            .catch((err) => {
                console.log(err);
            })

        
    },[])

    const products = productsData.length > 0 ? productsData : [];
    // const [order, setOrder] = useState(Array(32).fill(0))
    
    // console.log(order);
    // setOrder(tmp);

    return(
        <context.Provider value={[products, setProductData]}>
            {children}
        </context.Provider>
    )
}