import React from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  LuGraduationCap,
  LuLightbulb,
  LuStethoscope,
} from "react-icons/lu";
import { FiHeart, FiUsers } from "react-icons/fi";
import UploadResearchModal from "../components/UploadResearchModal.jsx";

const focusAreas = [
  {
    title: "Integrative Health Systems",
    description:
      "Co-designing inclusive models that blend Ayurveda, Yoga, and public health to strengthen last-mile delivery.",
    icon: LuStethoscope,
  },
  {
    title: "Learning & Leadership",
    description:
      "Building the skills of educators, frontline workers, and youth to lead resilient, community-owned programmes.",
    icon: LuGraduationCap,
  },
  {
    title: "Research & Innovation",
    description:
      "Curating evidence, open repositories, and fellowships that champion indigenous knowledge and data equity.",
    icon: LuLightbulb,
  },
];

const initiatives = [
  {
    title: "Community Wellness Hubs",
    copy: "Mobile wellness hubs and teleconsultations that ensure preventive care, diagnostics, and referrals reach underserved geographies.",
  },
  {
    title: "Teacher Transformation Labs",
    copy: "Immersive mentoring, digital toolkits, and wellbeing coursework that enable educators to nurture confident learners.",
  },
  {
    title: "Evidence-for-Impact Studio",
    copy: "Collaborative research residencies and knowledge exchanges translating field insights into policy-ready playbooks.",
  },
];

const highlights = [
  {
    badge: "Spotlight",
    title: "Launch of Aatman Research Fellowship 2025",
    description:
      "Applications are open for multidisciplinary fellows eager to document and scale integrative health models.",
    action: "/announcements",
  },
  {
    badge: "Resource",
    title: "Open Repository on School Health",
    description:
      "A curated knowledge base featuring lesson plans, assessment tools, and implementation guides for government schools.",
    action: "/gallery",
  },
];

