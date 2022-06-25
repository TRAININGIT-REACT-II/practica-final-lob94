const actions = ["LOGIN", "LOGOUT"];

const actionTypes = {};
actions.forEach(action => {
    actionTypes[action] = action;
})

export const login = (user) => ({
    type : actionTypes.LOGIN,
    user
});

export const logout = () => ({
    type: actionTypes.LOGOUT
})

export default actionTypes;