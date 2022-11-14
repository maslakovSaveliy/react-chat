import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../utils/root-grid.css";
type Props = {};

const Profile = (props: Props) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const posts = [
    { title: "1", describe: "vsavvsa" },
    { title: "1", describe: "vsavvsa" },
    { title: "1", describe: "vsavvsa" },
    { title: "1", describe: "vsavvsa" },
  ];
  console.log(window.innerWidth);
  return (
    <Container>
      <Grid
        id="root__grid"
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="top"
        justifyContent="space-around"
        padding="0.3cm"
      >
        <Grid id="child_grid" width="27.5%">
          <Paper sx={{ width: "100%", height: "100%", padding: "0.2cm" }}>
            <Grid container flexDirection="column" alignItems="center">
              <Box width="100%" marginBottom="0.2cm">
                <Avatar
                  sx={{ width: "100%", height: "100%" }}
                  src={user?.photoURL?.toString()}
                  alt="user_avatar"
                />
              </Box>
              <Typography variant="h4">
                Nickname: {user?.displayName}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid className="child_grid" width="67.5%">
          <Paper sx={{ width: "100%", padding: "0.2cm" }}>
            <Grid container flexDirection="column">
              <Typography variant="h2">Posts:</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
