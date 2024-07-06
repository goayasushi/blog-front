import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Article } from "../../types/article";
import { client } from "../../libs/client";
import { Box } from "@chakra-ui/react";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { ArticleList } from "../organisms/article/ArticleList";

const fetchArticles = async (id: string | undefined) => {
  const res = await client.get({
    endpoint: "blogs",
    queries: { filters: `category[equals]${id}` },
  });
  return res.contents;
};

export const CategoryList: FC = memo(() => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data: articles } = useSuspenseQuery<Array<Article>>({
    queryKey: ["articles", id],
    queryFn: () => fetchArticles(id),
  });

  return (
    <Box px={{ base: 4, md: 10 }}>
      <Box mb={4}>
        <Breadcrumbs
          category={articles[0]?.category.name}
          categoryId={articles[0]?.category.id}
        />
      </Box>
      <ArticleList articles={articles} baseColumns={1} mdColumns={2} />
    </Box>
  );
});
