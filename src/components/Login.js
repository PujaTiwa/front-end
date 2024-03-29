import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/')
        }
    },[])

    const handleLogin = async()=>{
        console.warn(email, password);
        let result = await fetch('http://localhost:4500/login', {
            method:'post',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/')
        } else {
            alert('Please enter correct details..')
        }
    }
    return (
        <div className='login'>
            <input className='inputBox' type='email' placeholder='Enter Email'
            value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className='inputBox' type='password' placeholder='Enter Password'
            value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;