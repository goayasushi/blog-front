import { useSuspenseQuery } from "@tanstack/react-query";

import { Category } from "../types/category";
import { client } from "../libs/client";

const fetchCategories = async () => {
  const res = await client.get({ endpoint: "categories" });
  return res.contents;
};

export const useCategories = () => {
  return useSuspenseQuery<Array<Category>>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
