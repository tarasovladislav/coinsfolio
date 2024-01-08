import { configureStore } from "@reduxjs/toolkit";
import PortofolioListReducer from "./slices/PortfolioListSlice";
import PortfolioReducer from "./slices/PortfolioSlice";
export const store = configureStore({
  reducer: {
    PortfolioList: PortofolioListReducer,
    Portfolio: PortfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
