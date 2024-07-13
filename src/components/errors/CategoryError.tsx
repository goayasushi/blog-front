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

export const CategoryError: FC<Props> = memo((props) => {
  const { error } = props;
  const errorMessage = error.message;

  let statusCode = 0;
  const match = error.message.match(/status: (\d+)/);
  if (match) {
    statusCode = parseInt(match[1], 10);
  }

  if (is4xxrError(statusCode)) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>カテゴリーの取得に失敗しました。</AlertTitle>
            <AlertDescription>
              時間を置いて再度お試しください。
              <br />
              {errorMessage}
            </AlertDescription>
          </Box>
        </Alert>
      </>
    );
  } else {
    throw error;
  }
});
