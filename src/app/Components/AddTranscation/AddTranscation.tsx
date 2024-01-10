"use client";
import React, { useState, useEffect, use } from "react";
import {
  Modal,
  Box,
  Typography,
  Input,
  Button,
  Autocomplete,
  TextField,
  List,
  ListItem,
  ButtonGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch, RootState } from "@/src/state/store";
import CoinSearchResults from "./CoinSearchResults";

import dayjs from "dayjs";
import { TimePicker, DatePicker } from "antd";
import CoinPicker from "./CoinPicker";
import AddTranscationDetails from "./AddTranscationDetails";

type Props = {};

const AddTranscation = (props: Props) => {
  const { isModalOpen, selectedCoin } = useSelector((state: RootState) => state.Portfolio);
  const dispatch = useDispatch<AppDispatch>();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isModalOpen} onClose={() => dispatch(closeModal())}>
      <Box sx={style}>{!selectedCoin ? <CoinPicker /> : <AddTranscationDetails />}</Box>
    </Modal>
  );
};

export default AddTranscation;
