import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const BASE_URL = process.env.BASE_URL || "";

interface PortolioState {
    portfolio: any;
    isModalOpen: boolean;
    selectedCoin: any;
    selectedPortfolioCoins: any[];
}

const initialState: PortolioState = {
    portfolio: null,
    isModalOpen: false,
    selectedCoin: null,
    selectedPortfolioCoins: [],
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
        },
        setSelectedPortfolioCoins: (state, action: PayloadAction<any>) => {
            state.selectedPortfolioCoins = action.payload;
        },
    },
});
export const { setPortfolio, openModal, closeModal, selectCoin, setSelectedPortfolioCoins, } = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
