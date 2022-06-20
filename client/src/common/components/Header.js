import { Fragment, useContext } from 'react';
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import "../css/CommonCSS.css";
import User from '../context/User';
import ThemeToggle from './ThemeToggle';

const Header = () => {

    const {signIn, setSignIn, userName, setUserName} = useContext(User);

    const signOut = () => {
        setSignIn(false);
        setUserName("");

        localStorage.setItem("signIn", false);
        localStorage.setItem("userName", "");
    }

    const dummy = (e) => {
        e.preventDefault();
    }

    return(
        <ul>
            <li>
                <NavLink to="/" className="nav-link">Notes</NavLink>
            </li>
            {signIn ? 
            <li>
                <NavLink to="/home" className="nav-link">Home</NavLink>
            </li> :
            <Fragment/>
            }
            
            {signIn ?
                <Fragment>
                    <li className='nav-right'>
                        <div className='nav-right'>
                            <NavLink to="/" className={"nav-link"} onClick={signOut}>Salir</NavLink>
                        </div>
                    </li>
                    <li className='nav-right'>
                        <div className='nav-right'>
                            <NavLink to="/" className="nav-link otro" onClick={dummy}>¡Hola {userName}!</NavLink>
                        </div>
                    </li>
                </Fragment> :
                <li className='nav-right'>
                    <div className='nav-right'>
                        <NavLink to="/login" className="nav-link">Identificarse</NavLink>
                    </div>
                </li>
            }
            <li className='nav-right'>
                <div className='nav-right vertical-center'>
                    <ThemeToggle/>
                </div>
            </li>
        </ul>
    )
};
export default Header;