import actionTypes  from '../actions/actionTypes';

const initialState = {
    userName : "",
    isLogged : false,
    token : ""
};

const userReducer = ((state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN : 
        console.log("prueba " + action.user.userName + " " + action.user.token + " " + action.user.isLogged);
            return {
                userName : action.user.userName,
                isLogged : true,
                token : action.user.token
            };
        case actionTypes.LOGOUT :
            console.log("prueba  vacia ");
            return {
                userName : "",
                isLogged : false,
                token : ""
            };
        default : 
            console.log("prueba  default ");
            return state;
    }
});

export default userReducer;