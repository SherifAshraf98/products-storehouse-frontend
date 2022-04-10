import { Box, CircularProgress } from "@mui/material";

// Circular progress to be shown whenever we load any data
// positioned at the center of the page
export const Loader = () => {
  return (
    <Box
      height="100vh"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
    </Box>
  );
};
