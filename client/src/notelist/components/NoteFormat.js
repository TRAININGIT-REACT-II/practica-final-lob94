import { useContext } from "react";
import Theme from "../../common/context/Theme";
import orderFunctions from "../hooks/orderFunctions";
import NotePreview from "./NotePreview";

const NoteFormat = (props)  => {

    const {noteList, setNotes} = props;

    orderFunctions(noteList, (lis) => setNotes(lis));

    const {theme, setTheme} = useContext(Theme);

    return(
        <div>
            <ul className={theme ? "rowListNote-dark" : "rowListNote"}>
                {noteList.map((item, index) => {
                    return <NotePreview object={item} indexKey={index} key={index}/>
                })}
            </ul>
        </div>
    );
}

export default NoteFormat;