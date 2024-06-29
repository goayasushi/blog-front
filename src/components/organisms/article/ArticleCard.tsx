import { FC, memo } from "react";
import { Box, Image, Link as ChakraLink, Text } from "@chakra-ui/react";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  eyecatchUrl: string;
  title: string;
  categoryName: string;
  createdAt: string;
};

export const ArticleCard: FC<Props> = memo((props) => {
  const { id, eyecatchUrl, title, categoryName, createdAt } = props;
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <ChakraLink
          as={Link}
          to={`/article/${id}`}
          _hover={{ textDecoration: "none" }}
        >
          <Image src={eyecatchUrl} alt={title} />
          <Box p={4}>
            <Text fontWeight="bold" fontSize="xl" mb={2}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {categoryName}
            </Text>
            <Text color="gray.500">{formatDate(createdAt)}</Text>
          </Box>
        </ChakraLink>
      </Box>
    </>
  );
});
