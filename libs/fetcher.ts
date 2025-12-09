import axios from "axios";

// Generic fetcher for any type
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await axios.get<T>(url);
  return res.data;
};

export default fetcher;
