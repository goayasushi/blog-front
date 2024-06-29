import { FC, memo } from "react";
import { SimpleGrid } from "@chakra-ui/react";

import { Article } from "../../../types/article";
import { ArticleCard } from "./ArticleCard";

type Props = {
  articles: Array<Article>;
  baseColumns: number;
  mdColumns: number;
};

export const ArticleList: FC<Props> = memo((props) => {
  const { articles, baseColumns, mdColumns } = props;
  return (
    <>
      <SimpleGrid columns={{ base: baseColumns, md: mdColumns }} spacing={10}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
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
});
