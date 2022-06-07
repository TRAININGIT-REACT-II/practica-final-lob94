
import insertCredentials from "../hooks/insertCredentials"
import "../Login.css";
import "../../common/css/CommonCSS.css";
import { Link } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import User from "../../common/context/User";
import { useHistory } from "react-router-dom";

const Register = () => {

    const ERROR_PASSWORD_CHECK = "La contraseña no coincide";
    const ERROR_EMPTY = "Campo requerido";

    const credentials = insertCredentials();

    const [passwordcheck, setPasswordCheck] = useState("");

    const [passwordCheckError, setPasswordCheckError] = useState({
        isError : false,
        message : ""
    });  

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
    }

    const clearErrors = () => {
        credentials.setUserNameError({
            isError : false,
            message : ""
        });
        credentials.setPasswordError({
            isError : false,
            message : ""
        });
        setPasswordCheckError({
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

        if(!passwordcheck && passwordcheck.trim().length === 0){
            setPasswordCheckError({
                isError : true,
                message : ERROR_EMPTY
            });
            errorForm = true;
        }

        if(credentials.password.trim() !== passwordcheck.trim()){
            setPasswordCheckError({
                isError : true,
                message : ERROR_PASSWORD_CHECK
            });
            errorForm = true;
        }
        return errorForm;
    }

    return(
    <section className="body-dark">
        <div className="row rowForm">
            <h1>Registro de usuario</h1>
        </div>
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div className="col20">
                    <span >Usuario: </span>
                </div>
                <div className="col80">
                    <input id="user" type="text" className="input-text-dark" onChange={credentials.updateUserName}></input>
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
                    <input id="password" type="password" className="input-text-dark" onChange={credentials.updatePassword}></input>
                </div>
                {credentials.passwordError.isError ?
                    <span className="formError">{credentials.passwordError.message}</span>
                    : <Fragment/>
                }
            </div>

            <div className="row rowForm">
                <div className="col20">
                    <span >Repetir contraseña: </span>
                </div>
                <div className="col80">
                    <input id="password2" type="password" className="input-text-dark" onChange={setPasswordCheck}></input>
                </div>
                {passwordCheckError.isError ?
                    <span className="formError">{passwordCheckError.message}</span>
                    : <Fragment/>
                }
            </div>

            <div className="row rowForm">
                <span>¿Ya tienes cuenta? </span>
                <Link to="/login">Identificate</Link>
            </div>

            <div className="row">
                <div >
                    <button type="submit" className="button-dark">Registrarse</button>
                </div>
            </div>
        </form>
    </section>
    );

}

export default Register;