import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.BASE_URL || "";

interface PortolioListState {
  isModalOpen: boolean;
  portfolios: {
    name: string;
    id: string;
  }[];
  isLoading: boolean;
}

const initialState: PortolioListState = {
  isModalOpen: false,
  portfolios: [],
  isLoading: true,
};

const PortfolioListSlice = createSlice({
  name: "PortfolioSlice",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPortfolioAsync.pending, () => {
        console.log("Adding is pending...");
      })
      .addCase(addPortfolioAsync.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Portfolio added");
        console.log(action.payload);
        state.portfolios.push(action.payload);
      })

      .addCase(getPortfoliosAsync.pending, (state) => {
        state.isLoading = true;
        console.log("Fetching data...");
      })
      .addCase(getPortfoliosAsync.fulfilled, (state, action: any) => {
        console.log("Data Fetched from DB");
        state.portfolios = action.payload.portfolios || [];
        state.isLoading = false;
      })

      .addCase(deletePortfolioAsync.pending, () => {
        console.log("Deleting is pending...");
      })
      .addCase(deletePortfolioAsync.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Portfolio deleted");
        state.portfolios = state.portfolios.filter(
          (portfolio) => portfolio.id !== action.payload.id
        );
      });
  },
});

export const addPortfolioAsync = createAsyncThunk(
  "portfolio/addPortfolioAsync",
  async (name: string) => {
    const response = await fetch(`${BASE_URL}/api/portfolio`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  }
);
export const deletePortfolioAsync = createAsyncThunk(
  "portfolio/deletePortfolioAsync",
  async (id: string) => {
    const response = await fetch(`${BASE_URL}/api/portfolio`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  }
);

export const getPortfoliosAsync = createAsyncThunk("portfolio/getPortfolioAsync", async () => {
  const response = await fetch(`${BASE_URL}/api/portfolio`);
  const data = await response.json();
  return data;
});

export const { openModal, closeModal } = PortfolioListSlice.actions;

export default PortfolioListSlice.reducer;
