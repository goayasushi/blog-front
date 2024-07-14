import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const Page5xx: FC<Props> = memo((props) => {
  const { error, resetErrorBoundary } = props;
  const navigate = useNavigate();

  return (
    <>
      <VStack spacing={6} align="center" p={20} borderRadius="md">
        <Heading as="h2" size="lg">
          問題が発生しました。
        </Heading>
        <Text fontSize="lg" textAlign="center">
          一時的にアクセスできない状態です。
        </Text>
        <Text fontSize="md" textAlign="center">
          時間を置いて再度お試しください。
        </Text>
        <Text fontSize="md" textAlign="center">
          {error.message}
        </Text>
        <Button
          colorScheme="gray"
          onClick={() => {
            resetErrorBoundary();
            navigate("/");
          }}
        >
          トップ画面へ戻る
        </Button>
      </VStack>
    </>
  );
});
