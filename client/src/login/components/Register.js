
import insertCredentials from "../hooks/insertCredentials"
import "../Login.css";
import "../../common/css/CommonCSS.css";
import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import User from "../../common/context/User";
import { useHistory } from "react-router-dom";
import Theme from "../../common/context/Theme";
import useApi from "../../common/hooks/useApi";
import ApiError from "../../common/components/ApiError";

const Register = () => {

    const ERROR_PASSWORD_CHECK = "La contraseña no coincide";
    const ERROR_EMPTY = "Campo requerido";

    const credentials = insertCredentials();

    const [passwordcheck, setPasswordCheck] = useState("");

    const [passwordCheckError, setPasswordCheckError] = useState({
        isError : false,
        message : ""
    });  

    const [apiError, setApiError] = useState(false);

    const {signIn, setSignIn, userName, setUserName} = useContext(User);

    const history = useHistory();

    const request = useApi("/register", "", {}, false);

    let token;

    if(request.data != null){
        token = request.data.token;
    }

    const onSubmit = (e) => {

        e.preventDefault();
        clearErrors();

        if(!checkSignup()){
            request.updateParams({
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({
                    username: credentials.userName.trim(),
                    password: credentials.password.trim(),

                })
            });
            request.perform();
        }
    }

    useEffect(() => {
        if(request.data != null){
            console.log(request.data);
            setSignIn(true);
            setUserName(request.data.username);

            localStorage.setItem("signIn", true);
            localStorage.setItem("userName", request.data.username);
            localStorage.setItem("token", request.data.token);
            history.push("/");
        }
    }, [request.data]);

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

        console.log(credentials.password, passwordcheck);
        return errorForm;
    }

    const {theme, setTheme} = useContext(Theme);

    const updatePasswordCheck = (e) => {
        const {value} = e.target;
        setPasswordCheck(value);
    };

    useEffect(() => {
        if(request.error != null){
            setApiError(true);
        }
    }, [request.error]);

    return(
    <section className={theme ? "body-dark" : "body"}>
        <div className="row rowForm">
            <h1>Registro de usuario</h1>
        </div>
        <ApiError apiError={apiError} error={request.error}/>
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div className="col20">
                    <span >Usuario: </span>
                </div>
                <div className="col80">
                    <input id="user" type="text" className={theme ? "input-text-dark" : "input"} onChange={credentials.updateUserName} maxLength="60"></input>
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
                    <input id="password" type="password" className={theme ? "input-text-dark" : "input"} onChange={credentials.updatePassword} maxLength="60"></input>
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
                    <input id="password2" type="password" className={theme ? "input-text-dark" : "input"} onChange={updatePasswordCheck} maxLength="60"></input>
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
                    <button type="submit" className={theme ? "button-dark" : "button-light"}>Registrarse</button>
                </div>
            </div>
        </form>
    </section>
    );

}

export default Register;