import client from "./axiosClient";

export const loginUser = async (username: string, password: string) => {
  const res = await client.post("/auth/login", { username, password });
  return res.data;
};
