import { useState } from "react";

const insertCredentials = () => {

    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 

    const updateUserName = (e) => {
        const {value} = e.target;
        setUserName(value);
    }

    const updatePassword = (e) => {
        const {value} = e.target;
        setPassword(value);
    }

    return {
        userName: userName,
        password: password,
        updateUserName,
        updatePassword
    }

}

export default insertCredentials;