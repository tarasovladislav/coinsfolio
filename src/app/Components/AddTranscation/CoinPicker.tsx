import React, { useState, useEffect, use } from "react";
import { Typography, TextField } from "@mui/material";
import CoinSearchResults from "./CoinSearchResults";
type Props = {};

const CoinPicker = (props: Props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await fetch(`/api/searchcoins?query=${query}`, {});
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
        Select Coin
      </Typography>
      <div className="flex flex-col gap-4">
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && <CoinSearchResults results={searchResults} />}
      </div>
    </>
  );
};

export default CoinPicker;
