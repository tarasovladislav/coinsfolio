import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = process.env.BASE_URL || "";

interface PortolioState {
    portfolio: any;
    isModalOpen: boolean;
    selectedCoin: any;
}

const initialState: PortolioState = {
    portfolio: null,
    isModalOpen: false,
    selectedCoin: null,
};

const PortfolioSlice = createSlice({
    name: "Portfolio",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        setPortfolio: (state, action: PayloadAction<any>) => {
            state.portfolio = action.payload;
        },
        selectCoin: (state, action: PayloadAction<any>) => {
            state.selectedCoin = action.payload;
        }
    },
});
export const { setPortfolio, openModal, closeModal, selectCoin } = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
