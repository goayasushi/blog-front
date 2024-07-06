import React, { FC, memo } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { client } from "../../../libs/client";
import { Category } from "../../../types/category";
import { useSuspenseQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await client.get({ endpoint: "categories" });
  return res.contents;
};

export const Sidebar: FC = memo(() => {
  const { data: categories } = useSuspenseQuery<Array<Category>>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <>
      <Box m={5}>
        <Heading bg="gray.100" size="md" mb={4} p={3} borderRadius={5}>
          カテゴリー
        </Heading>
        <VStack align="start" spacing={2} m={4}>
          {categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <Box>
                <ChakraLink
                  as={Link}
                  to={`/category/${category.id}`}
                  _hover={{ textDecoration: "none" }}
                >
                  <Text>{category.name}</Text>
                </ChakraLink>
              </Box>
              {index < categories.length - 1 && (
                <Divider borderColor="gray.300" />
              )}
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </>
  );
});
