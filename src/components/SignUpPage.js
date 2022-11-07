import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../cssFiles/SignUpPage.css'

function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        let isUserNameValid = false;
        if(userName.length > 1 || /^[a-zA-Z]+$/.test(userName[0])) {
            isUserNameValid = true;
        }

        let isEmailValid = false;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            isEmailValid = true;
        }

        let isPassworValid = userPassword.length < 6 ? false : true;

        if(! isUserNameValid){
            alert('first character must be a letter and length of user name should be greater than 1 character')
        }
        
        if(! isEmailValid){
            alert('Please enter valid email');
            setEmail('');
            setUserPassword('');
        }
        if(! isPassworValid){
            alert('Please enter atleast 6 character')
            setUserPassword('');
        }

        const userDetail = {
            userName : userName,
            email : email,
            password : userPassword
        }
        var userList = JSON.parse(window.localStorage.getItem('userList'));
        if(! userList) userList = {};
        if(! userList[email]) userList[email] = userDetail;


        localStorage.setItem("userList", JSON.stringify(userList));

        // console.log(JSON.parse(localStorage.getItem('userList')));

        

        navigate('/login');
        
    }
    

    // useEffect(() =>{
    //     const userDetail = {
    //         userName : userName,
    //         email : email,
    //         password : userPassword
    //     }
    //     var userList = JSON.parse(window.localStorage.getItem('userList'));
    //     if(! userList) userList = {};
    //     userList[email] = userDetail
    //     localStorage.setItem("userList", JSON.stringify(userList));

    //     console.log(JSON.parse(localStorage.getItem('userList')));
    // })

    return (
        <div className='SignUpPage'>
            <div className='userName'>
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Enter your name'
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            <div className='email'>
                <label>Email</label>
                <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className='password'>
                <label>Password</label>
                <input
                    type='password'
                    placeholder='password'
                    value={userPassword}
                    onChange={e => setUserPassword(e.target.value)}
                />
            </div>
            <div className='submit'>
                <button onClick={validation}>Submit</button>
            </div>
        </div>
    )
}

export default SignUpPage