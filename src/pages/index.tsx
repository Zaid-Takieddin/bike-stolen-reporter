import { fetchBikes, fetchBikesCount } from "@/api/bikes";
import PaginationControlled from "@/components/Pagination/ControlledPagination";
import { Bike } from "@/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Home({
  bikesData,
  bikesCount,
}: {
  bikesData: Bike[];
  bikesCount: number;
}) {
  const [data, setData] = useState(bikesData);
  console.log("data", data);
  const router = useRouter();
  const page = router.query.page || "1";

  const { isLoading, data: newBikesData } = useQuery(
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
      onSuccess: () => {
        setData(newBikesData);
      },
    }
  );

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <PaginationControlled count={bikesCount} />
    </>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const page = query.page?.toString() || "1";

  const bikesCount = await fetchBikesCount({
    location: "munich",
    distance: "10",
    stolenness: "proximity",
  });

  const bikesData = await fetchBikes({
    location: "munich",
    distance: "10",
    page: typeof page === "string" ? page : page[0],
    per_page: "10",
    stolenness: "proximity",
  });

  return { props: { bikesData, bikesCount } };
}) satisfies GetServerSideProps<{ bikesData: Bike[]; bikesCount: number }>;
