import React, { Dispatch, FC, SetStateAction } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Paper, Zoom } from "@mui/material";
interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}
const ScrollToTop: FC<Props> = ({ visible, setVisible }) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Zoom in={visible}>
      <Box
        onClick={() => {
          scrollToTop();
          setVisible(false);
        }}
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
    </Zoom>
  );
};
export default ScrollToTop;
