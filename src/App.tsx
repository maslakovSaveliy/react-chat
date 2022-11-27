import React, { useRef, useState } from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import { useObserver } from "./hooks/useObserver";
import { Context } from "./context/Context";
function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const firstElement = useRef<HTMLDivElement>(null);
  const [toTopBtn, setToTopBtn] = useState(false);
  useObserver(setToTopBtn, firstElement);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Context.Provider value={{ open, handleClose, handleOpen }}>
      <BrowserRouter>
        <div ref={firstElement}></div>
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
            <ScrollToTop visible={toTopBtn} setVisible={setToTopBtn} />
          </>
        )}
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
