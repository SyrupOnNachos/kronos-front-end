import { useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "../components/Home.tsx";
import Tags from "../components/Tags.tsx";
import CreateAccount from "../components/CreateAccount.tsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import Connections from "../components/Connections.tsx";
import Login from "../components/Login.tsx";
import { Logout } from "@mui/icons-material";
import { useLogoutMutation } from "../api.ts";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout] = useLogoutMutation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !['/login', '/create-account'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname, token]);

  return (
    <>
      {!['/login', '/create-account'].includes(location.pathname) && (
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/tags">
              Tags
            </Button>
            <Button color="inherit" component={Link} to="/connections">
              Connections
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              color="inherit"
              onClick={() =>
                logout({ token: localStorage.getItem("token") || "" })
                  .unwrap()
                  .then(() => localStorage.removeItem("token"))
              }
              sx={{ mr: 2 }}
            >
              <Tooltip title="Logout" placement="bottom">
                <Logout />
              </Tooltip>
            </IconButton>
            <Stack alignItems="center">
              <Typography variant="h6">Kronos</Typography>
              <Typography variant="subtitle2">Time Saver</Typography>
            </Stack>
          </Toolbar>
        </AppBar>
      )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </>
  );
};
