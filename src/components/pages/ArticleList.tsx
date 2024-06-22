import { FC, memo, useEffect, useState } from "react";
import { client } from "../../libs/client";
import { Box, GridItem, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Article } from "../../types/article";

export const ArticleList: FC = memo(() => {
  const [articles, setArticless] = useState<Array<Article>>([]);

  useEffect(() => {
    client
      .get({
        endpoint: "blogs",
      })
      .then((res) => {
        console.log(res.contents);
        setArticless(res.contents);
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
      <Box py={4}>
        <Text>記事一覧 &gt; テクノロジー</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {articles.map((article) => (
          <Box
            key={article.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Link href={`/articles/${article.id}`}>
              <Image src={article.eyecatch.url} alt={article.title} />
              <Box p={4}>
                <Text fontWeight="bold" fontSize="xl" mb={2}>
                  {article.title}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {article.category.name}
                </Text>
                <Text>{article.createdAt}</Text>
              </Box>
            </Link>
          </Box>
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
