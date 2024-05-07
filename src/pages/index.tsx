import { fetchBikes, fetchBikesCount } from "@/api/bikes";
import PaginationControlled from "@/components/Pagination/ControlledPagination";
import { Bike } from "@/types";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import BikeComponent from "@/components/Bike/Bike";
import SearchInput from "@/components/Search/SearchInput";

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
  const query = router.query.query || "";

  const { isLoading, isError } = useQuery(
    ["bikes", { page, query }],
    () =>
      fetchBikes({
        location: "munich",
        distance: "10",
        page: typeof page === "string" ? page : page[0],
        per_page: "10",
        stolenness: "proximity",
        query: typeof query === "string" ? query : query[0],
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
          flexDirection: "column",
          height: "100vh",
          gap: 2,
        }}
      >
        <Typography variant="h5" color="text.primary">
          No Results Found
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            router.push({
              pathname: router.pathname,
              query: { ...router.query, query: "" },
            })
          }
        >
          Head to Homepage
        </Button>
      </Box>
    );
  }

  if (isError) {
  }

  return (
    <>
      <SearchInput />
      <Grid container rowSpacing={5}>
        {data.map((record, idx) => (
          <Grid item xs={4}>
            <BikeComponent key={idx} bike={record} />
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
    const searchQuery = query.query?.toString() || "";
    const initialBikesData = await fetchBikes({
      location: "munich",
      distance: "10",
      page: typeof page === "string" ? page : page[0],
      per_page: "10",
      stolenness: "proximity",
      query: typeof searchQuery === "string" ? searchQuery : searchQuery[0],
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
