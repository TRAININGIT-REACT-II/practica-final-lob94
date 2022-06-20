import { useContext } from "react";
import { useEffect } from "react";
import THEMES from "../../utils/THEMES";
import '../css/CommonCSS.css';
import Theme from "../context/Theme";

const ThemeToggle = ()  => {

    const {theme, setTheme} = useContext(Theme);

    const changeTheme = () => {
        setTheme(theme === THEMES.light ? 1 : 0);
    };
    
    return (
        <>
            <span role="img" aria-label="sun">☀️</span>
            <label className="switch">
                <input type="checkbox" onClick={changeTheme}></input>
                <span className="slider"></span>
            </label>
            <span role="img" aria-label="moon">🌙</span>
        </>

    );
}

export default ThemeToggle