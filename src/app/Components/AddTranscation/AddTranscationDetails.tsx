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
import dayjs from "dayjs";
import { TimePicker, DatePicker } from "antd";
type Props = {};

const AddTranscationDetails = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCoin, portfolio } = useSelector((state: RootState) => state.Portfolio);
  const [transcationType, setTranscationType] = useState("Buy");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalSpend, setTotalSpend] = useState("");
  const [notes, setNotes] = useState("");
  const [dateTime, setDateTime] = useState(dayjs());
  const disabledHours = () => {
    const hours = [];
    if (isToday(date)) {
      const currentHour = dayjs().hour();
      for (let i = currentHour + 1; i <= 24; i++) hours.push(i);
    }
    return hours;
  };

  const disabledMinutes = (selectedHour: number) => {
    const minutes = [];
    if (isToday(date)) {
      const currentMinute = dayjs().minute();
      if (selectedHour === dayjs().hour()) {
        for (let i = currentMinute; i <= 60; i++) minutes.push(i);
      }
    }
    return minutes;
  };

  const isToday = (date: dayjs.Dayjs) => {
    return date.isSame(dayjs(), "day");
  };

  useEffect(() => {
    setDateTime(
      date.set("hour", time.hour()).set("minute", time.minute()).set("second", time.second())
    );
    handleChange();
  }, [selectedCoin, date, time]);

  const handleChange = async () => {
    if (!selectedCoin) return;
    try {
      const response = await fetch(`/api/coinprice`, {
        method: "POST",
        body: JSON.stringify({
          coin: selectedCoin.id,
          date: dateTime,
        }),
      });
      const data = await response.json();
      setPrice(data.prices[data.prices.length - 1][1]);
    } catch (error) {}
  };

  useEffect(() => {
    if (!price || !quantity) return;
    const total = parseFloat(price) * parseFloat(quantity);
    setTotalSpend(total.toFixed(2).toString());
  }, [price, quantity]);

  const handleAddTranscation = async () => {
    try {
      dispatch(closeModal());
      const bodyObj = {
        portfolioId: portfolio.id,
        coinId: selectedCoin.id,
        coinName: selectedCoin.name,
        coinSymbol: selectedCoin.symbol,
        transactionType: transcationType,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        dateTime: dateTime,
        notes: notes,
      };
      const response = await fetch(`/api/transaction`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h5" component="h2" className="text-center mb-2">
        {selectedCoin.name}
      </Typography>
      <ButtonGroup variant="outlined" className="flex align-center justify-center mb-4">
        <Button
          onClick={() => {
            setTranscationType("Buy");
          }}
          className="w-1/5"
          style={{
            backgroundColor: transcationType === "Buy" ? "#343434" : "",
            color: transcationType === "Buy" ? "#fff" : "",
          }}
        >
          Buy
        </Button>
        <Button
          className="w-1/5"
          style={{
            backgroundColor: transcationType === "Sell" ? "#343434" : "",
            color: transcationType === "Sell" ? "#fff" : "",
          }}
          onClick={() => {
            setTranscationType("Sell");
          }}
        >
          Sell
        </Button>
      </ButtonGroup>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-3">
          <TextField
            label="Quantity"
            variant="outlined"
            value={quantity}
            className="flex-grow"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            label="Price per Coin"
            variant="outlined"
            value={price}
            className="flex-grow "
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-stretch gap-3">
          <DatePicker
            value={date}
            disabledDate={(current) => {
              return current && current > dayjs().endOf("day");
            }}
            className="flex-grow w-1/2"
            style={{
              height: "3rem",
            }}
            popupStyle={{
              zIndex: 9999,
            }}
            onSelect={(value) => setDate(value)}
          />
          <TimePicker
            value={time}
            onSelect={(value) => {
              setTime(value);
            }}
            className="flex-grow w-1/2"
            defaultValue={dayjs(time, "HH:mm")}
            format={"HH:mm"}
            minuteStep={15}
            popupStyle={{
              zIndex: 9999,
            }}
            disabledHours={disabledHours}
            disabledMinutes={disabledMinutes}
          />
        </div>
        <TextField
          label="Notes"
          variant="outlined"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        Total Spend: ${totalSpend || 0}
        <Button variant="contained" className="self-center bg-black" onClick={handleAddTranscation}>
          Add Transcation
        </Button>
      </div>
    </>
  );
};

export default AddTranscationDetails;
