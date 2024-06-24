import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";

import { Header } from "../organisms/layout/Header";
import { Footer } from "../organisms/layout/Footer";
import { Sidebar } from "../organisms/layout/Sidebar";

export const PageLayout: FC = memo(() => {
  return (
    <>
      <Header />
      <Box p={10} display="flex" justifyContent="center">
        <Box pt="20">
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} maxW="1200px">
            <GridItem colSpan={{ base: 1, lg: 2 }}>
              <Outlet />
            </GridItem>
            <GridItem colSpan={1}>
              <Sidebar />
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
      <Footer />
    </>
  );
});
