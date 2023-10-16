import React, { useState, useEffect } from 'react'
import Profile from '../Profile/Profile'
import img from "../../assets/Avatar.png"
import classes from './Homepage.module.css'
import Suggestions from '../Suggestions/Suggestions'
import { auth } from '../../firebase/auth'
import { getUser } from "../../handleData/User"
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUser(user.email)
        setUser(userData)
        console.log(userData);

      } else {
        setUser(null)
        navigate("/login")
        return
      }
    })
    if (!user) {
      return
    }
  }, [])

  return (
    <div className={classes.container}>
      <button onClick={() => auth.signOut()} className={classes.signOut}>Sign Out</button>
      {user && <Profile user={user}/>}
      {/* <Suggestions /> */}
    </div>
  )
}

export default Homepage