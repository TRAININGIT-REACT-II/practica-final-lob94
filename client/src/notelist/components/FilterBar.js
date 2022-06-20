import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Theme from "../../common/context/Theme";
import OrderBy from "../context/OrderBy";
import View from "../context/View";
import '../css/NoteList.css';


const FilterBar = () => {

    const {view, setView} = useContext(View);

    const history = useHistory();

    const {theme, setTheme} = useContext(Theme);

    const {order, setOrder, orderDirection, setOrderDirection} = useContext(OrderBy);

    const changeView = () => {
        setView(!view);
    }

    const changeOrder = (e) => {
        e.preventDefault();
        const {value} = e.target;
        setOrder(value);
    }

    const changeOrderDirection = (e) => {
        e.preventDefault();
        const {value} = e.target;
        setOrderDirection(value);
    }

    const createNote = () => {
        history.push("/create-note");
    }

    return (
        <div className="row">
            <span>Ordenar por: </span>
            <select name="orderBy" id="orderBy" onChange={changeOrder} defaultValue={order} className={theme ? "selectOrder-dark" : "selectOrder"}>
                <option value="0">A-Z</option>
                <option value="1">Fecha creación</option>
                <option value="2">Fecha última modificación</option>
            </select>
            <select name="orderDirection" id="orderDirection" onChange={changeOrderDirection} defaultValue={orderDirection} className={theme ? "selectOrder-dark" : "selectOrder"}>
                <option value="0">Ascendente</option>
                <option value="1">Descendente</option>
            </select>
            <button onClick={changeView} className={theme ? "buttonView-dark" : "buttonView-light"}>Cambiar vista</button>

            <button onClick={createNote} className={theme ? "buttonView-dark right " : "buttonView-light right " }>Crear nota</button>
        </div>
    )

}

export default FilterBar;