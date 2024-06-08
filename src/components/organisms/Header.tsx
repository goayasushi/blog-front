import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { NavLink } from "../atoms/NavLick";

const Links = ["プロフィール", "カテゴリー", "お問い合わせ"];

export const Header: React.FC = () => {
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
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Box bg="white" px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Image src="/path-to-your-logo.png" alt="Logo" height="50px" />
          </Box>
        </HStack>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink>{Links[0]}</NavLink>

            <Menu isOpen={isCategoryOpen} offset={[0, 0]}>
              <MenuButton
                as={Link}
                _hover={{ textDecoration: "none" }}
                onMouseEnter={onCategoryOpen}
                onMouseLeave={onCategoryClose}
                textDecoration="none"
              >
                {Links[1]}
                <ChevronDownIcon />
              </MenuButton>
              <MenuList
                onMouseEnter={onCategoryOpen}
                onMouseLeave={onCategoryClose}
              >
                <MenuItem>サブカテゴリー1</MenuItem>
                <MenuItem>サブカテゴリー2</MenuItem>
                <MenuItem>サブカテゴリー3</MenuItem>
              </MenuList>
            </Menu>
            <NavLink>{Links[2]}</NavLink>
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
          <DrawerHeader>メニュー</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
