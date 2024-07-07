import { FC, memo } from "react";
import parse, { DOMNode, Element as DomElement } from "html-react-parser";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { client } from "../../libs/client";
import { formatDate } from "../../utils/formatDate";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { Article } from "../../types/article";

const fetchArticle = async (id: string | undefined) => {
  const res = await client.get({
    endpoint: "blogs",
    contentId: id,
  });
  return res;
};

export const ArticleDetail: FC = memo(() => {
  const { id } = useParams<{ id: string | undefined }>();

  const { data: article } = useSuspenseQuery<Article>({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
  });

  const transform = (node: DOMNode) => {
    if (node.type === "tag" && (node as DomElement).name === "img") {
      const imgNode = node as DomElement;
      return (
        <img
          src={imgNode.attribs.src}
          alt={imgNode.attribs.alt}
          style={{ width: "100%", height: "auto", border: "2px solid red" }}
        />
      );
    }
  };

  return (
    <>
      {article && (
        <Box px={{ base: 4, md: 10 }}>
          <Image
            src={article.eyecatch.url}
            width={{ base: "100%", md: "800px" }}
            height="auto"
            alt={article.title}
          />
          <Box mt={8}>
            <Breadcrumbs
              category={article.category.name}
              categoryId={article.category.id}
            />
          </Box>

          <Box mt={8} p={2}>
            <Heading as="h1" size="xl">
              {article.title}
            </Heading>
            <Text mt={2} color="gray.500">
              {formatDate(article.createdAt)}
            </Text>
            <Box mt={8}>{parse(article.content, { replace: transform })}</Box>
          </Box>
        </Box>
      )}
    </>
  );
});
