import { useEffect } from "react";
import { useState } from "react";
import useApi from "../../common/hooks/useApi";
import ORDER from "../../utils/ORDER";
import ORDER_DIRECTION from "../../utils/ORDER_DIRECTION";
import OrderBy from "../context/OrderBy";
import View from "../context/View";
import FilterBar from "./FilterBar";
import ListFormat from "./ListFormat";
import NoteFormat from "./NoteFormat";
import { useSelector } from "react-redux/es/exports";

const MyHome = ()  => {

    const [view, setView] = useState(false);

    const [order, setOrder] = useState(ORDER.Alphabetic);

    const [notes, setNotes] = useState([]);

    const [orderDirection, setOrderDirection] = useState(ORDER_DIRECTION.Asc);

    const request = useApi("/notes", "", {}, false);

    const user = useSelector((state) => state);

    useEffect(() => {
        request.updateParams({
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Api-Token": user.token
            }
        });
        request.perform();
    }, []);

    useEffect(() => {
        if(request.data != null){
            setNotes(request.data);
        }
    }, [request.data]);


    return (
        <>
            <View.Provider value={{view, setView}}>
                <OrderBy.Provider value={{order, setOrder, orderDirection, setOrderDirection}}>
                    <FilterBar />
                    {view ?
                        <NoteFormat noteList={notes} setNotes={setNotes}/>
                        : <ListFormat noteList={notes} setNotes={setNotes}/>

                    }
                </OrderBy.Provider>
            </View.Provider>
            
        </>

    );
}

export default MyHome;