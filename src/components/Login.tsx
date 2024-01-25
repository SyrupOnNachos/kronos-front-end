import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { useLoginMutation } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h4">Kronos</Typography>
          <Typography variant="subtitle1">The time saver</Typography>
        </Box>
        {/* Horizontal Line seperating the text from the login */}
        <hr />

        <Typography variant="h4">Login</Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              // TODO: fix type="submit" so that it waits for token before refresh
              //   type="submit"
              fullWidth
              onClick={() => {
                login({ username: username, password: password })
                  .unwrap()
                  .then((res) => {
                    localStorage.setItem("token", res.token), navigate("/home");
                  })
                  // TODO: Add snackbar/ incorrect password management
                  .catch((err) => console.log(err));
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
