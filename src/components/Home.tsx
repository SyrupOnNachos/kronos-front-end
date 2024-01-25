import { Typography, Box, Paper } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h4">Welcome to Kronos</Typography>
        <Typography variant="subtitle1">The time saver</Typography>
      </Paper>
    </Box>
  );
};

export default Home;
