const makeQuery = (query: Record<string, any>) => {
  const queryString = new URLSearchParams();
  for (const key in query) {
    queryString.append(key, query[key] || "");
  }
  return "?" + queryString.toString();
};
export default makeQuery;
