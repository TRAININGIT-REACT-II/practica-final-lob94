import { createContext } from "react";
import THEMES from "../../utils/THEMES";

const Modify = createContext({
    isModify: false,
    setIsModify : () => {}
})

export default Modify;