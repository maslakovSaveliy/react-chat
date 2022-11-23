import { Box, Paper, Slide, Typography } from "@mui/material";
import { height } from "@mui/system";
import React from "react";

type Props = {};

const GreetingCard = (props: Props) => {
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
        </Box>
      </Slide>
    </Box>
  );
};

export default GreetingCard;
