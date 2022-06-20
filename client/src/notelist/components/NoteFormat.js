import { useContext } from "react";
import Theme from "../../common/context/Theme";
import orderFunctions from "../hooks/orderFunctions";
import NotePreview from "./NotePreview";

const NoteFormat = ()  => {

    const {list} = orderFunctions();

    const {theme, setTheme} = useContext(Theme);

    return(
        <div>
            <ul className={theme ? "rowListNote-dark" : "rowListNote"}>
                {list.map((item) => {
                    return <NotePreview object={item} key={item.key}/>
                })}
            </ul>
        </div>
    );
}

export default NoteFormat;