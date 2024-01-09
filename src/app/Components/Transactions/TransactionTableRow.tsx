import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { BsTrash3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteTransactionAsync } from "@/src/state/slices/PortfolioSlice";
import { AppDispatch } from "@/src/state/store";
type Props = {
  tx: any;
};
import dayjs from "dayjs";
const TransactionTableRow = ({ tx }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const formattedDateTime = dayjs(tx.dateTime).format("MMM DD, YYYY, HH:MM");

  const handleDelete = async () => {
    dispatch(deleteTransactionAsync(tx.id));
  };

  return (
    <>
      <TableRow
        key={tx.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        // onClick={() => {
        //   console.log("clicked");
        // }}
      >
        <TableCell component="th" scope="row" className="flex flex-col">
          <span className="font-semibold">{tx.type}</span>
          <span className="text-gray-500"> {formattedDateTime}</span>
        </TableCell>
        <TableCell align="right">${tx.price}</TableCell>
        <TableCell align="right">{tx.quantity}</TableCell>
        <TableCell
          align="right"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="flex justify-end">
            <BsTrash3
              onClick={() => {
                handleDelete();
              }}
            />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TransactionTableRow;
