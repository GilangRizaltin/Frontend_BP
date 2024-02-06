import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    PERSIST,
    FLUSH,
    REHYDRATE,
    PAUSE,
    REGISTER,
    PURGE,
  } from "redux-persist";

const persistConfig = {
    key: "bintang_pelajar",
    storage,
};

const combinedReducers = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
            },
        }),
});

export const persistedStore = persistStore(store)