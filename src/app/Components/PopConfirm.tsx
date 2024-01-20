import React, { useState } from "react";
import { Button, Popconfirm } from "antd";

interface PopConfirmProps {
  title: string;
  description: string;
  onConfirm: () => void; // Custom API deletion function
  rest?: any;
  children?: React.ReactNode; // Add children prop
}

const PopConfirm: React.FC<PopConfirmProps> = ({
  title,
  description,
  onConfirm,
  rest,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    // Call the custom API deletion function
    onConfirm();
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
      {...rest}
      onClick={() => {
        setOpen(!open);
      }}
    >
      {children}
    </Popconfirm>
  );
};

export default PopConfirm;
