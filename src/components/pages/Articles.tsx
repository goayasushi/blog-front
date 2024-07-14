import { FC, memo } from "react";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
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
  const { data: articles } = useSuspenseQuery<Array<Article>>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  return (
    <Box px={{ base: 4, md: 10 }}>
      <Box mb={4}>
        <Breadcrumbs />
      </Box>
      {articles.length === 0 ? (
        <Alert status="warning">
          <AlertIcon />
          {process.env.REACT_APP_NO_ARTICLE_MESSAGE}
        </Alert>
      ) : (
        <ArticleList articles={articles} baseColumns={1} mdColumns={2} />
      )}
    </Box>
  );
});
