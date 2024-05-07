import { Bike } from "@/types";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { format } from "date-fns";
import React from "react";

type Props = {
  bike: Bike;
};

const Bike = ({ bike }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={bike.serial}
        height="240"
        image={bike.large_img ?? "/favicon.ico"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bike.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bike.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 1,
          }}
        >
          <Typography variant="caption" color={"red"}>
            Location Stolen:{" "}
            {
              <Typography
                component="span"
                variant="caption"
                color="text.primary"
              >
                {bike.stolen_location}
              </Typography>
            }
          </Typography>
          <Typography variant="caption" color={"red"}>
            Stolen At:{" "}
            {
              <Typography
                component="span"
                variant="caption"
                color="text.primary"
              >
                {format(new Date(bike.date_stolen * 1000), "yyyy-MM-dd HH:mm")}
              </Typography>
            }
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Bike;
