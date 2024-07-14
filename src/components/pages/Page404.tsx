import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

export const Page404: FC = memo(() => {
  const navigate = useNavigate();

  return (
    <VStack spacing={6} align="center" p={20} borderRadius="md">
      <Heading as="h2" size="lg">
        ページが見つかりません
      </Heading>
      <Text fontSize="md" textAlign="center">
        お探しのページは存在しないか、削除された可能性があります。
      </Text>
      <Button
        colorScheme="gray"
        onClick={() => {
          navigate("/");
        }}
      >
        トップ画面へ戻る
      </Button>
    </VStack>
  );
});
