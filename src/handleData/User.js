import { collection, doc, getDoc, getDocs, setDoc, query, where, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function getUser(email) {
    const usersRef = collection(db, 'users');
    // const docRef = doc(db, 'users', userName);
    const userQuery = query(usersRef, where('email', '==', email));
    const queryResult = await getDocs(userQuery);
    const formattedData = queryResult.docs.map(doc => doc.data());
    return formattedData[0];
    // const data = await getDocs(userQuery);
    // console.log(data);
}

export async function checkUserExists(userName) {
    const docExists = doc(db, 'users', userName);
    const getD = await getDoc(docExists);
    if (getD.exists()) {
        console.log("document exists");
        return false
    }
    console.log("No such document!");
    return true
}

export async function setUser(userName, email, name) {
    const usersRef = collection(db, 'users');
    const docRef = doc(usersRef, userName);
    await setDoc(docRef, {
        email: email,
        name: name,
        userName: userName,
        profileImg: "",
    });
}

export async function uploadImg(folderName, file, fileName) {
    console.log("storage called");
    const storageRef = ref(storage, folderName + '/' + fileName);
    const result = await uploadBytes(storageRef, file)

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    console.log("storage done");
    return downloadURL;
}



export async function updateDetails(userName, url, newName) {
    console.log(url);
    const userRef = doc(db, 'users', userName);
    await updateDoc(userRef, {
        name: newName,
        profileImg: url
    })
    console.log("URL ADDED");

}