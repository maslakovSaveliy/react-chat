import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Grid } from "@mui/material";
import GreetingCard from "../components/GreetingCard";
type Props = {};

const Home = (props: Props) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Grid id="root__grid" container alignItems="top" padding="0.3cm">
        <GreetingCard />
      </Grid>
    </Container>
  );
};

export default Home;
