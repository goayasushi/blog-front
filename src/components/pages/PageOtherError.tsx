import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const PageOtherError: FC<Props> = memo((props) => {
  const { error, resetErrorBoundary } = props;
  const navigate = useNavigate();

  return (
    <>
      <VStack spacing={6} align="center" p={20} borderRadius="md">
        <Heading as="h2" size="lg">
          問題が発生しました。
        </Heading>
        <Text fontSize="md" textAlign="center">
          {error.message}
        </Text>
        <Button
          colorScheme="teal"
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
