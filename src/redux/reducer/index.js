import address from "./handle";
import balance from "./balance";
import { combineReducers } from 'redux'

 const rootReducers = combineReducers({
     address,
     balance
})

export default rootReducers;