import { FC, Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import { Box, GridItem, SimpleGrid, Spinner } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";

import { Header } from "../organisms/layout/Header";
import { Footer } from "../organisms/layout/Footer";
import { Sidebar } from "../organisms/layout/Sidebar";
import { GlobalError } from "../errors/GlobalError";
import { ApiError } from "../errors/ApiError";

export const PageLayout: FC = memo(() => {
  return (
    <>
      <ErrorBoundary FallbackComponent={GlobalError}>
        <Header />
        <Box display="flex" justifyContent="center">
          <Box pt="28">
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} maxW="1200px">
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                {/* <ErrorBoundary FallbackComponent={ApiError}> */}
                <Suspense fallback={<Spinner />}>
                  <Outlet />
                </Suspense>
                {/* </ErrorBoundary> */}
              </GridItem>
              <GridItem colSpan={1}>
                <Sidebar />
              </GridItem>
            </SimpleGrid>
          </Box>
        </Box>
        <Footer />
      </ErrorBoundary>
    </>
  );
});
