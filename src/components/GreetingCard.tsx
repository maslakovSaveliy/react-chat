import { Box, Button, Paper, Slide, Typography } from "@mui/material";
import { height } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

type Props = {};

const GreetingCard = (props: Props) => {
  const navigate = useNavigate();
  const { handleOpenAddPost } = useContext(Context);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Slide direction="right" in={true}>
        <Box maxWidth="60%">
          <Typography variant="h2" marginBottom="10px">
            Hello, friend!
          </Typography>
          <Typography variant="h4">
            This is my first social network. Here is the place where you can
            chating with friends and sharing your news with other people
          </Typography>
        </Box>
      </Slide>
      <Slide direction="left" in={true}>
        <Box alignSelf="flex-end">
          <Typography variant="h4">How are you?</Typography>
          <Button
            onClick={() => {
              navigate("/profile");
              handleOpenAddPost();
            }}
          >
            Share it!
          </Button>
        </Box>
      </Slide>
    </Box>
  );
};

export default GreetingCard;
