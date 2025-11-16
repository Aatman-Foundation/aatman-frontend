import React from "react";
import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function BackButton({ children = "Back", ...buttonProps }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      leftIcon={<ArrowBackIcon />}
      variant="outline"
      colorScheme="brand"
      bg="white"
      borderRadius="full"
      boxShadow="md"
      _hover={{ bg: "brand.50", transform: "translateX(-2px)" }}
      _active={{ transform: "translateX(0)" }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

export default BackButton;
