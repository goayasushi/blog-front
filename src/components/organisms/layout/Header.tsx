import { FC, Suspense, memo, useRef } from "react";
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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Link as ChakraLink,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import { NavLink } from "../../atoms/NavLink";
import { NavCategoryLink } from "../../molecules/NavCategoryLink";
import { DrawerCategoryLink } from "../../molecules/DrawerCategoryLink";

const HeaderLinks = [
  {
    path: "profile",
    children: "プロフィール",
  },
  {
    path: "category",
    children: "カテゴリー",
  },
  { path: "contact", children: "お問い合わせ" },
];

const HamburgerLinks = [
  {
    path: "profile",
    children: "プロフィール",
    isLink: true,
  },
  {
    path: "category",
    children: "カテゴリー",
    isLink: false,
  },
  { path: "contact", children: "お問い合わせ", isLink: true },
];

export const Header: FC = memo(() => {
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

  return (
    <Box
      bg="white"
      px={4}
      py={4}
      borderBottom="1px"
      borderBottomColor="gray.400"
      position="fixed"
      width="100%"
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <HStack alignItems="center">
          <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
            <Heading as="h1" size="md">
              テックブログ
            </Heading>
          </ChakraLink>
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
                <Suspense fallback={<Spinner />}>
                  <NavCategoryLink />
                </Suspense>
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
              {HamburgerLinks.map((link) =>
                link.isLink ? (
                  <NavLink
                    key={link.path}
                    path={link.path}
                    onClick={onDrawerClose}
                  >
                    {link.children}
                  </NavLink>
                ) : (
                  <Box key={link.path}>
                    <Text px={2} py={1} mb={2}>
                      {link.children}
                    </Text>
                    <Stack spacing={4}>
                      <Suspense fallback={<Spinner />}>
                        <DrawerCategoryLink onDrawerClose={onDrawerClose} />
                      </Suspense>
                    </Stack>
                  </Box>
                )
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
});
