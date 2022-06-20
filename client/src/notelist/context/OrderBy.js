import { createContext } from "react";
import ORDER from "../../utils/ORDER";
import ORDER_DIRECTION from "../../utils/ORDER_DIRECTION";

const OrderBy = createContext({
    order: ORDER.Alphabetic,
    setOrder : () => {},
    orderDirection: ORDER_DIRECTION.Asc,
    setOrderDirection: () => {}
})

export default OrderBy;