import axios from "axios";

export const getResultFromApi = (keyWord, callBack) => {

    axios.get(`https://images-api.nasa.gov/search?q=${keyWord}`)
        .then( data => {
            callBack(data.data.collection.items);
        })
        .catch( err => {})
}

export const toggleModal = (check) => {
    return{
        type: "TOGGLE_MODAL",
        payload: check,
    }
}

export const setCollection = (collection) => {
    return{
        type: "SET_COLLECTION",
        payload: collection,
    }
}

export const selecteItem = (collection) => {
    return{
        type: "SELECTE_ITEM",
        payload: collection,
    }
}