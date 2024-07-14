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

export const ApiError: FC<Props> = memo((props) => {
  const { error, resetErrorBoundary } = props;
  const navigate = useNavigate();

  const onClickReset = () => {
    resetErrorBoundary();
    navigate("/");
  };

  let statusCode = 0;
  const match = error.message.match(/status: (\d+)/);
  if (match) {
    statusCode = parseInt(match[1], 10);
  }

  if (statusCode === 404) {
    return (
      <>
        <Alert
          status="error"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon />
          <AlertTitle>ページが見つかりません</AlertTitle>
          <AlertDescription>
            お探しのページは存在しないか、削除された可能性があります。
            <br />
            {error.message}
          </AlertDescription>
          <AlertDescription mt={4}>
            再開するには、以下のボタンをクリックしてください。
          </AlertDescription>
          <Button mt={4} colorScheme="gray" onClick={onClickReset}>
            トップ画面へ戻る
          </Button>
        </Alert>
      </>
    );
  } else if (is4xxrError(statusCode)) {
    return (
      <>
        <Alert
          status="error"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon />
          <AlertTitle>エラーが発生しました</AlertTitle>
          <AlertDescription>
            リクエストに問題がありました。時間を置いて再度お試しください。
            <br />
            {error.message}
          </AlertDescription>
          <AlertDescription mt={4}>
            再開するには、以下のボタンをクリックしてください。
          </AlertDescription>
          <Button mt={4} colorScheme="gray" onClick={onClickReset}>
            トップ画面へ戻る
          </Button>
        </Alert>
      </>
    );
  } else {
    throw error;
  }
});
