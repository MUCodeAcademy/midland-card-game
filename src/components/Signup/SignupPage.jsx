import * as React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Alert, FormHelperText } from "@mui/material";
import useAxios from "../../shared/hooks/useAxios";

const theme = createTheme();

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState(false);
  const [verifyAge, setVerifyAge] = useState(false);
  const { json, error: resError, apiCall } = useAxios("post");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1f2f53" }}>
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error && (username.length < 4 || username.length > 20)}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  helperText="Username must be between 4 and 20 characters in length"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={error && (password.length < 8 || password.length > 20)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Password must be between 8 and 20 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={error && password !== verifyPassword}
                  name="verifypassword"
                  label="Verify Password"
                  type="password"
                  id="verifypassword"
                  autoComplete="verify-new-password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  helperText="These 2 passwords must match"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="verifyAge"
                      color="primary"
                      onChange={() => setVerifyAge(true)}
                    />
                  }
                  label="I do declare that I am 21 years of age or older"
                />
                <FormHelperText error={error}>
                  This box must be checked
                </FormHelperText>
                <div className="error-container">
                  {resError && <Alert severity="error">{resError}</Alert>}
                  {json && json.data && (
                    <Alert severity="success">{json.data}</Alert>
                  )}
                </div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: "10px",
                mb: 2,
                bgcolor: "#1f2f53",
                "&:hover": {
                  background: "#1f2f53ab",
                },
              }}
              onClick={() => {
                if (
                  username.length < 4 ||
                  password.length < 8 ||
                  password !== verifyPassword ||
                  !verifyAge
                ) {
                  setError(true);
                  return;
                }

                apiCall("/api/users/signup", { username, password });
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink
                  to="/login"
                  variant="body2"
                  style={{ color: "#1f2f53", paddingBottom: "70px" }}
                >
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
