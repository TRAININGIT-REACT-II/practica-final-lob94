import { Fragment, useState } from "react";
import { useEffect } from "react";

const Home = ()  => {

    const [theme, setTheme] = useState(false);

    const changeTheme = () => {
        setTheme(!theme);
    }

    useEffect(() => {
        console.log(theme);
    })


    return (
        <>
            <span>Main view</span>
        </>

    );
}

export default Home