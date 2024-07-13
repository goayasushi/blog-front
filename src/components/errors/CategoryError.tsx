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

export const CategoryError: FC<Props> = memo((props) => {
  const { error } = props;
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>カテゴリーの取得に失敗しました。</AlertTitle>
          <AlertDescription>
            時間を置いて再度お試しください。
            <br />
            {error.message}
          </AlertDescription>
        </Box>
      </Alert>
    </>
  );
});
