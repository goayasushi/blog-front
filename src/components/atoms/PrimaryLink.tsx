import { FC, ReactNode } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  path: string;
};

export const PrimaryLink: FC<Props> = (props) => {
  const { children, path } = props;
  return (
    <ChakraLink
      as={Link}
      to={path}
      mx={2}
      _hover={{
        textDecoration: "none",
      }}
    >
      {children}
    </ChakraLink>
  );
};
