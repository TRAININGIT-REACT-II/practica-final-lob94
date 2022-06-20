const actions = ["LOGIN", "SIGNOUT"];

const actionTypes = {};
actions.forEach(action => {
    actionTypes[action] = action;
})

export default actionTypes;