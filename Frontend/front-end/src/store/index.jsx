import { configureStore } from "@reduxjs/toolkit";
import contactUsReducer from "./reducers/contactUs.Reducer";
import uiReducer from "./reducers/ui.Reducer";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    contactUs: contactUsReducer,
  },
});

export default store;
