import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
import StrengthChecker from '../StrengthChecker/StrengthChecker'
import { addUser } from '../../apis/auth.api'

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        userName: "",
        password: ""

    })

    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        setDisabled(true)
        if (formData.email === "" || formData.password === "" || formData.userName === "" || formData.name === "") {
            setErrorMsg("Please fill all the fields")
            setDisabled(false)
            return
        }
        setErrorMsg("")
        const postUser = await addUser(formData)
            .then((res) => {
                console.log("res", res);
                navigate('/')
                return res
            })
            .catch((error) => {
                console.log("error", error);
                setErrorMsg(error.response.data.message);
                return error
            })
        console.log("postUser", postUser);
        setDisabled(false)
    }
    const change = (e) => {
        e.preventDefault()
        navigate('/login')
    }
    return (
        <div className={classes.main}>
            <form method='POST'>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='userName' type='text' placeholder='userName' onChange={changeHandler} />
                    <span className="material-symbols-outlined" title='UserName'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='name' type='text' placeholder='Name' onChange={changeHandler} />
                    <span className="material-symbols-outlined" title='Name'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='email' type='text' placeholder='Email' onChange={changeHandler} />
                    <span className="material-symbols-outlined" title='Email'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input name='password' autoComplete={"false"} type={showPassword ? "text" : "password"} placeholder='Password' onChange={changeHandler} />
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