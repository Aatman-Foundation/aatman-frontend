import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout({ showFooter = true }) {
  return (
    <Box minH="100vh" bgGradient="linear(to-b, white, gray.50)" display="flex" flexDirection="column">
      <Navbar />
      <Box as="main" flex="1 1 auto"  pb={{ base: 10, md: 16 }}>
        <Outlet />
      </Box>
      {showFooter ? <Footer /> : null}
    </Box>
  );
}

export default Layout;
