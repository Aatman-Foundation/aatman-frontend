import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Stack,
  HStack,
  Flex,
  Icon,
  Button,
} from "@chakra-ui/react";
import { LuCalendarDays, LuMapPin, LuMegaphone } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";

const announcements = [
  {
    id: 1,
    title: "Launch: Tulsi+ Lung Guard Syrup",
    summary:
      "Our flagship respiratory formulation is now available for clinics with QR-enabled batch reports and patient education leaflets.",
    date: "From 18 March 2025",
    location: "PAN India Distribution",
    status: "New",
  },
  {
    id: 2,
    title: "Clinical Residency on Adaptogens",
    summary:
      "Two-day immersion for doctors and therapists exploring adaptogenic stacks, dosage personalisation, and case documentation.",
    date: "Apply by 30 April 2025",
    location: "Lucknow Formulation Lab",
    status: "Enroll",
  },
  {
    id: 3,
    title: "Traceability Dashboard 2.0",
    summary:
      "We have refreshed our digital dashboard with soil metrics, farmer stories, and lab data accessible via product QR codes.",
    date: "Live from 05 April 2025",
    location: "Online",
    status: "Update",
  },
  {
    id: 4,
    title: "Practitioner Research Collective",
    summary:
      "Monthly working group to co-author whitepapers on herbal interventions for PCOS, long-COVID, and autoimmune conditions.",
    date: "April – December 2025",
    location: "Hybrid (Virtual + Lab)",
    status: "Apply",
  },
];

function Announcements() {
  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)" color="gray.900">
        <Container py={{ base: 12, md: 18 }}>
          <Stack spacing={5} textAlign="center" maxW="3xl" mx="auto">
            <Badge colorScheme="accent" borderRadius="full" px={4} py={1} alignSelf="center">
              Formulation news
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>Releases, residencies & research calls</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Stay informed on product drops, practitioner programmes, and collaborative research opportunities from the
              Aatman Botanicals lab.
            </Text>
            <Button
              as={RouterLink}
              to="/contact"
              variant="outline"
              colorScheme="blackAlpha"
              alignSelf="center"
              leftIcon={<LuMegaphone />}
            >
              Submit your announcement
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }}>
          {announcements.map((item) => (
            <Stack key={item.id} spacing={5} bg="white" borderRadius="2xl" boxShadow="xl" p={{ base: 6, md: 7 }}>
              <HStack spacing={3}>
                <Badge colorScheme="brand" borderRadius="full" px={3} py={1} textTransform="capitalize">
                  {item.status}
                </Badge>
                <Text fontSize="sm" letterSpacing="widest" textTransform="uppercase" color="gray.500">
                  Engagement {item.id.toString().padStart(2, "0")}
                </Text>
              </HStack>
              <Heading size="md">{item.title}</Heading>
              <Text color="gray.700">{item.summary}</Text>
              <Stack spacing={2} color="gray.600" fontWeight="medium">
                <Flex align="center" gap={2}>
                  <Icon as={LuCalendarDays} color="brand.500" />
                  <Text>{item.date}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Icon as={LuMapPin} color="brand.500" />
                  <Text>{item.location}</Text>
                </Flex>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 8 }}
          mt={{ base: 12, md: 16 }}
          align="center"
          justify="space-between"
          bg="gray.50"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          boxShadow="lg"
        >
          <Stack spacing={2} textAlign={{ base: "center", md: "left" }}>
              <Heading size="md">Share your launch or clinical insight</Heading>
            <Text color="gray.600">
              Email shashank@aatmanfoundation.in with your case summaries, event listings, or partnership ideas. The
              bulletin is refreshed every Friday.
            </Text>
          </Stack>
          <Button as="a" href="mailto:shashank@aatmanfoundation.in" colorScheme="accent">
            Email the lab
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Announcements;
