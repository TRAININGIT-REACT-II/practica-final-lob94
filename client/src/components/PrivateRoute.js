import { useContext } from "react";
import { Route, Redirect } from "react-router-dom"
import User from "../context/User";

const PrivateRoute = ({children, ...others}) => {

    const {signIn} = useContext(User);

    return <Route {...others} render={() => {
        if(signIn){
            return children;
        }else{
            return <Redirect to="/login"/>;
        }
    }}/>;

}

export default PrivateRoute;