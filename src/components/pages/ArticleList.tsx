import { FC, memo, useEffect, useState } from "react";
import { Box, GridItem, SimpleGrid, Text } from "@chakra-ui/react";

import { Article } from "../../types/article";
import { client } from "../../libs/client";
import { ArticleCard } from "../organisms/article/ArticleCard";

export const ArticleList: FC = memo(() => {
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

  const Sidebar = () => (
    <Box>
      <Text>サイドバーの内容</Text>
    </Box>
  );

  const ArticleList = () => (
    <>
      <Box mb={4}>
        <Text>記事一覧 &gt; テクノロジー</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {articles.map((article) => (
          <ArticleCard
            id={article.id}
            eyecatchUrl={article.eyecatch.url}
            title={article.title}
            categoryName={article.category.name}
            createdAt={article.createdAt}
          />
        ))}
      </SimpleGrid>
    </>
  );

  return (
    <>
      <Box p={10} display="flex" justifyContent="center">
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} maxWidth="1200px">
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <ArticleList />
          </GridItem>
          <GridItem colSpan={1}>
            <Sidebar />
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
});
