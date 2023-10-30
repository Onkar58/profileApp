import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
import StrengthChecker from '../StrengthChecker/StrengthChecker'
import { loginUser } from '../../apis/auth.api'

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const showForm = async (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "") {
            setErrorMsg("Please fill all the fields")
            return
        }
        if (formData.email !== "" && formData.password !== "") {
            setErrorMsg("")
        }
        await loginUser(formData)
            .then((res) => {
                // console.log("res", res);
                navigate('/')
            })
            .catch((error) => {
                // console.log("error", error);
                setErrorMsg(error.response.data.message);
                return error
            })

    }
    const change = (e) => {
        e.preventDefault()
        navigate('/signup')
    }

    return (
        <div className={classes.main}>
            <form method='POST'>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='userName' type='text' placeholder='UserName' onChange={changeHandler} />
                    <span className="material-symbols-outlined" title='Email'>
                        person
                    </span>
                </div>
                <div className={classes.inputBox}>
                    <input autoComplete="true" name='password' type={showPassword ? "text" : "password"} placeholder='Password' onChange={changeHandler} />
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