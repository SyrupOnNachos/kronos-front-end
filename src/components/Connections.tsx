import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Skeleton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useGetConnectionsQuery, useDeleteConnectionMutation } from "../api";
import { Add, Remove } from "@mui/icons-material";

const Connections = () => {
  const { data: connections, isLoading, refetch } = useGetConnectionsQuery();
  const [deleteConnection] = useDeleteConnectionMutation();

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const SCOPE =
    "user-modify-playback-state user-read-playback-state playlist-read-private user-read-private";
  const SPOTIFY_BASE_URL = "https://accounts.spotify.com/authorize";
  const connectUrl = `${SPOTIFY_BASE_URL}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${BASE_URL}callbacks/spotify&response_type=code&scope=${SCOPE}&state=${token}`;

  const rows: string[] = ["Spotify"] || [];

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">Tags</Typography>
          <Typography variant="body1">
            Connect your account to other services to enable more features
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <TableCell>
                  <Typography color="white" variant="h6">
                    Connection Name
                  </Typography>
                </TableCell>
                <TableCell width="175px">
                  <Typography color="white" variant="h6">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? // #region Skeleton
                  Array.from(new Array(3)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ))
                : // #endregion
                  rows.map((row, index) => {
                    const connection = connections?.find(
                      (connection) => connection.service === row
                    );

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography>{row}</Typography>
                        </TableCell>
                        {connection ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                deleteConnection(connection.id)
                                  .unwrap()
                                  .then(() => refetch());
                              }}
                            >
                              <Remove sx={{ mr: 1 }} />
                              Disconnect
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                window.open(connectUrl, "_blank"),
                                  setTimeout(() => refetch(), 2500);
                              }}
                            >
                              <Add sx={{ mr: 1 }} />
                              Connect
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Connections;
