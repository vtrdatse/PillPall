import React, { useState } from "react";

const useDialog = () => {
  const [open, setOpen] = useState(false);

  return {
    isShow: open,
    toggleDialog: () => setOpen(!open),
  };
};

export default useDialog;
