import actionTypes  from '../actions/actionTypes';

const initialState = {
    userName : "",
    isLogged : false,
    token : ""
};

const userReducer = ((state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN : 
            return {
                userName : action.user.userName,
                isLogged : true,
                token : action.user.token
            };
        case actionTypes.LOGOUT :
            return {
                userName : "",
                isLogged : false,
                token : ""
            };
        default : 
            return state;
    }
});

export default userReducer;