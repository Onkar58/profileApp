import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
import { auth } from '../../firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import StrengthChecker from '../StrengthChecker/StrengthChecker'

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const codes = {
        "auth/user-not-found": "User not found",
        "auth/wrong-password": "Wrong Password",
        "auth/invalid-email": "Invalid Email",
    }

    const handleClick = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)

    }
    const showForm = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setErrorMsg("Please fill all the fields")
            return
        }
        if (email !== "" && password !== "") {
            setErrorMsg("")
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential;
                console.log(user)
                navigate('/')
                console.log("User Logged In")
            })
            .catch(
                (error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    console.log(codes[errorCode]);
                    setErrorMsg(codes[errorCode])
                }
            )
    }
    const change = (e) => {
        e.preventDefault()
        navigate('/signup')
    }

    return (
        <div className={classes.main}>
            <form method='POST'>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='email' type='text' placeholder='Email' value={email} onChange={(event) => setUsername(event.target.value)} />
                    <span className="material-symbols-outlined" title='Email'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='password' type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <span className="material-symbols-outlined" onClick={handleClick} title={showPassword ? "Hide Password" : "Show Password"}>
                        {showPassword && "visibility_off"}
                        {!showPassword && "visibility"}
                    </span>
                </div>
                <div className={classes.errorMsg}>
                    <h4>{errorMsg}</h4>
                </div>
                <button className={classes.btn} onClick={showForm} >Login</button>
                <h2>New User ? <button onClick={change}>SignUp</button></h2>
            </form >
        </div >
    )
}

export default Login