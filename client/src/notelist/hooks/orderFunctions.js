import { useContext, useEffect, useState } from "react";
import ORDER from "../../utils/ORDER";
import ORDER_DIRECTION from "../../utils/ORDER_DIRECTION";
import OrderBy from "../context/OrderBy";

const orderFunctions = (list, setList) => {

    const {order, setOrder, orderDirection, setOrderDirection} = useContext(OrderBy);

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
        if(a.createdAt < b.createdAt){
            return -1;
        }
        if(a.createdAt > b.createdAt){
            return 1;
        }
        return 0;
    };

    const orderCreationDateDesc = (a, b) => {
        if(a.createdAt > b.createdAt){
            return -1;
        }
        if(a.createdAt < b.createdAt){
            return 1;
        }
        return 0;
    };

    const orderUpdateDateAsc = (a, b) => {
        if(a.updatedAt < b.updatedAt){
            return -1;
        }
        if(a.updatedAt > b.updatedAt){
            return 1;
        }
        return 0;
    };

    const orderUpdateDateDesc = (a, b) => {
        if(a.updatedAt > b.updatedAt){
            return -1;
        }
        if(a.updatedAt < b.updatedAt){
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

}

export default orderFunctions;