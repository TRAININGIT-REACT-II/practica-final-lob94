import ListItemPreview from "./ListItemPreview";
import '../css/NoteList.css';
import orderFunctions from "../hooks/orderFunctions";
import { useContext } from "react";
import Theme from "../../common/context/Theme";

const ListFormat = ({noteList})  => {

    const {list} = orderFunctions();

    const {theme, setTheme} = useContext(Theme);

    return(
        <div className={theme ? "bodyList-dark" : "bodyList"}>
            <table className="tableList">
                <thead>
                    <tr>
                        <th className="tableHeader">Título</th>
                        <th className="tableHeader">Autor</th>
                        <th className="tableHeader">Fecha creación</th>
                        <th className="tableHeader">Última modificación</th>
                    </tr>
                </thead>
                <tbody>
                    {noteList.map((item, index) => {
                        return <ListItemPreview object={item} indexKey={index} key={index}/>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListFormat;