import { Fragment, useContext, useEffect } from "react";
import insertCredentials from "../hooks/insertCredentials"
import "../Login.css";
import "../../common/css/CommonCSS.css";
import User from "../../common/context/User";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Theme from "../../common/context/Theme";
import useApi from "../../common/hooks/useApi";
import { login } from "../../actions/actionTypes";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

const Login = () => {

    const credentials = insertCredentials();

    const ERROR_EMPTY = "Campo requerido";

    const {signIn, setSignIn, userName, setUserName} = useContext(User);

    const history = useHistory();

    const {theme, setTheme} = useContext(Theme);

    const request = useApi("/login", "", {}, false);

    const dispatch = useDispatch();

    let token;

    if(request.data != null){
        token = request.data.token;
    }

    useEffect(() => {
        if(request.data != null){
            console.log("dispatch");
            setSignIn(true);
            setUserName(request.data.username);

            localStorage.setItem("signIn", true);
            localStorage.setItem("userName", request.data.username);
            localStorage.setItem("token", request.data.token);

            dispatch(login({userName: request.data.username, isLogged: true, token: request.data.token}));

            history.push("/");
        }
    }, [request.data]);

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
    <section className={theme ? "body-dark" : "body"}>
        <div className="row rowForm">
            <h1>Identificación</h1>
        </div>
        <form onSubmit={onSubmit}>
            <div className="row rowForm">
                <div className="col20">
                    <span >Usuario: </span>
                </div>
                <div className="col80">
                    <input id="user" type="text" className={theme ? "input-text-dark" : "input"} onChange={credentials.updateUserName} maxlength="60"></input>
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
                    <input id="password" type="password" className={theme ? "input-text-dark" : "input"} onChange={credentials.updatePassword} maxlength="60"></input>
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
                    <button className={theme ? "button-dark" : "button-light"} type="submit">Identificarse</button>
            </div>
        </form>
    </section>
    );

}

export default Login;