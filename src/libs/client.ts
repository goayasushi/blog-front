import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "yowaken",
  apiKey: process.env.REACT_APP_API_KEY || "",
});
