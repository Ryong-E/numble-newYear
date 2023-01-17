function getSearchParam(key) {
  return new URLSearchParams(location.search).get(key);
}
export default getSearchParam;
