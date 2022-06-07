import { Fragment, useContext, useEffect } from "react";
import insertCredentials from "../hooks/insertCredentials"
import "../Login.css";
import "../../common/css/CommonCSS.css";
import User from "../../common/context/User";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {

    const credentials = insertCredentials();

    const ERROR_EMPTY = "Campo requerido";

    const {signIn, setSignIn, userName, setUserName} = useContext(User);

    const history = useHistory();

    const onSubmit = (e) => {

        e.preventDefault();
        clearErrors();

        if(!checkSignup()){
            setSignIn(true);
            setUserName(credentials.userName);

            localStorage.setItem("signIn", true);
            localStorage.setItem("userName", credentials.userName);

            history.push("/");
        }
    };

    const clearErrors = () => {
        credentials.setUserNameError({
            isError : false,
            message : ""
        });
        credentials.setPasswordError({
            isError : false,
            message : ""
        });
    }

    const checkSignup = () => {

        let errorForm = false;

        if(!credentials.userName && credentials.userName.trim().length === 0){
            credentials.setUserNameError({
                isError : true,
                message : ERROR_EMPTY
            });
            errorForm = true;
        }

        if(!credentials.password && credentials.password.trim().length === 0){
            credentials.setPasswordError({
                isError : true,
                message : ERROR_EMPTY
            });
            errorForm = true;
        }

        return errorForm;
    }

    return(
    <section className="body">
        <div className="row rowForm">
            <h1>Identificación</h1>
        </div>
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div className="col20">
                    <span >Usuario: </span>
                </div>
                <div className="col80">
                    <input id="user" type="text" className="input" onChange={credentials.updateUserName}></input>
                </div>
                {credentials.userNameError.isError ?
                    <span className="formError">{credentials.userNameError.message}</span>
                    : <Fragment/>
                }
            </div>
            <div className="row rowForm">
                <div className="col20">
                    <span >Contraseña: </span>
                </div>
                <div className="col80">
                    <input id="password" type="password" className="input" onChange={credentials.updatePassword}></input>
                </div>
                {credentials.passwordError.isError ?
                    <span className="formError">{credentials.passwordError.message}</span>
                    : <Fragment/>
                }
            </div>

            <div className="row rowForm">
                <span>¿No tienes usuario? </span>
                <Link to="/signup">Registrate</Link>
            </div>

            <div className="row">
                    <button className="button-light" type="submit">Identificarse</button>
            </div>
        </form>
    </section>
    );

}

export default Login;