import actionTypes  from '../actions/actionTypes';

const initialState = {
    userName : "",
    isLogged : true,
    token : ""
};

const userReducer = ((state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGIN : 
            return {
                userName : action.userName,
                isLogged : true,
                token : action.token
            };
        case actionTypes.SIGNOUT :
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