import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  return (
    <BrowserRouter>
      {loading ? (
        <Container>
          <Grid
            container
            style={{ height: window.innerHeight - 50 }}
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <CircularProgress />
          </Grid>
        </Container>
      ) : (
        <>
          {user && <Navbar />}
          <AppRouter />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
