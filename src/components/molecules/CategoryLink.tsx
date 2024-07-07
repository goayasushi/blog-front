import React, { FC, memo } from "react";
import { Box, Text, Link as ChakraLink, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useCategories } from "../../hooks/useCategories";

export const CategoryLink: FC = memo(() => {
  const { data: categories } = useCategories();

  return (
    <>
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
          {index < categories.length - 1 && <Divider borderColor="gray.300" />}
        </React.Fragment>
      ))}
    </>
  );
});
