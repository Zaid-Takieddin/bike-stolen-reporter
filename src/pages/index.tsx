import { fetchBikes, fetchBikesCount } from "@/api/bikes";
import PaginationControlled from "@/components/Pagination/ControlledPagination";
import { Bike } from "@/types";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import BikeComponent from "@/components/Bike/Bike";

export default function Home({
  bikesData,
  bikesCount,
}: {
  bikesData: Bike[];
  bikesCount: number;
}) {
  const [data, setData] = useState<Bike[]>(bikesData || []);
  const router = useRouter();
  const page = router.query.page || "1";

  const { isLoading, isError } = useQuery(
    ["bikes", { page }],
    () =>
      fetchBikes({
        location: "munich",
        distance: "10",
        page: typeof page === "string" ? page : page[0],
        per_page: "10",
        stolenness: "proximity",
      }),
    {
      onSuccess: (newData) => {
        if (newData) setData(newData.bikes);
      },
    }
  );

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />;
      </Box>
    );

  if (data.length === 0 || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="text.primary">
          No Results Found
        </Typography>
      </Box>
    );
  }

  if (isError) {
  }

  return (
    <>
      <Grid container rowSpacing={5} marginTop={2}>
        {data.map((record) => (
          <Grid item xs={4}>
            <BikeComponent bike={record} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginY: 2,
        }}
      >
        <PaginationControlled count={bikesCount} />
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  bikesData: Bike[];
  bikesCount: number;
}> = async ({ query, res }) => {
  try {
    const page = query.page?.toString() || "1";
    const initialBikesData = await fetchBikes({
      location: "munich",
      distance: "10",
      page: typeof page === "string" ? page : page[0],
      per_page: "10",
      stolenness: "proximity",
    });

    const bikesData = initialBikesData.bikes;
    const bikesCount = await fetchBikesCount({
      location: "munich",
      distance: "10",
      stolenness: "proximity",
    });

    return { props: { bikesData, bikesCount } };
  } catch (error) {
    console.error("Error fetching bikes:", error);

    res.statusCode = 500;

    res.setHeader("Location", "/500");
    return { props: { bikesData: [], bikesCount: 0 } };
  }
};
