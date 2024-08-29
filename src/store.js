import {createStore} from "redux";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// We recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore.
// Redux Toolkit is our recommended approach for writing Redux logic today, including store setup, reducers, data fetching, and more.
const store = createStore(persistedReducer);
// configureStore()

const persistor = persistStore(store);

export {store, persistor};