import { Box, Typography } from "@mui/material";

const Custom500 = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h4" color="red">
        Oops something went wrong, Try again later.
      </Typography>
    </Box>
  );
};

export default Custom500;
