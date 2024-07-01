import { FC, memo } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { PrimaryLink } from "../../atoms/PrimaryLink";

export const Footer: FC = memo(() => {
  return (
    <>
      <Box bg="white" py={4} mt={8} boxShadow="sm">
        <Flex justify="center" align="center">
          <PrimaryLink path="/articles">全記事一覧</PrimaryLink>
          <Divider orientation="vertical" height="20px" mx={2} />
          <PrimaryLink path="/privacy-policy">プライバシーポリシー</PrimaryLink>
          <Divider orientation="vertical" height="20px" mx={2} />
          <PrimaryLink path="/contact"> 問い合わせ</PrimaryLink>
        </Flex>
        <Text textAlign="center" mt={4} fontSize={{ base: "2xs", md: "lg" }}>
          © goyasu.
        </Text>
      </Box>
    </>
  );
});
