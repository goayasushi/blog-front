import { FC, Suspense, memo } from "react";
import { Box, Heading, VStack, Spinner } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";

import { CategoryLink } from "../../molecules/CategoryLink";
import { CategoryError } from "../../errors/CategoryError";

export const Sidebar: FC = memo(() => {
  return (
    <>
      <Box m={5}>
        <Heading bg="gray.100" size="md" mb={4} p={3} borderRadius={5}>
          カテゴリー
        </Heading>
        <VStack align="start" spacing={2} m={4}>
          <ErrorBoundary FallbackComponent={CategoryError}>
            <Suspense fallback={<Spinner />}>
              <CategoryLink />
            </Suspense>
          </ErrorBoundary>
        </VStack>
      </Box>
    </>
  );
});
