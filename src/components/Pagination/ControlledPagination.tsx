import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Stack, Typography, Pagination } from "@mui/material";

const PaginationControlled = ({ count }: { count: number }) => {
  const PAGESIZE = 10;
  const router = useRouter();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const pageFromRouter = router.query.page;
    if (typeof pageFromRouter === "string") {
      setPage(parseInt(pageFromRouter, 10));
    } else if (Array.isArray(pageFromRouter)) {
      setPage(parseInt(pageFromRouter[0], 10));
    }
  }, [router.isReady, router.query.page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: value.toString() },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={Math.ceil(count / PAGESIZE)}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PaginationControlled;
