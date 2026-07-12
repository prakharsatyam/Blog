import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import blogReducer from './blogSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        blog : blogReducer,
    }
});


export default store;