"use client";
import React, { useState } from "react";
import { Typography, Input, Button } from "@mui/material";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, addPortfolioAsync } from "@/src/state/slices/PortfolioListSlice";
import { AppDispatch, RootState } from "@/src/state/store";

type Props = {};

const AddPortfolio = (props: Props) => {
  const { isModalOpen } = useSelector((state: RootState) => state.PortfolioList);
  const dispatch = useDispatch<AppDispatch>();

  const [portfolioName, setPortfolioName] = useState("");

  return (
    <Modal open={isModalOpen} onCancel={() => dispatch(closeModal())} footer={null}>
      {/* <Box sx={style}> */}
      <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
        Add new Portfolio
      </Typography>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Portfolio Name"
          onChange={(event) => {
            setPortfolioName(event.target.value);
          }}
          autoFocus={true}
        />
        <Button
          variant="contained"
          className="self-center bg-black"
          onClick={() => {
            if (portfolioName === "") return;
            dispatch(addPortfolioAsync(portfolioName));
            setPortfolioName("");
            dispatch(closeModal());
          }}
        >
          Add Portfolio
        </Button>
      </div>
      {/* </Box> */}
    </Modal>
  );
};

export default AddPortfolio;
