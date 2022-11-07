import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { context } from './Context'

import '../cssFiles/NavBar.css'
import { useContext } from 'react'


function NavBar({ handleSearch }) {
    const [products] = useContext(context);
    const [searchItem, setSearchItem] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currUser')))

    let ordersCount = 0;
    let filteredProducts = []

    const handleForm = (e) => {
        e.preventDefault();
        handleSearch(searchItem);
    }

    if (localStorage.getItem('currUser')) for (let i = 0; i < products.length; i++) ordersCount += products[i].count;

    // if(localStorage.getItem('currUser')){
    //     const currUser = JSON.parse(localStorage.getItem('currUser'));
    //     console.log(currUser.userName);
    //      document.getElementById('UserName').innerHTML = currUser.userName;
    // }

    useEffect(() => {
        // if (localStorage.getItem('currUser')) {
            // const currUser = JSON.parse(localStorage.getItem('currUser'));
            // console.log(currUser.userName);
            // document.getElementById('UserName').innerHTML = 'Hello,' + currUser.userName.substring(0, 3);
            // document.getElementById('login').innerHTML = 'logout'
        // }
        // else document.getElementById('UserName').innerHTML = 'Hello, guest';
        // console.log(searchItem);


        filteredProducts = products.map(product => {
            if (product.category === searchItem){ 
                return product
            };
        })
    })


    return (
        <div className='NavBar'>
            <div className='leftNav'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='search'>
                        <span >Search: </span>
                        <form onSubmit={handleForm}>
                            <input
                                type='text'
                                name='text'
                                placeholder='Search Item...'
                                value={searchItem}
                                onChange={e => { setSearchItem(e.target.value) }}

                            /></form>
                    </li>
                </ul>
            </div>
            <div className='rightNav'>
                <ul>
                    {
                        // user &&
                    <li >
                        <div id='UserName'>Hello, {user?.userName ??"..."}</div>
                    </li>
                    }
                    <li>
                        <Link to='/Cart'>Cart-{ordersCount}</Link>
                    </li>
                    {/* <li>
                        <Link to='/login' id='login'>Login</Link>
                    </li> */}
                    <li>
                        {
                            user ?  (<Link to='/Logout' onClick={()=>{setUser(null)}}>Logout</Link>)
                            :  (<Link to='/login' id='login'>Login</Link>)
                        }
                    </li>


                </ul>
            </div>
            {/* <FilterProducts filteredProducts = {filteredProducts} /> */}
        </div>
    )
}

export default NavBar