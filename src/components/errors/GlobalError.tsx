import { FC, memo } from "react";

import { Page5xx } from "../pages/Page5xx";
import { PageOtherError } from "../pages/PageOtherError";

type Props = {
  error: Error;
};

const isServerError = (status: number) => {
  return status >= 500 && status < 600;
};

export const GlobalError: FC<Props> = memo((props) => {
  const { error } = props;

  let statusCode = 0;
  const match = error.message.match(/status: (\d+)/);
  if (match) {
    statusCode = parseInt(match[1], 10);
  }

  if (isServerError(statusCode)) {
    return <Page5xx error={error} />;
  } else {
    return <PageOtherError error={error} />;
  }
});
