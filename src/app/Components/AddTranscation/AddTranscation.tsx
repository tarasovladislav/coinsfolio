"use client";
import React, { useState, useEffect, use } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch, RootState } from "@/src/state/store";
import CoinPicker from "./CoinPicker";
import AddTranscationDetails from "./AddTranscationDetails";

type Props = {};

const AddTranscation = (props: Props) => {
  const { isModalOpen, selectedCoin } = useSelector((state: RootState) => state.Portfolio);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal open={isModalOpen} onCancel={() => dispatch(closeModal())} footer={null}>
      {!selectedCoin ? <CoinPicker /> : <AddTranscationDetails />}
    </Modal>
  );
};

export default AddTranscation;
