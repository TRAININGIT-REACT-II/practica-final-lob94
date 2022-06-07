import { useState } from "react";

const insertCredentials = () => {

    const [userName, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 

    const [userNameError, setUserNameError] = useState({
        isError : false,
        message : ""
    }); 
    const [passwordError, setPasswordError] = useState({
        isError : false,
        message : ""
    });  

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
        userNameError: userNameError,
        passwordError: passwordError,
        updateUserName,
        updatePassword,
        setUserNameError,
        setPasswordError
    }

}

export default insertCredentials;