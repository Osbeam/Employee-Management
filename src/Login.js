import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from './Images/ShawniksLogo.png'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    return (
        <>
            <div className='main'>
                <div className='main-container'>
                    <div className='left-container'>
                        <div className='left-contnr-items'>
                            <img src={logo} />
                            {/* <h2>Welcome back Hr</h2> */}
                        </div>
                    </div>
                    <div className='right-container'>
                        <form>
                            <div className='form-div'>
                                <h1>Hello Admin!</h1>
                            <p>Welcom back</p>
                                <input 
                                type='username' 
                                value={username} 
                                placeholder='Enter username' 
                                className='input-login' 
                                onChange={(e) => setUsername(e.target.event)}
                                /><br/>
                                <input 
                                type='password' 
                                value={password} 
                                placeholder='Enter password' 
                                className='input-login'
                                onChange={(e) => setPassword(e.target.event)} 
                                /><br/>
                                <button ><Link to="/admin" className='Link'>Submit</Link></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
