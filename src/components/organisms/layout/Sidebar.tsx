import { FC, memo, useEffect, useState } from "react";
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

export const Sidebar: FC = memo(() => {
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    client
      .get({
        endpoint: "categories",
      })
      .then((res) => {
        setCategories(res.contents);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Box m={5}>
        <Heading bg="gray.100" size="md" mb={4} p={3} borderRadius={5}>
          カテゴリー
        </Heading>
        <VStack align="start" spacing={2} m={4}>
          {categories.map((category, index) => (
            <>
              <Box key={category.id}>
                <ChakraLink
                  as={Link}
                  to={`/category/${category.id}`}
                  _hover={{ textDecoration: "none", color: "teal.500" }}
                >
                  <Text>{category.name}</Text>
                </ChakraLink>
              </Box>
              {index < categories.length - 1 && (
                <Divider borderColor="gray.300" />
              )}
            </>
          ))}
        </VStack>
      </Box>
    </>
  );
});
