import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

export const HeaderLayout: FC = memo(() => {
  return (
    <>
      <Header />
      <Box pt="20">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
});
