import { useContext, useEffect } from "react";
import insertCredentials from "../hooks/insertCredentials"
import "./Login.css";
import "./CommonCSS.css";
import User from "../context/User";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {

    const credentials = insertCredentials();

    const {signIn, setSignIn, userName, setUserName} = useContext(User);

    const history = useHistory();

    const submit = () => {

        setSignIn(true);
        setUserName(credentials.userName);

        localStorage.setItem("signIn", true);
        localStorage.setItem("userName", credentials.userName);

        history.push("/");
    };

    useEffect(() => {
        console.log(userName);   
    }, [signIn]);

    return(
    <section className="body">
        <h1>Identificación</h1>
        <div className="row">
            <div className="col20">
                <span >Usuario: </span>
            </div>
            <div className="col80">
                <input id="user" type="text" className="input" onChange={credentials.updateUserName}></input>
            </div>
        </div>
        <div className="row">
            <div className="col20">
                <span >Contraseña: </span>
            </div>
            <div className="col80">
                <input id="password" type="password" className="input" onChange={credentials.updatePassword}></input>
            </div>
        </div>

        <span>¿No tienes usuario? </span>
        <Link to="/signup">Registrate</Link>

        <div className="row">
                <button className="button-light" type="submit" onClick={submit}>Identificarse</button>
        </div>
    </section>
    );

}

export default Login;