import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Article } from "../../types/article";
import { client } from "../../libs/client";
import { Box } from "@chakra-ui/react";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { ArticleList } from "../organisms/article/ArticleList";

export const CategoryList: FC = memo(() => {
  const [articles, setArticles] = useState<Array<Article>>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    client
      .get({
        endpoint: "blogs",
        queries: { filters: `category[equals]${id}` },
      })
      .then((res) => {
        setArticles(res.contents);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
