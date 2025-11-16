import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
  keyframes,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackButton from "../components/BackButton.jsx";
// import
import apiClient from "../api/client.js";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const schema = yup.object({
  fullname: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/u, "Enter a 10 digit phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Registration() {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (values) => {
    try {
      await apiClient.post("/user/register", values, {
        headers: { "Content-Type": "application/json" },
        skipAuthRefresh: true,
      });

      toast({
        title: "Registration complete",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      const description =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong during registration.";
      toast({
        title: "Registration failed",
        description,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    navigate("/login");
  };
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={{ base: 4, md: 6 }}
      bg="gray.50"
      position="relative"
      overflow="hidden"
    >
      <BackButton
        position="absolute"
        top={{ base: 4, md: 6 }}
        left={{ base: 4, md: 6 }}
        zIndex={2}
      />
      {/* 🌿 Gradient Blobs */}
      <Box
        position="absolute"
        top="-50"
        left="-50"
        w="300px"
        h="300px"
        bg="radial-gradient(circle at center, #53ACCB33, transparent 70%)"
        borderRadius="full"
        animation={`${float} 12s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="-60"
        right="-60"
        w="350px"
        h="350px"
        bg="radial-gradient(circle at center, #FF84D433, transparent 70%)"
        borderRadius="full"
        animation={`${float} 15s ease-in-out infinite`}
      />

      {/* 🌱 Leaf patterns */}
      <Box
        position="absolute"
        top="25%"
        left="8%"
        opacity={0.1}
        animation={`${float} 18s ease-in-out infinite`}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="green">
          <path d="M12 2C9 8 2 9 2 15c0 5 4 7 10 7s10-2 10-7c0-6-7-7-10-13z" />
        </svg>
      </Box>
      <Box
        position="absolute"
        bottom="30%"
        right="12%"
        opacity={0.1}
        animation={`${float} 20s ease-in-out infinite`}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="#964B00">
          <path d="M12 2C10 6 6 8 6 12c0 4 4 6 6 10 2-4 6-6 6-10 0-4-4-6-6-10z" />
        </svg>
      </Box>

      {/* 🌸 Flower-like pattern */}
      <Box
        position="absolute"
        top="15%"
        right="25%"
        opacity={0.1}
        animation={`${float} 25s ease-in-out infinite`}
      >
        <svg width="140" height="140" viewBox="0 0 24 24" fill="#FF84D4">
          <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
        </svg>
      </Box>

      {/* 🌿 Extra leaf cluster */}
      <Box
        position="absolute"
        bottom="15%"
        left="20%"
        opacity={0.1}
        animation={`${float} 22s ease-in-out infinite`}
      >
        <svg width="110" height="110" viewBox="0 0 24 24" fill="#228B22">
          <path d="M12 2C8 10 4 12 4 16c0 4 3 6 8 6s8-2 8-6c0-4-4-6-8-14z" />
        </svg>
      </Box>

      {/* Login Card */}
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        maxW={{ base: "sm", md: "md" }}
        borderRadius="2xl"
        p={{ base: 6, md: 8 }}
        boxShadow="xl"
        bgGradient="linear(to-b, #53ACCB, #FF84D4)"
        color="white"
        zIndex={1}
      >
        <Stack spacing={6}>
          <Heading size={{ base: "lg", md: "xl" }} textAlign="center">
            Sign up to Aatman
          </Heading>
          <FormControl isRequired isInvalid={Boolean(errors.fullname)}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="fullname"
              placeholder="Your Name"
              {...register("fullname")}
              bg="whiteAlpha.200"
              _placeholder={{ color: "whiteAlpha.800" }}
              _focus={{ bg: "whiteAlpha.300", boxShadow: "none" }}
            />
            <FormErrorMessage>{errors.fullname?.message}</FormErrorMessage>
            {!errors.fullname && (
              <FormHelperText color="whiteAlpha.900">
                Use a valid name.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.email)}>
            <FormLabel>Email </FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              bg="whiteAlpha.200"
              _placeholder={{ color: "whiteAlpha.800" }}
              _focus={{ bg: "whiteAlpha.300", boxShadow: "none" }}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            {!errors.email && (
              <FormHelperText color="whiteAlpha.900">
                Use a valid email address or 10-digit phone number.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.phoneNumber)}>
            <FormLabel>Phone Number </FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="9876543210"
              {...register("phoneNumber")}
              bg="whiteAlpha.200"
              _placeholder={{ color: "whiteAlpha.800" }}
              _focus={{ bg: "whiteAlpha.300", boxShadow: "none" }}
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
            {!errors.phoneNumber && (
              <FormHelperText color="whiteAlpha.900">
                Use a valid 10 digit phone number.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.password)}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                {...register("password")}
                bg="whiteAlpha.200"
                _placeholder={{ color: "whiteAlpha.800" }}
                _focus={{ bg: "whiteAlpha.300", boxShadow: "none" }}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            size="lg"
            bg="white"
            color="#2B2B2B"
            _hover={{ bg: "whiteAlpha.900" }}
            borderRadius="lg"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Text textAlign="center" fontSize="sm" color="whiteAlpha.900" >
            Already have an account?{" "}
            <Link href="/login"  fontWeight="500">
              Log in
            </Link>
          </Text>

          <Text textAlign="center" fontSize="sm" color="whiteAlpha.900">
            By continuing you agree to our Terms & Privacy Policy.
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Registration;
