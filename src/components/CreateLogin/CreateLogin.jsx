import React, { useState } from 'react'
import classes from './CreateLogin.module.css'
import axios from 'axios'

const CreateLogin = () => {
    const [tagsString, setTagsString] = useState('')
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [tags, setTags] = useState([])

    const updateName = (e) => {
        setName(e.target.value)
    }
    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updateTags = (e) => {
        setTagsString(e.target.value)
    }

    const submitData = (e) => {
        e.preventDefault()
        console.log(tagsString);
        setTags(tagsString.split(","))
        axios.post(`https://profile-app-824ab-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`,
            {
                    'name': name,
                    'username': username,
                    'tags': tagsString
            }).then((response) =>{
                alert("Data added successfully")
                console.log(response);
            })
    }
    return (
        <div className={classes.main}>
            <form >
                <input name='name' placeholder='Name' onChange={updateName} />
                <input name='username' placeholder='Username' onChange={updateUsername} />
                <textarea id='textarea' onChange={updateTags} value={tagsString}></textarea>
                <button onClick={submitData} className={classes.btn}>Login</button>
                {tags.map((current) => "#" + current + ",")}
            </form>
        </div>
    )
    // const [textareaValue, setTextareaValue] = useState('');

    // const handleChange = (event) => {
    //   setTextareaValue(event.target.value);
    // };

    // return (
    //   <div>
    //     <textarea
    //       id="textarea"
    //       onChange={handleChange}
    //       value={textareaValue}
    //     />
    //     <p>The textarea value is: {textareaValue}</p>
    //   </div>
    // );
}

export default CreateLogin