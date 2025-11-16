import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Stack,
  Text,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useLogout } from "../hooks/useLogout.js";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Announcements", to: "/announcements" },
  { label: "Gallery", to: "/gallery" },
  
  { label: "Contact", to: "/contact" },
];

function NavbarLink({ to, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      as={NavLink}
      to={to}
      fontWeight="medium"
      fontSize="sm"
      letterSpacing="wide"
      textTransform="uppercase"
      color={isActive ? "brand.600" : "gray.600"}
      px={2}
      py={1}
      position="relative"
      _hover={{ color: "brand.600" }}
      _after={{
        content: '""',
        position: "absolute",
        left: 0,
        bottom: "-6px",
        width: "100%",
        height: "2px",
        bg: "brand.400",
        transition: "transform 0.2s ease",
        transform: isActive ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "center",
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const { logout, isLoggingOut } = useLogout();

  const renderAuthActions = (onItemClick) => {
    if (isAuthenticated) {
      return (
        <Stack
          spacing={3}
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "center" }}
        >
          <Button
            as={NavLink}
            to="/profile"
            variant="outline"
            colorScheme="brand"
            onClick={onItemClick}
          >
            Profile
          </Button>
          <Button
            colorScheme="accent"
            onClick={() => {
              onItemClick?.();
              logout();
            }}
            isLoading={isLoggingOut}
          >
            Logout
          </Button>
        </Stack>
      );
    }

    return (
      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
      >
        <Button
          as={NavLink}
          to="/login"
          variant="ghost"
          colorScheme="brand"
          onClick={onItemClick}
        >
          Sign In
        </Button>
        <Button
          as={NavLink}
          to="/register"
          colorScheme="accent"
          onClick={onItemClick}
        >
          Sign Up
        </Button>
      </Stack>
    );
  };

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      backdropFilter="saturate(180%) blur(8px)"
      bg="whiteAlpha.900"
      boxShadow="sm"
    >
      {/* <Box bg="brand.50">
        <Container maxW="7xl" py={2}>
          <Flex justify="space-between" align="center" fontSize="sm" color="gray.600">
            <HStack spacing={3}>
              <FiMail />
              <Text>shashank@aatmanfoundation.in</Text>
            </HStack>
            <HStack spacing={3}>
              <FiPhone />
              <Text>+91 78971 00929</Text>
            </HStack>
          </Flex>
        </Container>
      </Box> */}

      <Container maxW="8xl" py={3}>
        <Flex align="center" justify="space-between" gap={8}>
          <HStack spacing={{ base: 4, md: 10 }} align="center" w="full">
            <HStack
              spacing={{ base: 3, md: 6 }}
              align="center"
              flex="1"
              justify="flex-start"
              flexWrap="wrap"
            >
              <Image
                w={{ base: 12, md: 16 }}
                src="/Aatman.png"
                alt="Aatman Foundation"
              />
              <Image
                w={{ base: 14, md: 44 }}
                src="/logo (1).png"
                alt="AYUSH"
                display={{ base: "none", sm: "block" }}
              />
              <Image
                w={{ base: 12, md: 32 }}
                src="/Swachh_Bharat.png"
                alt="Swachh Bharat"
                display={{ base: "none", md: "block" }}
              />
              <Image
                w={{ base: 12, md: 12 }}
                src="/img2.jpeg"
                alt="Partner logo"
                display={{ base: "none", md: "block" }}
              />
            </HStack>
            <Divider
              orientation="vertical"
              height="32px"
              display={{ base: "none", md: "block" }}
            />
            <HStack
              spacing={{ base: 4, md: 8 }}
              display={{ base: "none", md: "flex" }}
            >
              {navItems.map((item) => (
                <NavbarLink key={item.to} to={item.to}>
                  {item.label}
                </NavbarLink>
              ))}
            </HStack>
          </HStack>

          <Flex align="center" gap={4}>
            <Box display={{ base: "none", md: "block" }}>
              {renderAuthActions()}
            </Box>
            <IconButton
              aria-label="Open menu"
              icon={<FaBars />}
              variant="ghost"
              onClick={onOpen}
              display={{ base: "inline-flex", md: "none" }}
            />
          </Flex>
        </Flex>
      </Container>

      <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Stack spacing={6} mt={6}>
              {navItems.map((item) => (
                <NavbarLink key={item.to} to={item.to} onClick={onClose}>
                  {item.label}
                </NavbarLink>
              ))}
              <Divider />
              {renderAuthActions(onClose)}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navbar;
