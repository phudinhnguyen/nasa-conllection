const initialState = []

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_COLLECTION":
            return action.payload            
        default:
            return state
    }
}

export default collectionReducer;

