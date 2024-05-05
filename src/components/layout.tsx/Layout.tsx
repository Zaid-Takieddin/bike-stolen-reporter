import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";
import React from "react";
import { Container } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Bike Index</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
