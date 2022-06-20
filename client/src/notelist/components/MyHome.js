import { useState } from "react";
import ORDER from "../../utils/ORDER";
import ORDER_DIRECTION from "../../utils/ORDER_DIRECTION";
import OrderBy from "../context/OrderBy";
import View from "../context/View";
import FilterBar from "./FilterBar";
import ListFormat from "./ListFormat";
import NoteFormat from "./NoteFormat";

const MyHome = ()  => {

    const [view, setView] = useState(false);

    const [order, setOrder] = useState(ORDER.Alphabetic);

    const [orderDirection, setOrderDirection] = useState(ORDER_DIRECTION.Asc);


    return (
        <>
            <View.Provider value={{view, setView}}>
                <OrderBy.Provider value={{order, setOrder, orderDirection, setOrderDirection}}>
                    <FilterBar/>
                    {view ?
                        <NoteFormat/>
                        : <ListFormat/>

                    }
                </OrderBy.Provider>
            </View.Provider>
            
        </>

    );
}

export default MyHome;