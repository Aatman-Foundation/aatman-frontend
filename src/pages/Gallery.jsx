import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  AspectRatio,
  Badge,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    title: "Bloom Respiratory Ritual",
    description:
      "Steam inhalation blends, Tulsi tonics, and herbal lozenges used in our respiratory resilience kits.",
    palette: ["#53ACCB", "#95D9E6"],
    tag: "Respiratory",
  },
  {
    id: 2,
    title: "AdaptEase Capsule Line",
    description:
      "Ashwagandha, Gotu Kola, and Tagar micro-encapsulated for delayed release and better absorption.",
    palette: ["#FF84D4", "#FFC2E8"],
    tag: "Adaptogens",
  },
  {
    id: 3,
    title: "RheumEase Therapy Bar",
    description:
      "Warm oil bar displaying essential oils, decoctions, and gua sha tools for joint & bone support.",
    palette: ["#8BC34A", "#C5E99B"],
    tag: "Joint Care",
  },
  {
    id: 4,
    title: "Women's Vitality Atelier",
    description:
      "Shatavari tonics, rose elixirs, and mineral blends curated for hormonal harmony.",
    palette: ["#FFB74D", "#FFE0B2"],
    tag: "Women's Health",
  },
  {
    id: 5,
    title: "Herbarium & Ingredient Library",
    description:
      "Traceability wall featuring dried botanicals, soil reports, and farmer profiles from our network.",
    palette: ["#6A4C93", "#B39DDB"],
    tag: "Source",
  },
  {
    id: 6,
    title: "Lab & Sensory Studio",
    description:
      "Visitors sample teas, balms, and aroma concentrates while viewing live chromatography results.",
    palette: ["#00ACC1", "#80DEEA"],
    tag: "Experience",
  },
];

function Gallery() {
  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)">
        <Container py={{ base: 12, md: 18 }}>
          <Stack spacing={5} textAlign="center" maxW="3xl" mx="auto" color="gray.900">
            <Badge colorScheme="accent" borderRadius="full" px={4} py={1} alignSelf="center">
              Apothecary visuals
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>Inside our formulation studio</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              A visual walkthrough of the rituals, ingredients, and spaces that bring Aatman Botanicals to life. High-resolution
              images and films are added every season as new collections launch.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
          {galleryItems.map((item) => (
            <Stack key={item.id} spacing={4} bg="white" borderRadius="2xl" boxShadow="xl" overflow="hidden">
              <AspectRatio ratio={4 / 3}>
                <Box
                  bgGradient={`linear(to-br, ${item.palette[0]}, ${item.palette[1]})`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  textAlign="center"
                  px={6}
                  fontWeight="semibold"
                >
                  <Text>
                    Visual story placeholder
                    <br />
                    {item.title}
                  </Text>
                </Box>
              </AspectRatio>
              <Stack spacing={3} px={{ base: 5, md: 6 }} pb={{ base: 5, md: 6 }} pt={2}>
                <HStack spacing={3}>
                  <Badge colorScheme="brand">{item.tag}</Badge>
                  <Badge variant="subtle">Series {item.id.toString().padStart(2, "0")}</Badge>
                </HStack>
                <Heading size="md">{item.title}</Heading>
                <Text color="gray.700">{item.description}</Text>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>

        <Stack
          mt={{ base: 12, md: 16 }}
          bg="gray.50"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          spacing={4}
          align={{ base: "stretch", md: "center" }}
          direction={{ base: "column", md: "row" }}
          boxShadow="lg"
          justify="space-between"
        >
          <Stack spacing={2} textAlign={{ base: "left", md: "left" }}>
            <Heading size="md">Host a sensory showcase?</Heading>
            <Text color="gray.600">
              Write to shashank@aatmanfoundation.in with your venue details and audience profile. We curate pop-up bars,
              healing circles, and taste journeys throughout the year.
            </Text>
          </Stack>
          <Button as="a" href="mailto:shashank@aatmanfoundation.in" colorScheme="accent">
            Plan an experience
          </Button>
        </Stack>
      </Container>

      <Box pb={{ base: 16, md: 24 }}>
        <Container>
          <Stack spacing={4} textAlign="center" maxW="3xl" mx="auto">
            <Heading>Film and documentation partners</Heading>
            <Text color="gray.600">
              We collaborate with photographers and filmmakers who love botanical aesthetics. Reach out if you would like
              to co-create product stories, harvest chronicles, or practitioner diaries.
            </Text>
            <Button as={RouterLink} to="/contact" colorScheme="brand" variant="outline" alignSelf="center">
              Collaborate on storytelling
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Gallery;