function HomePage() {
  return (
    <Box>
      <Box
        position="relative"
        overflow="hidden"
        bgGradient="linear(to-r, #cbe5ff, #f9cdfc)"
      >
        <Box
          position="absolute"
          inset="0"
          bg="radial-gradient(circle at 15% 22%, rgba(255, 255, 255, 0.85), transparent 58%)"
          opacity={0.95}
          
        />
        <Box
          position="absolute"
          top={{ base: "-40", md: "-48" }}
          right={{ base: "-28", md: "-40" }}
          w={{ base: "72", md: "96" }}
          h={{ base: "72", md: "96" }}
          rounded="full"
          bgGradient="linear(to-br, rgba(255, 132, 209, 0.42), rgba(107, 182, 255, 0.38))"
          filter="blur(140px)"
          opacity={0.7}
        />
        <Container py={{ base: 16, md: 24 }} position="relative" zIndex={1}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={{ base: 12, lg: 16 }}
            justify="space-between"
          >
            <Stack
              spacing={{ base: 6, md: 8 }}
              flex={{ base: "1", lg: "0 0 600px", xl: "0 0 640px" }}
              maxW={{ lg: "600px", xl: "640px" }}
            >
              <Badge
                bg="accent.300"
                color="white"
                borderRadius="full"
                alignSelf="flex-start"
                px={4}
                py={1}
                fontWeight="semibold"
                fontSize="sm"
                letterSpacing="wider"
                textTransform="uppercase"
                boxShadow="md"
              >
                Inclusive wellbeing for every community
              </Badge>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                lineHeight="1.05"
                color="#1c1234"
                fontWeight="extrabold"
              >
                Empowering People. Strengthening Systems
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="rgba(54, 60, 92, 0.85)"
                lineHeight={{ base: "1.7", md: "1.8" }}
              >
                At Aatman Foundation, we are committed to driving sustainable impact in the education and healthcare sectors through innovative programs, capacity building, and research-led solutions. Backed by a team of seasoned professionals from diverse fields, we focus on developing people, strengthening systems, and nurturing the next generation of ethical and empowered leaders. With a deep commitment to inclusion, innovation, and impact, we work at the intersection of grassroots engagernent and strategic development— creating scalable solutions that transform lives and communities.
              </Text>
              <HStack spacing={{ base: 4, md: 6 }} flexWrap="wrap">
                <Button
                  as={RouterLink}
                  to="/register"
                  size="lg"
                  bgGradient="linear(to-r, #ff4ebc, #ff7cc7)"
                  color="white"
                  boxShadow="xl"
                  leftIcon={<FiHeart />}
                  _hover={{
                    bgGradient: "linear(to-r, #ff5fca, #ff8ed5)",
                    boxShadow: "2xl",
                    transform: "translateY(-2px)",
                  }}
                >
                  Become a partner
                </Button>
                <Button
                  as={RouterLink}
                  to="/about"
                  variant="ghost"
                  size="lg"
                  color="#3f51b5"
                  leftIcon={<FiUsers />}
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.55)",
                    transform: "translateY(-2px)",
                  }}
                >
                  Meet our community
                </Button>
              </HStack>
            </Stack>
            <Box
              flex="1"
              position="relative"
              w="full"
              ml={{ base: 0, lg: 16, xl: 24 }}
            >
              <Box
                position="absolute"
                inset={{ base: "-10", md: "-14" }}
                bgGradient="linear(to-br, rgba(107, 182, 255, 0.4), rgba(255, 153, 219, 0.45))"
                borderRadius="3xl"
                opacity={0.5}
                filter="blur(65px)"
              />
              <Image
                src="https://res.cloudinary.com/dlsv90kui/image/upload/v1757305624/image-removebg-preview_kpzygc.png"
                alt="Aatman Foundation illustration"
                position="relative"
                zIndex={1}
                mx="auto"
                maxW={{ base: "240px", md: "320px", lg: "360px" }}
                filter="drop-shadow(0 16px 28px rgba(143, 99, 203, 0.25))"
              />
              <Box
                position="absolute"
                top={{ base: "-6", md: "-8" }}
                left={{ base: "-10", md: "-12" }}
                w={{ base: "40", md: "48" }}
                h={{ base: "40", md: "48" }}
                rounded="full"
                bgGradient="linear(to-br, rgba(107, 182, 255, 0.5), rgba(255, 168, 216, 0.45))"
                filter="blur(80px)"
                opacity={0.8}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container py={{ base: 14, md: 20 }}>
        <Stack spacing={{ base: 10, md: 14 }}>
          <Stack spacing={4} textAlign="center" maxW="3xl" mx="auto">
            <Heading>Our Core Focus</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              We listen deeply and co-create solutions that honour local
              knowledge, bring scientific rigour, and ensure communities can
              sustain progress beyond programme cycles.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
            {focusAreas.map((area) => (
              <Stack
                key={area.title}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                p={{ base: 6, md: 8 }}
                spacing={4}
              >
                <Icon as={area.icon} boxSize={10} color="brand.500" />
                <Heading size="md">{area.title}</Heading>
                <Text>{area.description}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      <Box bg="white" py={{ base: 12, md: 16 }}>
        <Container>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="stretch"
            gap={{ base: 8, md: 12 }}
          >
            <Stack flex="1" spacing={5}>
              <Badge
                colorScheme="accent"
                borderRadius="full"
                px={3}
                py={1}
                w="fit-content"
              >
                Initiatives
              </Badge>
              <Heading size="lg">Programmes that travel the last mile</Heading>
              <Text color="gray.600">
                Each initiative is co-created with frontline workers, local
                governments, and youth champions to ensure lasting ownership
                beyond project timelines.
              </Text>
              <UploadResearchModal>
                {(onOpen) => (
                  <Button
                    leftIcon={<FiHeart />}
                    alignSelf="flex-start"
                    onClick={onOpen}
                    colorScheme="accent"
                  >
                    Submit a community story
                  </Button>
                )}
              </UploadResearchModal>
            </Stack>

            <Stack flex="2" spacing={{ base: 6, md: 8 }}>
              {initiatives.map((initiative) => (
                <Stack
                  key={initiative.title}
                  spacing={3}
                  bg="gray.50"
                  borderRadius="2xl"
                  p={{ base: 5, md: 6 }}
                  boxShadow="md"
                >
                  <Heading size="md">{initiative.title}</Heading>
                  <Text color="gray.600">{initiative.copy}</Text>
                </Stack>
              ))}
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Box bg="gray.50" py={{ base: 12, md: 16 }}>
        <Container>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
            {highlights.map((item) => (
              <Stack
                key={item.title}
                spacing={4}
                borderRadius="2xl"
                bg="white"
                boxShadow="lg"
                p={{ base: 6, md: 7 }}
              >
                <Badge colorScheme="brand" w="fit-content" borderRadius="full">
                  {item.badge}
                </Badge>
                <Heading size="md">{item.title}</Heading>
                <Text color="gray.600">{item.description}</Text>
                <Button
                  variant="ghost"
                  colorScheme="brand"
                  alignSelf="flex-start"
                  as={RouterLink}
                  to={item.action}
                >
                  Learn more
                </Button>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box
        bgGradient="linear(to-r, rgba(255, 142, 213, 0.95), rgba(127, 179, 255, 0.95))"
        py={{ base: 14, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          bgGradient="radial(circle at top left, rgba(255, 255, 255, 0.25), transparent 45%)"
        />
        <Container position="relative" zIndex={1}>
          <Stack
            spacing={{ base: 6, md: 8 }}
            textAlign="center"
            color="white"
            maxW="4xl"
            mx="auto"
          >
            <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="white">
              Join the movement for dignified, community-owned change.
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.900">
              Volunteer, contribute resources, or co-create programmes with us. Together we can close gaps in health,
              education, and livelihoods.
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 4, sm: 5 }}
              justify="center"
              align="center"
            >
              <Button
                leftIcon={<FiHeart />}
                size="lg"
                bg="white"
                color="#d13bb4"
                _hover={{
                  bg: "whiteAlpha.900",
                  transform: "translateY(-2px)",
                }}
              >
                Start a conversation
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.800"
                _hover={{ bg: "whiteAlpha.200", borderColor: "white" }}
              >
                Become a member
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
