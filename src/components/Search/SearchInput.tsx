import React, { useState, useEffect, useCallback } from "react";
import { TextField, Box } from "@mui/material";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";

const SearchInput = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const queryFromRouter = router.query.query;
    if (typeof queryFromRouter === "string") {
      setTitle(queryFromRouter);
    } else if (Array.isArray(queryFromRouter)) {
      setTitle(queryFromRouter[0]);
    }
  }, [router.isReady, router.query.query]);

  const debouncedSetQuery = useCallback(
    debounce((value) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, query: value },
        },
        undefined,
        { shallow: true }
      );
    }, 500),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    debouncedSetQuery(value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { marginY: 1, width: "25ch" },
      }}
    >
      <TextField
        value={title}
        onChange={handleChange}
        placeholder="Case title"
      />
    </Box>
  );
};

export default SearchInput;
