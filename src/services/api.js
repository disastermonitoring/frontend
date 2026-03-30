export const getFloodData = async () => {
  const res = await fetch("http://127.0.0.1:8001/analyze");
  return res.json();
};