import { createContext } from "react";
import THEMES from "../utils/THEMES";

const Theme = createContext({
    theme: THEMES.light,
    setTheme : () => {}
})

export default Theme;