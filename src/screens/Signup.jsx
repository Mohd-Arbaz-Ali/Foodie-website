import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [Credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    function onChange(event) {
        setCredentials({
            ...Credentials,
            [event.target.name]: event.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch("https://foodie-api-7tq3.onrender.com/api/createuser", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: Credentials.name,
                email: Credentials.email,
                password: Credentials.password,
                location: Credentials.geolocation
            })
        })

        const json = await response.json();
        const userRegistered = json.success;

        if (userRegistered) {
            setCredentials({
                name: "",
                email: "",
                password: "",
                geolocation: ""
            })
            toast.success('Registered Successfully', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error('Failed!', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div>
            <section className="forms-section">
                <ToastContainer />
                <div className="forms">
                    <div className="form-wrapper">
                        <button type="button" className="switcher switcher-login">
                            <Link to="/login" className="switcher-login" style={{ textDecoration: "none", color: "white" }}> Login </Link>
                            <span className="underline"></span>
                        </button>
                        <form className="form form-login">
                            <fieldset>
                                <legend>Please, enter your email and password for login.</legend>
                                <div className="input-block">
                                    <label htmlFor="login-email">E-mail</label>
                                    <input id="login-email" type="email" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="login-password">Password</label>
                                    <input id="login-password" type="password" required />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-login">Login</button>
                        </form>
                    </div>
                    <div className="form-wrapper is-active">
                        <button type="button" className="switcher switcher-signup">
                            <Link to="/signup" className="switcher-login" style={{ textDecoration: "none" }}> Signup </Link>
                            <span className="underline"></span>
                        </button>
                        <form className="form form-signup" onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                                <div className="input-block">
                                    <label htmlFor="signup-username">Name</label>
                                    <input name='name' value={Credentials.name} id="signup-name" type="text" required onChange={onChange} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input name='email' value={Credentials.email} id="signup-email" type="email" required onChange={onChange} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password">Password</label>
                                    <input name='password' value={Credentials.password} id="signup-password" type="password" required onChange={onChange} />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-location">Geolocation</label>
                                    <input name='geolocation' value={Credentials.geolocation} id="signup-location" type="text" required onChange={onChange} />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-signup">Sign Up</button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}



