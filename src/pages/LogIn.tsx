import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
type Props = {};
interface FormValues {
  email: string;
  password: string;
  showPassword: boolean;
}
const Login = (props: Props) => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const auth = getAuth();
  const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const login = async () => {
    await signInWithEmailAndPassword(values.email, values.password);
  };
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {loadingEmail || loadingGoogle ? (
          <CircularProgress />
        ) : (
          <>
            <Box component="form">
              <Grid container alignItems="center" direction="column">
                <TextField
                  sx={{ width: "30ch" }}
                  id="outlined-email-required"
                  label="Email"
                  value={values.email}
                  onChange={handleChange("email")}
                />
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button sx={{ mb: 1 }} variant="contained" onClick={login}>
                  Login
                </Button>
                {errorEmail && (
                  <Alert severity="error">{errorEmail?.message}</Alert>
                )}
              </Grid>
            </Box>
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              onClick={async () => await signInWithGoogle()}
            >
              <GoogleIcon />
            </Button>
            <Link to="/signup">
              <Button variant="text">or SignUp</Button>
            </Link>
          </>
        )}
      </Grid>
    </Container>
  );
};
export default Login;
