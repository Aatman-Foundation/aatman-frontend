import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Link,
  Input,
  Button,
  HStack,
  IconButton,
  Divider,
  Flex,
  Icon
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaLinkedin, FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Announcements", to: "/announcements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

// const focusAreas = [
//   "Health Systems Strengthening",
//   "Education & E-Learning",
//   "Community Research",
//   "Capacity Building",
//   "Policy Advocacy",
// ];

const socialLinks = [
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
  { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com" },
  { icon: FaXTwitter, label: "X", href: "https://www.twitter.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      bgGradient="linear(to-br, brand.900, #1a202c)"
      color="white"
      pt={{ base: 12, md: 16 }}
      pb={{ base: 8, md: 10 }}
    >
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 10, md: 14 }}>
          <Stack spacing={4}>
            <Heading size="md" color="white">
              Aatman Foundation
            </Heading>
            <Text color="whiteAlpha.800">
              We co-create equitable programmes in health and education, blending
              indigenous wisdom with modern research to unlock community-led
              change.
            </Text>
            <Button
              as={RouterLink}
              to="/about"
              colorScheme="accent"
              size="lg"
              w={{ base: "full", md: "auto" }}
            >
              Explore Programmes
            </Button>
          </Stack>

          <Stack spacing={3}>
            <Heading
              size="sm"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.900"
            >
              Quick Links
            </Heading>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                as={RouterLink}
                to={link.to}
                color="whiteAlpha.800"
                _hover={{ color: "white" }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          <Stack spacing={3}>
            <Heading
              size="sm"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.900"
            >
              Contact Info
            </Heading>

            <Stack spacing={3} pt={4} color="white">
              <HStack align="flex-start" spacing={3}>
                <Icon as={FiMapPin} boxSize={5} />
                <Text fontSize="sm" lineHeight="short" color="white">
                  342/15, Lucknow, Uttar Pradesh
                </Text>
              </HStack>

              <HStack align="flex-start" spacing={3}>
                <Icon as={FiPhone} boxSize={5} />
                <Text fontSize="sm" lineHeight="short" color="white">
                  +91 78971 00929
                </Text>
              </HStack>

              <HStack align="flex-start" spacing={3}>
                <Icon as={FiMail} boxSize={5} />
                <Text fontSize="sm" lineHeight="short" color="white">
                  shashank@aatmanfoundation.in
                </Text>
              </HStack>
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <Heading
              size="sm"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.900"
            >
              Stay Updated
            </Heading>
            <Text color="whiteAlpha.800">
              A curated digest on programmes, research, and upcoming collaborations delivered monthly.
            </Text>
            <HStack
              as="form"
              spacing={2}
              onSubmit={(event) => event.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Email address"
                bg="white"
                color="gray.800"
                _placeholder={{ color: "gray.500" }}
              />
              <Button type="submit" colorScheme="accent">
                Subscribe
              </Button>
            </HStack>
            <HStack spacing={3} pt={2}>
              {socialLinks.map((item) => (
                <IconButton
                  key={item.label}
                  as="a"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  icon={<item.icon />}
                  variant="ghost"
                  color="whiteAlpha.900"
                  _hover={{ bg: "whiteAlpha.200" }}
                />
              ))}
            </HStack>
          </Stack>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.300" my={{ base: 10, md: 14 }} />

        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
        >
          <Text color="whiteAlpha.700">
            © {year} Aatman Foundation. All rights reserved.
          </Text>
          <Text color="whiteAlpha.700">
            Crafted with purpose by Ridipt Technologies.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
