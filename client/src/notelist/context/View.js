import { createContext } from "react";
import THEMES from "../../utils/THEMES";

const View = createContext({
    View: false,
    setView : () => {}
})

export default View;