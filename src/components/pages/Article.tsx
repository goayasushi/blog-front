import { FC, memo, useEffect, useState } from "react";
import { client } from "../../libs/client";
import parse, { DOMNode, Element as DomElement } from "html-react-parser";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/formatDate";

type Blog = {
  category: {
    createdAt: string;
    id: string;
    name: string;
    publishedAt: string;
    revisedAt: string;
    updatedAt: string;
  };
  content: string;
  createdAt: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  updatedAt: string;
};

export const Article: FC = memo(() => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    client
      .get({
        endpoint: `blogs/${id}`,
      })
      .then((res) => {
        console.log(res.contents);
        setBlog(res);
      })
      .catch((err) => console.log(err));
  }, []);

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
      {blog && (
        <Box px={{ base: 4, md: 10 }}>
          <Image
            src={blog.eyecatch.url}
            width={{ base: "100%", md: "800px" }}
            height="auto"
            alt={blog.title}
          />
          <Box mt={8}>
            <Text>記事一覧 &gt; テクノロジー</Text>
          </Box>

          <Box mt={8} p={2}>
            <Heading as="h1" size="xl">
              {blog.title}
            </Heading>
            <Text mt={2} color="gray.500">
              {formatDate(blog.createdAt)}
            </Text>
            <Box mt={8}>{parse(blog.content, { replace: transform })}</Box>
          </Box>
        </Box>
      )}
    </>
  );
});
