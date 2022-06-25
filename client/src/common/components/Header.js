import { Fragment, useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import "../css/CommonCSS.css";
import User from '../context/User';
import ThemeToggle from './ThemeToggle';
import { login, logout } from "../../actions/actionTypes";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/exports";

const Header = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state);

    const signOut = () => {

        localStorage.setItem("signIn", false);
        localStorage.setItem("userName", "");
        localStorage.setItem("token", "");

        dispatch(logout());
    }

    const dummy = (e) => {
        e.preventDefault();
    }

    return(
        <ul>
            <li>
                <NavLink to="/" className="nav-link">Notes</NavLink>
            </li>
            {user.isLogged ? 
            <li>
                <NavLink to="/home" className="nav-link">Home</NavLink>
            </li> :
            <Fragment/>
            }
            
            {user.isLogged ?
                <Fragment>
                    <li className='nav-right'>
                        <div className='nav-right'>
                            <NavLink to="/" className={"nav-link"} onClick={signOut}>Salir</NavLink>
                        </div>
                    </li>
                    <li className='nav-right'>
                        <div className='nav-right'>
                            <NavLink to="/" className="nav-link otro" onClick={dummy}>¡Hola {user.userName}!</NavLink>
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