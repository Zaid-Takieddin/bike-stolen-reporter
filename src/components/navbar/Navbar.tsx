import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import React from "react";

type ElevationScrollProps = {
  children: React.ReactElement;
};

type Props = {};

function ElevationScroll({ children }: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = (props: Props) => {
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Image
              width={50}
              height={50}
              src={"/favicon.ico"}
              alt="Bike Index"
              style={{ borderRadius: 5, marginRight: 25 }}
            />
            <Typography variant="h6" component="div">
              Stolen Bikes Reporter
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default Navbar;
