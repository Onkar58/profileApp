import React, { useEffect, useRef, useState } from 'react'
import classes from './Profile.module.css'
import dummyImg from '../../assets/dummyImg.jpeg'
import { updateUser } from '../../apis/user.api'
import { toBase64 } from '../../utils/functions'

const Profile = ({ user }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editingMode, setEditingMode] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [newName, setNewName] = useState()

  const [formContent, setFormContent] = useState({})

  const inputRef = useRef(null)


  useEffect(() => {
    setNewName(user?.name || "")
    setProfileImg(user?.profilePic || dummyImg)
    setFormContent({ userName: user?.userName })
  }, [user])


  const selectFile = (event) => {
    if (!event.target.files[0]) return
    if (event.target.files[0].size > 1024 * 256) {
      alert("File size should be less than 256KB")
      return
    }
    setProfileImg(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])
  }
  const uploadFile = async () => {
    if (!file && newName === user?.name) {
      setLoading(false)
      setEditingMode(false)
      console.log("Returned from here");
      return
    }
    setLoading(true)
    setEditingMode(false)
    try {
      const fileBinary = await toBase64(file) || null
      if (newName !== user?.name) {
        formContent.name = newName
      }
      if (file) {
        formContent.file = fileBinary
      }
      console.log(formContent);
      const updateDetails = await updateUser(formContent)
      if (updateDetails?.status !== 200 && updateDetails?.status !== 201) {
        alert("Something went wrong")
      }
    }
    catch (error) {
      alert("Something went wrong")
      setProfileImg(user?.profilePic || dummyImg)
    }
    setLoading(false)
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div className={classes.main}>
      <div className={classes.imgDiv}>
        {!loading && <img src={profileImg} style={{ opacity: editingMode ? .5 : 1, }} alt='Profile' />}
        {loading && <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" stroke="none">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
          </path>
        </svg>}
        <input type='file' onChange={selectFile} ref={inputRef} />
        {editingMode && <button className={classes.uploadBtn} onClick={() => inputRef.current.click()}>Upload Img</button>}
        {/* <label htmlFor='file' className={classes.uploadBtn}>Upload</label> */}
        {/* <button onClick={uploadFile}>Done</button> */}
      </div>
      {!editingMode &&
        <div className={classes.info}>
          <h1>{newName || user?.name}</h1>
          <h3>{user?.userName}</h3>
          {/* <div className={classes.tags}>
          {tags.map((current) => "#" + current + ", ")}
        </div> */}
          {!editingMode && <button className={classes.btn} onClick={() => setEditingMode(true)}>Edit</button>}
        </div>
      }
      {editingMode &&
        <div className={classes.info}>
          <input type="text" className={classes.inp} onChange={updateName} value={newName} />
          <input type="text" className={classes.inp} value={user?.userName} disabled={true} />
        </div>
      }
      {editingMode && <button className={classes.btn} onClick={uploadFile}>Done</button>}
    </div>
  )
}

export default Profile
