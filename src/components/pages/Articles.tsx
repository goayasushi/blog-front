import { FC, memo, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { Article } from "../../types/article";
import { client } from "../../libs/client";
import { ArticleList } from "../organisms/article/ArticleList";

export const Articles: FC = memo(() => {
  const [articles, setArticles] = useState<Array<Article>>([]);

  useEffect(() => {
    client
      .get({
        endpoint: "blogs",
      })
      .then((res) => {
        console.log(res.contents);
        setArticles(res.contents);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box px={{ base: 4, md: 10 }}>
      <Box mb={4}>
        <Text>記事一覧 &gt; テクノロジー</Text>
      </Box>
      <ArticleList articles={articles} baseColumns={1} mdColumns={2} />
    </Box>
  );
});
