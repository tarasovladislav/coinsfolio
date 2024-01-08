import React from "react";

type Props = {
  isLoading: boolean;
};
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ isLoading }: Props) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingSpinner;
