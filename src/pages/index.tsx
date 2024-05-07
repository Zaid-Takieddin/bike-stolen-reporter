import { fetchBikes, fetchBikesCount } from "@/api/bikes";
import PaginationControlled from "@/components/Pagination/ControlledPagination";
import { Bike } from "@/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({
  bikesData,
  bikesCount,
}: {
  bikesData: Bike[];
  bikesCount: number;
}) {
  console.log("bikesCount", bikesCount);
  const [data, setData] = useState(bikesData);
  const router = useRouter();
  const page = router.query.page || "1";

  useEffect(() => {
    const fetchData = async () => {
      const newBikesData = await fetchBikes({
        location: "munich",
        distance: "10",
        page: typeof page === "string" ? page : page[0],
        per_page: "10",
        stolenness: "proximity",
      });

      setData(newBikesData);
    };

    if (page !== "1") {
      fetchData();
    }
  }, [page]);

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
