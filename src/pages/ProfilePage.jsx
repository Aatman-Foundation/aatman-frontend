import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  keyframes,
} from "@chakra-ui/react";
import { ArrowForwardIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import apiClient from "../api/client.js";

const INITIAL_FORM_VALUES = {
  fullName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
};

const extractUserFromResponse = (response) => {
  if (!response || typeof response !== "object") return null;

  const { data = null, user = null } = response.data ?? {};
  if (data && typeof data === "object") return data;
  if (user && typeof user === "object") return user;
  if (response.data && typeof response.data === "object") return response.data;
  return null;
};

const selectAvatarUrl = (user) => {
  if (!user || typeof user !== "object") return "";

  return (
    user.profilePictureUrl ??
    user.profileImage ??
    user.avatarUrl ??
    user.avatar ??
    user.imageUrl ??
    user.photoUrl ??
    user.photo ??
    ""
  );
};

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallbackMessage;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(4deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

function ProfilePage() {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const isComponentMounted = useRef(true);

  const redirectToLogin = useCallback(() => {
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate, setIsAuthenticated]);

  const syncProfileState = useCallback((user, fallback = {}) => {
    if (!isComponentMounted.current) return;

    if (user) {
      setFormValues((prev) => ({
        ...prev,
        fullName: user.fullName ?? user.fullname ?? user.name ?? fallback.fullName ?? prev.fullName,
        email: user.email ?? fallback.email ?? prev.email,
        oldPassword: "",
        newPassword: "",
      }));

      setAvatarPreview((prev) => {
        const nextAvatar = selectAvatarUrl(user);
        if (nextAvatar) return String(nextAvatar);
        if (Object.prototype.hasOwnProperty.call(fallback, "avatar")) {
          return fallback.avatar ? String(fallback.avatar) : "";
        }
        return prev;
      });
      return;
    }

    if (fallback.fullName || fallback.email) {
      setFormValues((prev) => ({
        ...prev,
        fullName: fallback.fullName ?? prev.fullName,
        email: fallback.email ?? prev.email,
        oldPassword: "",
        newPassword: "",
      }));
    }

    if (fallback.avatar) {
      setAvatarPreview(String(fallback.avatar));
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!isComponentMounted.current) return;

    setIsFetchingProfile(true);
    try {
      const response = await apiClient.get("/user/me");
      const user = extractUserFromResponse(response);

      if (!isComponentMounted.current || !user) return;

      syncProfileState(user);
    } catch (error) {
      if (!isComponentMounted.current) return;

      if (error.response?.status === 401) {
        redirectToLogin();
      }

      toast({
        title: "Unable to fetch profile",
        description: getErrorMessage(error, "Failed to load profile information."),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      if (isComponentMounted.current) {
        setIsFetchingProfile(false);
      }
    }
  }, [redirectToLogin, syncProfileState, toast]);

  useEffect(() => {
    isComponentMounted.current = true;
    fetchProfile();

    return () => {
      isComponentMounted.current = false;
    };
  }, [fetchProfile]);

  const uploadProfilePicture = useCallback(async (file) => {
    if (!file || !isComponentMounted.current) return;

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await apiClient.post("/user/update-profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const description =
        response.data?.message ||
        response.data?.data?.message ||
        "Your new profile picture is live.";

      toast({
        title: "Profile picture updated",
        description,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      await fetchProfile();
    } catch (error) {
      if (error.response?.status === 401) {
        redirectToLogin();
      }

      toast({
        title: "Upload failed",
        description: getErrorMessage(error, "Failed to update your profile picture."),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      if (isComponentMounted.current) {
        setIsUploadingAvatar(false);
      }
    }
  }, [fetchProfile, redirectToLogin, toast]);

  const handleImageChange = (event) => {
    if (isUploadingAvatar) {
      event.target.value = "";
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (!isComponentMounted.current) return;
      if (typeof reader.result === "string") {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);

    uploadProfilePicture(file);
    event.target.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedFullName = formValues.fullName.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedOldPassword = formValues.oldPassword.trim();
    const trimmedNewPassword = formValues.newPassword.trim();

    if (!trimmedFullName || !trimmedEmail) {
      toast({
        title: "Missing details",
        description: "Please provide both your full name and email.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (trimmedOldPassword && !trimmedNewPassword) {
      toast({
        title: "New password required",
        description: "Enter a new password to update your credentials.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (trimmedNewPassword && !trimmedOldPassword) {
      toast({
        title: "Old password required",
        description: "Enter your current password before setting a new one.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      fullname: trimmedFullName,
      email: trimmedEmail,
    };

    if (trimmedNewPassword) {
      payload.oldPassword = trimmedOldPassword;
      payload.newPassword = trimmedNewPassword;
    }

    setIsUpdatingProfile(true);
    try {
      const response = await apiClient.post("/user/update-details", payload);
      const updatedUser = extractUserFromResponse(response);

      if (updatedUser) {
        syncProfileState(updatedUser, {
          fullName: trimmedFullName,
          email: trimmedEmail,
        });
      } else {
        syncProfileState(null, {
          fullName: trimmedFullName,
          email: trimmedEmail,
        });
      }

      toast({
        title: "Profile updated",
        description:
          (typeof response.data?.message === "string" && response.data.message) ||
          "Your changes have been saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const isOldPasswordError =
        error.response?.status === 401 &&
        typeof error.response?.data?.message === "string" &&
        error.response.data.message.toLowerCase().includes("old password");

      if (error.response?.status === 401 && !isOldPasswordError) {
        redirectToLogin();
      }

      toast({
        title: "Unable to update profile",
        description: getErrorMessage(error, "Failed to update your profile."),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordChange = Boolean(formValues.oldPassword || formValues.newPassword);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={{ base: 4, md: 8 }}
      py={{ base: 10, md: 16 }}
      bg="gray.50"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-60px"
        left="-40px"
        w="320px"
        h="320px"
        bg="radial-gradient(circle at center, #53ACCB33, transparent 70%)"
        borderRadius="full"
        animation={`${float} 12s ease-in-out infinite`}
        display={{ base: "none", md: "block" }}
      />
      <Box
        position="absolute"
        bottom="-70px"
        right="-50px"
        w="360px"
        h="360px"
        bg="radial-gradient(circle at center, #FF84D433, transparent 70%)"
        borderRadius="full"
        animation={`${float} 16s ease-in-out infinite`}
        display={{ base: "none", md: "block" }}
      />

      <Box
        as="form"
        onSubmit={handleSubmit}
        w="full"
        maxW="5xl"
        mx="auto"
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        p={{ base: 6, md: 10 }}
        zIndex={1}
      >
        <Stack spacing={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={4}
          >
            <Stack spacing={2} textAlign={{ base: "center", md: "left" }}>
              <Heading size={{ base: "lg", md: "xl" }}>Your Profile</Heading>
              <Text color="gray.600">
                Keep your information up to date to personalize your Aatman experience.
              </Text>
            </Stack>
            
          </Flex>

          <Flex
            direction={{ base: "column", xl: "row" }}
            align="start"
            gap={{ base: 6, xl: 8 }}
          >
           
            <Stack spacing={6} flex={1} w="full">
              <Box borderWidth="1px" borderRadius="2xl" p={{ base: 6, md: 8 }} bg="gray.50" boxShadow="lg">
                <Stack spacing={4} align="center">
                  <Box bgGradient="linear(to-b, #53ACCB, #FF84D4)" p="4px" borderRadius="full" boxShadow="lg">
                    <Avatar
                      size={{ base: "xl", md: "2xl" }}
                      name={formValues.fullName || "Aatman User"}
                      src={avatarPreview}
                      bg="white"
                    />
                  </Box>
                  <Button
                    leftIcon={<EditIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    colorScheme="pink"
                    w={{ base: "full", md: "auto" }}
                    type="button"
                    isLoading={isUploadingAvatar}
                    loadingText="Uploading"
                    isDisabled={isFetchingProfile || isUploadingAvatar}
                  >
                    Change Photo
                  </Button>
                  <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} display="none" />
                </Stack>
              </Box>

              {/* Account Details */}
              <Box borderWidth="1px" borderRadius="2xl" p={{ base: 6, md: 8 }} bg="white" boxShadow="lg">
                <Stack spacing={6} w="full">
                  <Heading size="md">Account Details</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formValues.fullName}
                        onChange={handleChange}
                        bg="gray.50"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formValues.email}
                        onChange={handleChange}
                        bg="gray.50"
                        _focus={{ bg: "white", boxShadow: "outline" }}
                      />
                    </FormControl>

                    <GridItem colSpan={{ base: 1, md: 2 }}>
                      <FormControl isRequired={isPasswordChange}>
                      <FormLabel>Old Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            placeholder="Enter your current password"
                            value={formValues.oldPassword}
                            onChange={handleChange}
                            bg="gray.50"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                          />
                          <InputRightElement width="3rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowPassword((prev) => !prev)}
                              variant="ghost"
                              type="button"
                            >
                              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <FormControl isRequired={isPasswordChange} mt={3}>
                      <FormLabel>New Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter a new secure password"
                            value={formValues.newPassword}
                            onChange={handleChange}
                            bg="gray.50"
                            _focus={{ bg: "white", boxShadow: "outline" }}
                          />
                          <InputRightElement width="3rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowPassword((prev) => !prev)}
                              variant="ghost"
                              type="button"
                            >
                              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>

                  <Flex justify={{ base: "center", md: "flex-end" }} w="full">
                    <Button
                      type="submit"
                      size="lg"
                      bg="gray.900"
                      color="white"
                      _hover={{ bg: "black" }}
                      px={{ base: 10, md: 12 }}
                      borderRadius="lg"
                      isLoading={isUpdatingProfile}
                      isDisabled={isFetchingProfile || isUpdatingProfile}
                    >
                      Save Changes
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            </Stack>

            {/* RIGHT COLUMN: Snapshot + Impact Highlights */}
            <Stack spacing={5} flexBasis={{ base: "auto", xl: "360px" }} flexShrink={0} w="full">
              {/* Complete Your Registration (Prominent, No-Scroll) */}
              <Box
                borderWidth="1px"
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                bgGradient="linear(to-br, #53ACCB, #FF84D4)"
                color="white"
                boxShadow="xl"
              >
                <Stack spacing={3}>
                  <Heading size="sm">Complete Your Registration</Heading>
                  <Text opacity={0.95} fontSize="sm">
                    Finalise onboarding by choosing your path. Quick, 2–3 minutes.
                  </Text>

                  <SimpleGrid columns={2} spacing={3}>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      variant="solid"
                      bg="white"
                      color="gray.900"
                      _hover={{ bg: "whiteAlpha.900" }}
                      onClick={() => navigate("/register/medical")}
                      type="button"
                    >
                      Medical
                    </Button>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      variant="outline"
                      borderColor="whiteAlpha.800"
                      _hover={{ bg: "whiteAlpha.200" }}
                      onClick={() => navigate("/register/others")}
                      type="button"
                    >
                      Others
                    </Button>
                  </SimpleGrid>

                  <Flex align="center" gap={2}>
                    <Box w="10px" h="10px" bg="white" borderRadius="full" />
                    <Box w="10px" h="10px" bg="whiteAlpha.700" borderRadius="full" />
                    <Box w="10px" h="10px" bg="whiteAlpha.500" borderRadius="full" />
                    <Text fontSize="xs" opacity={0.9} ml="auto">
                      Step 1 of 2
                    </Text>
                  </Flex>
                </Stack>
              </Box>
              <Box borderWidth="1px" borderRadius="xl" p={6} bg="gray.50" _hover={{ borderColor: "pink.300", boxShadow: "lg" }}>
                <Stack spacing={3}>
                  <Heading size="sm">Account Snapshot</Heading>
                  <Text color="gray.600">Member since April 2024</Text>
                  <Badge colorScheme="purple" w="fit-content">Community Partner</Badge>
                  <Divider />
                  <Stack spacing={2}>
                    <Text fontSize="sm" color="gray.500">Profile completeness</Text>
                    <Progress value={72} colorScheme="pink" borderRadius="full" />
                  </Stack>
                </Stack>
              </Box>

             
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
