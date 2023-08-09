export const getApiUrl = (endpoint) => {
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    return `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;
  }
  return endpoint;
}
