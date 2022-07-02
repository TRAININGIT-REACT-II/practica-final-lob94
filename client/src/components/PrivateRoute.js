import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux/es/exports";

const PrivateRoute = ({children, ...others}) => {

    const user = useSelector( (state)  => state);

    return <Route {...others} render={() => {
        if(user.isLogged){
            return children;
        }else{
            return <Redirect to="/login"/>;
        }
    }}/>;

}

export default PrivateRoute;