import React from "react";

import { Button } from "@mui/material";

export const ButtonComp = ({ title, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};
