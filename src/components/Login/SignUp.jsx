import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
import { auth } from '../../firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { checkUserExists, setUser } from '../../handleData/User'
import StrengthChecker from '../StrengthChecker/StrengthChecker'

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const codes = {
        "auth/email-already-in-use": "Email in use. Try Logging In",
        "auth/weak-password": "Enter a Strong Password",
        "auth/invalid-email": "Enter a Valid Email",
    }

    const handleClick = () => {
        setShowPassword(!showPassword)

    }
    const submitForm = async (e) => {
        e.preventDefault()
        setDisabled(true)
        if (email === "" || password === "" || userName === "" || name === "") {
            setErrorMsg("Please fill all the fields")
            setDisabled(false)
            return
        }
        setErrorMsg("")
        const userNameAvailable = await checkUserExists(userName);
        if (!userNameAvailable) {
            setErrorMsg("Username Already Taken")
            setDisabled(false)
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                const addUser = await setUser(userName, email, name);
                res.user.displayName = name;
                console.log(res.user)
                console.log("User Created");
                setDisabled(false)
                navigate('/')
            })
            .catch(
                (error) => {
                    console.log(error);
                    const errorCode = error.code;
                    setErrorMsg(codes[errorCode]);
                    setDisabled(false)
                }
            )
        console.log("Promise Returned");
    }
    const change = (e) => {
        e.preventDefault()
        navigate('/login')
    }
    return (
        <div className={classes.main}>
            <form method='POST'>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='userName' type='text' placeholder='userName' value={userName} onChange={(event) => setUserName(event.target.value)} />
                    <span className="material-symbols-outlined" title='UserName'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='Name' type='text' placeholder='Name' value={name} onChange={(event) => setName(event.target.value)} />
                    <span className="material-symbols-outlined" title='Name'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='email' type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <span className="material-symbols-outlined" title='Email'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input name='password' autoComplete={"false"} type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <span className="material-symbols-outlined" onClick={handleClick} title={showPassword ? "Hide Password" : "Show Password"}>
                        {showPassword && "visibility_off"}
                        {!showPassword && "visibility"}
                    </span>
                </div>
                {password && <StrengthChecker password={password} />}
                <div className={classes.errorMsg}>
                    <h4>{errorMsg}</h4>
                </div>
                <button disabled={disabled} className={classes.btn} onClick={submitForm} >Submit</button>
                <h2>Already Registered ? <button onClick={change}>Login</button></h2>
            </form >
        </div >
    )
}

export default SignUp