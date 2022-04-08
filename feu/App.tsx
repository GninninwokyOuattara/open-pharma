import * as React from "react";

import { StatusBar } from "expo-status-bar";

import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";

import Main from "./Main";

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
            <StatusBar style="auto" />

            <Main />
        </Provider>
    );
}
