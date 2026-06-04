import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  SimpleGrid,
  Stack,
  AspectRatio,
  Badge,
  HStack,
  Button,
  Image,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { LuCalendarDays } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import apiClient from "../api/client.js";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/public/gallery")
      .then((res) => {
        const items = Array.isArray(res.data?.data) ? res.data.data : [];
        setGalleryItems(items);
      })
      .catch((err) => { console.error("Gallery fetch error:", err?.response?.status, err?.message); setGalleryItems([]); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)">
        <Container py={{ base: 12, md: 18 }}>
          <Stack spacing={5} textAlign="center" maxW="3xl" mx="auto" color="gray.900">
            <Badge colorScheme="accent" borderRadius="full" px={4} py={1} alignSelf="center">
              Gallery
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>Our moments</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              A visual walkthrough of the events, activities, and spaces that bring Aatman Foundation to life.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 12, md: 16 }}>
        {loading ? (
          <Center py={16}>
            <Spinner size="xl" color="brand.500" />
          </Center>
        ) : galleryItems.length === 0 ? (
          <Center py={16}>
            <Text color="gray.500">No gallery items yet.</Text>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
            {galleryItems.map((item, index) => (
              <Stack
                key={item._id || index}
                spacing={0}
                bg="white"
                borderRadius="2xl"
                boxShadow="xl"
                overflow="hidden"
              >
                <AspectRatio ratio={4 / 3}>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                    />
                  ) : (
                    <Box
                      bgGradient="linear(to-br, brand.200, accent.200)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="gray.700"
                      textAlign="center"
                      px={6}
                      fontWeight="semibold"
                    >
                      <Text>{item.title}</Text>
                    </Box>
                  )}
                </AspectRatio>

                <Stack spacing={2} px={{ base: 5, md: 6 }} pb={{ base: 5, md: 6 }} pt={4}>
                  <Heading size="sm">{item.title}</Heading>
                  {item.eventDate && (
                    <Flex align="center" gap={1} color="brand.600">
                      <Icon as={LuCalendarDays} boxSize={3} />
                      <Text fontSize="xs" fontWeight="medium">
                        {new Date(item.eventDate).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </Flex>
                  )}
                  {item.venue && (
                    <Text fontSize="xs" color="gray.500">{item.venue}</Text>
                  )}
                  {item.description ? (
                    <Text color="gray.600" fontSize="sm">
                      {item.description}
                    </Text>
                  ) : null}
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        )}

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
          <Stack spacing={2}>
            <Heading size="md">Host a sensory showcase?</Heading>
            <Text color="gray.600">
              Write to shashank@aatmanfoundation.in with your venue details and audience profile.
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
