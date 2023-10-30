import React, { useState, useEffect } from 'react'
import Profile from '../Profile/Profile'
import img from "../../assets/Avatar.png"
import classes from './Homepage.module.css'
import Suggestions from '../Suggestions/Suggestions'
import { useNavigate } from 'react-router-dom'
import axios from '../../interceptors/interceptors'

const Homepage = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchD = async () => {
      await axios.get('/user/')
      .then(response => {
        console.log(response.data.user)
        setUser(response.data.user)
      })
      .catch(err => {
        navigate('/login')
        console.log(err)
      })
    }
    fetchD();
  }, [])

  const signOut = () => {
    const expirationDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
    document.cookie = `${"token"}=; expires=${expirationDate.toUTCString()}; path=/`;
    navigate('/login');
  }

  return (
    <div className={classes.container}>
      <button className={classes.signOut} onClick={signOut}>Sign Out</button>
      <Profile user={user} />
      {/* <Suggestions /> */}
    </div>
  )
}

export default Homepage