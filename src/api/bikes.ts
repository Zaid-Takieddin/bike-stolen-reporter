export const fetchBikes = async (
  URLSearchParamsObject: Record<string, string>
) => {
  const initialData = await fetch(
    "https://bikeindex.org:443/api/v3/search?" +
      new URLSearchParams(URLSearchParamsObject)
  ).then((res) => res.json());

  return initialData;
};

export const fetchBikesCount = async (
  URLSearchParamsObject: Record<string, string>
) => {
  const initialData = await fetch(
    "https://bikeindex.org:443/api/v3/search/count?" +
      new URLSearchParams(URLSearchParamsObject)
  ).then((res) => res.json());

  return initialData.proximity;
};
