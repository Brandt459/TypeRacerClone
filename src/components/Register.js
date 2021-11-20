import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Register.css'

export default function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    function submitLogin(e) {
        e.preventDefault()
        if (username && password && confirmPassword && password === confirmPassword) {
            fetch('/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': username,
                    'password': password
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
        <div className="register-container">
            <div className="header">Register</div>
            <div className="sub-header">Aute ad velit pariatur nulla commodo et minim dolore eiusmod esse ea.</div>
            <form className="register-form" onSubmit={(e) => submitLogin(e)}>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
                {error &&
                    <div className="register-error">{error}</div>
                }
                <input type="submit" placeholder="Sign in" />
            </form>
            <div className="or-register">
                <Link to="/login">Sign in</Link>
            </div>
        </div>
    )
}
