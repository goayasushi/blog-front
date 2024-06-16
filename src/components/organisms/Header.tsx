import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import { NavLink } from "../atoms/NavLick";
import { client } from "../../libs/client";
import { CategoryType } from "../../types/Category";

const HeaderLinks = [
  {
    path: "profile",
    children: "プロフィール",
  },
  {
    path: "categories",
    children: "カテゴリー",
  },
  { path: "contact", children: "お問い合わせ" },
];

const HamburgerLinks = [
  {
    path: "profile",
    children: "プロフィール",
  },
  { path: "contact", children: "お問い合わせ" },
];

export const Header: FC = () => {
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  // カテゴリー取得
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  useEffect(() => {
    client
      .get({
        endpoint: "categories",
      })
      .then((res) => {
        console.log(res.contents);
        setCategories(res.contents);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      bg="white"
      px={4}
      boxShadow="md"
      position="fixed"
      width="100%"
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <ChakraLink as={Link} to="/">
              <Image
                display={{ base: "none", lg: "block" }}
                src="/logo-main.png"
                alt="Logo"
                height="80px"
              />
              <Image
                display={{ base: "block", lg: "none" }}
                src="/logo-main-sp.png"
                alt="Logo"
                height="80px"
              />
            </ChakraLink>
          </Box>
          <Box mt={3}>
            <Image
              display={{ base: "none", lg: "block" }}
              src="/logo-sub.png"
              alt="Logo"
              height="35px"
            />
          </Box>
        </HStack>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink path={HeaderLinks[0].path}>
              {HeaderLinks[0].children}
            </NavLink>

            <Menu isOpen={isCategoryOpen} offset={[0, 0]}>
              <MenuButton
                _hover={{ textDecoration: "none" }}
                onMouseEnter={onCategoryOpen}
                onMouseLeave={onCategoryClose}
                textDecoration="none"
              >
                {HeaderLinks[1].children}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList
                onMouseEnter={onCategoryOpen}
                onMouseLeave={onCategoryClose}
              >
                {categories.map((category) => (
                  <MenuItem
                    as={Link}
                    to={`/category/${category.id}`}
                    key={category.id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <NavLink path={HeaderLinks[2].path}>
              {HeaderLinks[2].children}
            </NavLink>
          </HStack>
        </HStack>
        <IconButton
          size="md"
          icon={isDrawerOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
          ref={btnRef}
        />
      </Flex>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              {HamburgerLinks.map((link) => (
                <NavLink path={link.path} key={link.path}>
                  {link.children}
                </NavLink>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
