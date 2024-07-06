import { FC, memo, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Article } from "../../types/article";
import { client } from "../../libs/client";
import { ArticleList } from "../organisms/article/ArticleList";
import { Breadcrumbs } from "../molecules/Breadcrumbs";

const fetchArticles = async () => {
  const res = await client.get({ endpoint: "blogs" });
  return res.contents;
};

export const Articles: FC = memo(() => {
  const {
    data: articles,
    isLoading,
    error,
  } = useSuspenseQuery<Array<Article>>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  return (
    <Box px={{ base: 4, md: 10 }}>
      <Box mb={4}>
        <Breadcrumbs />
      </Box>
      <ArticleList articles={articles} baseColumns={1} mdColumns={2} />
    </Box>
  );
});
