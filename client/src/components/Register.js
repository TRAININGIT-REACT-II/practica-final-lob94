import { useEffect } from "react";
import insertCredentials from "../hooks/insertCredentials"
import "./Login.css";
import "./CommonCSS.css";

const Register = () => {

    const credentials = insertCredentials();

    const submit = () => {
        console.log(credentials.userName);

        console.log(credentials.password);
    }

    return(
    <section className="body-dark">
        <h1>Registro de usuario</h1>
        <div className="row">
            <div className="col20">
                <span >Usuario: </span>
            </div>
            <div className="col80">
                <input id="user" type="text" className="input-text-dark" onChange={credentials.updateUserName}></input>
            </div>
        </div>
        <div className="row">
            <div className="col20">
                <span >Contraseña: </span>
            </div>
            <div className="col80">
                <input id="password" type="password" className="input-text-dark" onChange={credentials.updatePassword}></input>
            </div>
        </div>
        <div className="row">
            <div >
                <button type="submit" onClick={submit} className="button-dark">Registrarse</button>
            </div>
        </div>
    </section>
    );

}

export default Register;