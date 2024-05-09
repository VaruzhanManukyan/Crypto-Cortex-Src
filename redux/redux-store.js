import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import {thunk} from "redux-thunk";

import encryptionReducer from "./encryption-reducer";
import decryptionReducer from "./decryption-reducer";

const reducers = combineReducers({
    encryption: encryptionReducer,
    description: decryptionReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;