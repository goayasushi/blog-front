import { Link } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const NavLink: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "gray.200",
      }}
      href={"#"}
    >
      {children}
    </Link>
  );
};
