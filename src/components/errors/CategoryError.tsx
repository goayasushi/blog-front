import { FC, memo } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const is4xxrError = (status: number) => {
  return status >= 400 && status < 500;
};

export const CategoryError: FC<Props> = memo((props) => {
  const { error, resetErrorBoundary } = props;
  const navigate = useNavigate();

  let statusCode = 0;
  const match = error.message.match(/status: (\d+)/);
  if (match) {
    statusCode = parseInt(match[1], 10);
  }

  if (is4xxrError(statusCode)) {
    return (
      <>
        <Alert
          status="error"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon />
          <AlertTitle>カテゴリーの取得に失敗しました。</AlertTitle>
          <AlertDescription>
            時間を置いて再度お試しください。
            <br />
            {error.message}
          </AlertDescription>
          <AlertDescription mt={4}>
            再開するには、以下のボタンをクリックしてください。
          </AlertDescription>
          <Button
            mt={4}
            colorScheme="gray"
            onClick={() => {
              resetErrorBoundary();
              navigate("/");
            }}
          >
            トップ画面へ戻る
          </Button>
        </Alert>
      </>
    );
  } else {
    throw error;
  }
});
