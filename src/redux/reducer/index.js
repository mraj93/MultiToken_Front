// import address from "./address";
// import balance from "./balance";
// import { combineReducers } from 'redux'
//
//  const rootReducers = combineReducers({
//      address,
//      balance
// })
//
// export default rootReducers;

import { combineReducers } from 'redux';
import address from './address'; // Adjust the path as needed
import balance from './balance'; // Adjust the path as needed

const rootReducer = combineReducers({
    address: address,
    balance: balance,
    // ...other reducers if you have more
});

export default rootReducer;
