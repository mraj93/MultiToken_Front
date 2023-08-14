import { applyMiddleware, legacy_createStore as createStore } from "redux"
import rootReducers from "./reducer"

const store = createStore(rootReducers, {},
    // applyMiddleware(thunk)
);


export default store;