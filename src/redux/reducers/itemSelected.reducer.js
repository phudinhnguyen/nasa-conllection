const initialState = {};

const itemSelectedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECTE_ITEM":
            return action.payload       
        default:
            return state
    }
}

export default itemSelectedReducer;

