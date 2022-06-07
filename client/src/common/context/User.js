import { createContext } from "react";

const User = createContext({
    signIn: false,
    setSignIn : () => {},
    userName : "",
    setUserName : () => {}
})

export default User;