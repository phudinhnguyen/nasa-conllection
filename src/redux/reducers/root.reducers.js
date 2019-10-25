import {combineReducers} from "redux";
import collection from './collection.reducer';
import checkModal from './checkModal.reducer'
import itemSelected from './itemSelected.reducer'

const rootReducer = combineReducers({    
    collection,
    checkModal,
    itemSelected
});
export default rootReducer;