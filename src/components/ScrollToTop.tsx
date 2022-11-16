import React, { FC } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Paper } from "@mui/material";
interface Props {
  visible: boolean;
}
const ScrollToTop: FC<Props> = ({ visible }) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box
      onClick={scrollToTop}
      sx={{ position: "fixed", bottom: "23px", right: "23px" }}
    >
      <Fade in={visible}>
        <Paper
          sx={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <ArrowUpwardIcon />
        </Paper>
      </Fade>
    </Box>
  );
};
export default ScrollToTop;
