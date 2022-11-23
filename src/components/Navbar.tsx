import {
  AppBar,
  Box,
  Button,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import BasicMenu from "./BasicMenu";
import { useLocation } from "react-router-dom";
import StickyTitle from "./StickyTitle";

type Props = {};

const Navbar = (props: Props) => {
  let location = useLocation();
  const [page, setPage] = useState("");
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const logout = () => {
    auth.signOut();
  };
  useEffect(() => {
    if (location.pathname == "/") {
      setPage("Home");
    }
    if (location.pathname == "/profile") {
      setPage("Profile");
    }
  }, [location]);
  return (
    <StickyTitle>
      <Slide direction="down" in={true}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              {user && <BasicMenu />}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {page}
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Slide>
    </StickyTitle>
  );
};

export default Navbar;
