import React, { useRef, useState } from 'react'
import classes from './Profile.module.css'
import dummyImg from '../../assets/dummyImg.jpeg'
import { updateDetails, uploadImg } from '../../handleData/User'

const Profile = ({ user }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editingMode, setEditingMode] = useState(false)
  const [profileImg, setProfileImg] = useState(user.profileImg ? user.profileImg : dummyImg)
  const [newName, setNewName] = useState(user.name)
  const inputRef = useRef(null)
  const selectFile = (event) => {
    console.log("File Selected")
    setProfileImg(event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : profileImg)
    setFile(event.target.files[0])
    console.log(file);
  }
  const uploadFile = async () => {
    console.log(file);
    setLoading(true)
    setEditingMode(false)
    if (!file){
      setLoading(false)
      return

    }
    const fileName = user.userName + "_profilePic" + file.name.slice(file.name.lastIndexOf("."))
    console.log("File is ", file);
    console.log("called");
    console.log(profileImg);
    const fileURL = await uploadImg("profilePics", file, fileName)
    console.log(fileURL);
    const abc = await updateDetails(user.userName, fileURL, newName)
    console.log("ended");
    // window.location.reload()
    setLoading(false)
  }

  const updateName = (event) => {
    console.log("Name Changed");
    setNewName(event.target.value)
  }

  return (
    <div className={classes.main}>
      <div className={classes.imgDiv}>
        {!loading && <img src={profileImg} style={{opacity: editingMode ? .5 : 1,}} alt='Profile' />}
        {loading && <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" stroke="none">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
          </path>
        </svg>}
        <input type='file'  onChange={selectFile} ref={inputRef} />
        {editingMode && <button className={classes.uploadBtn} onClick={() => inputRef.current.click()}>Upload Img</button>}
        {/* <label htmlFor='file' className={classes.uploadBtn}>Upload</label> */}
        {/* <button onClick={uploadFile}>Done</button> */}
      </div>
      {!editingMode &&
        <div className={classes.info}>
          <h1>{user.name}</h1>
          <h3>{user.userName}</h3>
          {/* <div className={classes.tags}>
          {tags.map((current) => "#" + current + ", ")}
        </div> */}
          {!editingMode && <button className={classes.btn} onClick={() => setEditingMode(true)}>Edit</button>}
        </div>
      }
      {editingMode &&
      <div className={classes.info}>
        <input type="text" className={classes.inp}  onChange={updateName} value={newName}/>
        <input type="text" className={classes.inp} value={user.userName} disabled={true}/>
      </div>
      }
      {editingMode && <button className={classes.btn} onClick={uploadFile}>Done</button>}
    </div>
  )
}

export default Profile