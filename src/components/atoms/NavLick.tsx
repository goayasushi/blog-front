import { Link as ChakraLink } from "@chakra-ui/react";

import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  path: string;
};

export const NavLink: FC<Props> = (props) => {
  const { children, path } = props;
  return (
    <ChakraLink
      as={Link}
      to={`/${path}`}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
      }}
    >
      {children}
    </ChakraLink>
  );
};
