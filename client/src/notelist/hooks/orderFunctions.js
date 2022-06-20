import { useContext, useEffect, useState } from "react";
import ORDER from "../../utils/ORDER";
import ORDER_DIRECTION from "../../utils/ORDER_DIRECTION";
import OrderBy from "../context/OrderBy";

const orderFunctions = () => {

    const {order, setOrder, orderDirection, setOrderDirection} = useContext(OrderBy);

    let lis = [{key: 1, title: "titulo", author: "yo", creationDate: "13/06/2022", updateDate: "13/06/2022"},
    {key: 2, title: "titulo1", author: "yo2", creationDate: "13/06/2022", updateDate: "13/06/2022"},
    {key: 3, title: "titulo2", author: "yo3", creationDate: "12/06/2022", updateDate: "14/06/2022"},
    {key: 4, title: "titulo3", author: "yo4", creationDate: "11/06/2022", updateDate: "15/06/2022"}];

    const [list, setList] = useState(lis);

    const orderAlphabeticAsc = (a, b) => {
        if(a.title < b.title){
            return -1;
        }
        if(a.title > b.title){
            return 1;
        }
        return 0;
    };

    const orderAlphabeticDesc = (a, b) => {
        if(a.title > b.title){
            return -1;
        }
        if(a.title < b.title){
            return 1;
        }
        return 0;
    };

    const orderCreationDateAsc = (a, b) => {
        if(a.creationDate < b.creationDate){
            return -1;
        }
        if(a.creationDate > b.creationDate){
            return 1;
        }
        return 0;
    };

    const orderCreationDateDesc = (a, b) => {
        if(a.creationDate > b.creationDate){
            return -1;
        }
        if(a.creationDate < b.creationDate){
            return 1;
        }
        return 0;
    };

    const orderUpdateDateAsc = (a, b) => {
        if(a.updateDate < b.updateDate){
            return -1;
        }
        if(a.updateDate > b.updateDate){
            return 1;
        }
        return 0;
    };

    const orderUpdateDateDesc = (a, b) => {
        if(a.updateDate > b.updateDate){
            return -1;
        }
        if(a.updateDate < b.updateDate){
            return 1;
        }
        return 0;
    };

    const getFunction = (order, orderDirection) => {
        let orderFunction = () => {};
        switch(order){
            case ORDER.Alphabetic : 
                switch(orderDirection){
                    case ORDER_DIRECTION.Asc: orderFunction =  orderAlphabeticAsc; break;
                    case ORDER_DIRECTION.Desc: orderFunction = orderAlphabeticDesc; break;
                    default: orderFunction = orderAlphabeticAsc;};
                break;
            case ORDER.CreationDate: 
                switch(orderDirection){
                    case ORDER_DIRECTION.Asc: orderFunction =  orderCreationDateAsc; break;
                    case ORDER_DIRECTION.Desc: orderFunction = orderCreationDateDesc; break;
                    default: return orderCreationDateAsc;};
                break;
            case ORDER.UpdateDate: 
                switch(orderDirection){
                    case ORDER_DIRECTION.Asc: orderFunction =  orderUpdateDateAsc; break;
                    case ORDER_DIRECTION.Desc: orderFunction = orderUpdateDateDesc; break;
                    default: return orderUpdateDateAsc;};
                break;
            default:
                orderFunction = orderAlphabeticAsc; break
        }
        return orderFunction;
    };

    useEffect(() => {
        let listAux = [];
        list.map((item) => {
            listAux.push(item);
        })
        setList(listAux.sort(getFunction(order, orderDirection)));
        
    }, [order, orderDirection]);

    return {
        list: list
    };

}

export default orderFunctions;