import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const BASE_URL = process.env.BASE_URL || "";

interface PortolioState {
    portfolio: any;
    isModalOpen: boolean;
    selectedCoin: any;
    selectedPortfolioCoins: any[];
    isLoading: boolean;
}

const initialState: PortolioState = {
    isLoading: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(getPortfolioDetailsAsync.pending, (state) => {
                state.selectedPortfolioCoins = []
                state.isLoading = true;
                console.log("Get Portfolio Details is pending...");
            })
            .addCase(getPortfolioDetailsAsync.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;

                console.log("Received Portfolio Details");
                state.selectedPortfolioCoins = action.payload.result
            })

            .addCase(addTransactionAsync.pending, () => {
                console.log("Adding is pending...");
            })
            .addCase(addTransactionAsync.fulfilled, (state, action: PayloadAction<any>) => {
                console.log("Transaction added");
            })

            .addCase(deleteTransactionAsync.pending, (state) => {
                state.isLoading = true;
                console.log("Deleting is pending...");
            })
            .addCase(deleteTransactionAsync.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                console.log("Transaction deleted");
                state.selectedPortfolioCoins = state.selectedPortfolioCoins.map((coin) => {
                    if (coin.id === action.payload.portfolioCoinsId) {
                        coin.transactions = coin.transactions.filter((tx) => tx.id !== action.payload.id)
                    }
                    return coin;
                })
            })
            .addCase(deleteCoinAsync.pending, (state) => {
                state.isLoading = true;
                console.log("Deleting is pending...");
            })
            .addCase(deleteCoinAsync.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                console.log("Transaction deleted");
                state.selectedPortfolioCoins = state.selectedPortfolioCoins.filter((coin) => coin.id !== action.payload.id)
            });
    }
});
export const getPortfolioDetailsAsync = createAsyncThunk("portfolio/getPortfolioDetailsAsync", async (id) => {
    const response = await fetch(`${BASE_URL}/api/portfolio/details?id=${id}`);
    const data = await response.json();
    return data;
});

export const addTransactionAsync = createAsyncThunk(
    "portfolio/addTransactionAsync",
    async (body) => {
        const response = await fetch(`${BASE_URL}/api/transaction`, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteTransactionAsync = createAsyncThunk(
    "portfolio/deleteTransactionAsync",
    async (id: string) => {
        const response = await fetch(`${BASE_URL}/api/transaction/`, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteCoinAsync = createAsyncThunk(
    "portfolio/deleteCoinAsync",
    async (id: string) => {
        const response = await fetch(`${BASE_URL}/api/coin/`, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        return data;
    }
)

export const { setPortfolio, openModal, closeModal, selectCoin, setSelectedPortfolioCoins, } = PortfolioSlice.actions;

export default PortfolioSlice.reducer;
