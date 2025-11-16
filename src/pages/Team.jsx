import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuAward, LuCompass, LuHeartHandshake, LuTarget, LuCircleCheck } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { teamMembers } from "../data/team.js";

const stats = [
  {
    icon: LuTarget,
    label: "Formulations Developed",
    value: "45",
    description: "Respiratory, metabolic, and hormone-balancing blends refined in our lab.",
  },
  {
    icon: LuAward,
    label: "Collective R&D Experience",
    value: "80+ years",
    description: "Across Ayurveda, pharmacognosy, regenerative agriculture, and wellness strategy.",
  },
  {
    icon: LuHeartHandshake,
    label: "Clinical & Wellness Partners",
    value: "120+",
    description: "Hospitals, resorts, and practitioners co-creating rituals with us.",
  },
  {
    icon: LuCompass,
    label: "Farmer Clusters Supported",
    value: "18 states",
    description: "Regenerative sourcing networks spanning the Himalayan foothills to the Western Ghats.",
  },
];

function Team() {
  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.100, accent.100)" color="gray.800" py={{ base: 16, md: 20 }}>
        <Container>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 10, lg: 16 }}>
            <Stack spacing={{ base: 4, md: 6 }} flex="1">
              <Badge colorScheme="accent" borderRadius="full" px={4} py={1} w="fit-content">
                The formulation collective
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                The minds cultivating future-ready herbals
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">
                Meet the formulation scientists, clinical leads, and experience curators behind Aatman Botanicals. They
                unite regenerative sourcing, rigorous research, and soulful storytelling to deliver plant medicine that
                works.
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Button as={RouterLink} to="/contact" colorScheme="accent" size="lg">
                  Partner with the board
                </Button>
                <Button as={RouterLink} to="/about" variant="ghost" size="lg">
                  Back to About Us
                </Button>
              </HStack>
            </Stack>
            <Flex flex="1" justify="center" position="relative" w="full" maxW="480px">
              <Box
                position="absolute"
                inset="0"
                bgGradient="linear(to-br, accent.200, brand.200)"
                opacity={0.35}
                filter="blur(70px)"
              />
              <Image
                src="https://res.cloudinary.com/dlsv90kui/image/upload/v1758615344/team-collage_ahw5cx.png"
                alt="Collage of Aatman Botanicals leaders"
                borderRadius="3xl"
                boxShadow="2xl"
                position="relative"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Container py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 6, md: 8 }}>
          {stats.map((stat) => (
            <Stack
              key={stat.label}
              spacing={3}
              bg="white"
              borderRadius="2xl"
              boxShadow="xl"
              p={{ base: 6, md: 8 }}
              border="1px solid"
              borderColor="brand.100"
            >
              <Icon as={stat.icon} boxSize={8} color="brand.500" />
              <Stack spacing={1}>
                <Heading size="lg" color="brand.600">
                  {stat.value}
                </Heading>
                <Text fontWeight="semibold">{stat.label}</Text>
              </Stack>
              <Text fontSize="sm" color="gray.600">
                {stat.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>

      <Container pb={{ base: 16, md: 24 }} mt={12}>
        <Stack spacing={{ base: 8, md: 12 }}>
          <Stack spacing={4} textAlign="center" maxW="3xl" mx="auto">
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>Meet the leadership team</Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
              Dive into the stories, strengths, and commitments of the people translating herbal wisdom into measurable
              outcomes.
            </Text>
          </Stack>
          <Stack spacing={{ base: 10, md: 12 }}>
            {teamMembers.map((member) => (
              <Stack
                key={member.id}
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 6, md: 10 }}
                bg="white"
                borderRadius="3xl"
                boxShadow="2xl"
                p={{ base: 6, md: 10 }}
              >
                <VStack spacing={4} align="center" w={{ base: "full", md: "280px" }} flexShrink={0}>
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      borderRadius="3xl"
                      boxSize={{ base: "220px", md: "240px" }}
                      objectFit="cover"
                      boxShadow="lg"
                    />
                  ) : (
                    <Avatar
                      name={member.name}
                      size="2xl"
                      bg="brand.200"
                      color="brand.600"
                      borderRadius="3xl"
                      boxShadow="lg"
                    />
                  )}
                  <Stack spacing={1} textAlign="center">
                    <Heading size="md">{member.name}</Heading>
                    <Text color="brand.500" fontWeight="medium">
                      {member.role}
                    </Text>
                  </Stack>
                </VStack>
                <Stack spacing={{ base: 4, md: 6 }} flex="1">
                  <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">
                    {member.shortBio}
                  </Text>
                  <Divider borderColor="brand.100" />
                  <Text color="gray.700">{member.longBio}</Text>
                  {member.highlights && (
                    <Stack spacing={3}>
                      <Heading size="sm" color="brand.600">
                        Highlights
                      </Heading>
                      <Stack spacing={2}>
                        {member.highlights.map((highlight) => (
                          <HStack key={highlight} align="flex-start" spacing={3}>
                            <Icon as={LuCircleCheck} color="accent.400" mt={1} />
                            <Text fontSize="sm" color="gray.700">
                              {highlight}
                            </Text>
                          </HStack>
                        ))}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Team;
