import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../cssFiles/LoginSignUpPage.css'

function LoginSignUpPage() {
    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        // console.log(email + " " + userPassword);
        
        


        var userList = JSON.parse(window.localStorage.getItem('userList'));
        if(! userList) userList = {};

        if(! userList[email]) alert('Please Sign up..')
        else if(userList[email] && userList[email].password !== userPassword) alert('Wrong password..')
        else{
            localStorage.setItem('currUser', JSON.stringify(userList[email]))
            navigate('/');
        }
    }

    return (
        <div className='LoginSignUpPage'>
            <div className='email'>
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='password'>
                <label>Password</label>
                <input
                    type='password'
                    placeholder='password'
                    value={userPassword}
                    required
                    onChange={e => setUserPassword(e.target.value)}
                />
            </div>
            <div className='login'>
                <button onClick={validation}>Login</button>
            </div>
            <div className='signUp'>
                <Link to='sign-up'>SignUp</Link>
            </div>
        </div>
    )
}

export default LoginSignUpPage