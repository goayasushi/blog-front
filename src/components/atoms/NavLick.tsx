import { Link } from "@chakra-ui/react";

export const NavLink = ({ children }: { children: React.ReactNode }) => (
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
