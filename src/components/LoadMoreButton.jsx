// Button component to load more movie results

import React from "react";
import { Button } from "@mui/material";

// Calls `onClick` handler passed via props when clicked
const LoadMoreButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ mt: 3 }}
    >
      Load More
    </Button>
  );
};

export default LoadMoreButton;
