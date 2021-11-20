import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'

export default function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    function submitLogin(e) {
        e.preventDefault()
        if (username && password) {
            fetch('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('token')) {
                    localStorage.setItem('token', data.token)
                    navigate('/')
                } else {
                    setError(data.message)
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="login-container">
            <div className="header">Sign in</div>
            <div className="sub-header">Aute ad velit pariatur nulla commodo et minim dolore eiusmod esse ea.</div>
            <form className="login-form" onSubmit={(e) => submitLogin(e)}>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                {error &&
                    <div className="login-error">{error}</div>
                }
                <input type="submit" placeholder="Sign in" />
            </form>
            <div className="or-register">
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}
