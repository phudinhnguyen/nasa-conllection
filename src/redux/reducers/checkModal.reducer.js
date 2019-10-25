const initialState = false;

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return action.payload       
        default:
            return state
    }
}

export default modalReducer;

