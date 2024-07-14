import { FC, memo } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

type Props = {
  error: Error;
};

const is4xxrError = (status: number) => {
  return status >= 400 && status < 500;
};

export const ApiError: FC<Props> = memo((props) => {
  const { error } = props;

  let statusCode = 0;
  const match = error.message.match(/status: (\d+)/);
  if (match) {
    statusCode = parseInt(match[1], 10);
  }

  if (statusCode === 404) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>ページが見つかりません</AlertTitle>
            <AlertDescription>
              お探しのページは存在しないか、削除された可能性があります。
              <br />
              {error.message}
            </AlertDescription>
          </Box>
        </Alert>
      </>
    );
  } else if (is4xxrError(statusCode)) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>
              リクエストに問題がありました。時間を置いて再度お試しください。
              <br />
              {error.message}
            </AlertDescription>
          </Box>
        </Alert>
      </>
    );
  } else {
    throw error;
  }
});
