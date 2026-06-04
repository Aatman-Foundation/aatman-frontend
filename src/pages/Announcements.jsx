import { useEffect, useState } from "react";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCalendarDays, LuMegaphone, LuArrowRight } from "react-icons/lu";
import { Link as RouterLink } from "react-router-dom";
import { fetchAnnouncements } from "../api/announcements.js";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(() => setError("Failed to load announcements. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)" color="gray.900">
        <Container py={{ base: 12, md: 18 }}>
          <Stack spacing={5} textAlign="center" maxW="3xl" mx="auto">
            <Badge colorScheme="accent" borderRadius="full" px={4} py={1} alignSelf="center">
              Latest updates
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>
              Releases, residencies & research calls
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Stay informed on product drops, practitioner programmes, and collaborative research
              opportunities from the Aatman Botanicals lab.
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
        {loading ? (
          <Center py={20}>
            <Spinner size="xl" color="brand.500" />
          </Center>
        ) : error ? (
          <Center py={20}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : announcements.length === 0 ? (
          <Center py={20}>
            <Text color="gray.500">No announcements at the moment. Check back soon.</Text>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 6 }}>
            {announcements.map((item, index) => (
              <Stack
                key={item._id}
                spacing={0}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                overflow="hidden"
              >
                <AspectRatio ratio={16 / 9}>
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} objectFit="cover" />
                  ) : (
                    <Box bgGradient="linear(to-br, brand.200, accent.200)" display="flex" alignItems="center" justifyContent="center">
                      <Icon as={LuMegaphone} boxSize={8} color="brand.600" opacity={0.4} />
                    </Box>
                  )}
                </AspectRatio>
                <Stack spacing={3} p={4}>
                <HStack spacing={2}>
                  <Badge colorScheme="brand" borderRadius="full" px={2} fontSize="xs" textTransform="capitalize">
                    {item.audience || "General"}
                  </Badge>
                  <Text fontSize="xs" textTransform="uppercase" color="gray.400" letterSpacing="wide">
                    #{String(index + 1).padStart(2, "0")}
                  </Text>
                </HStack>
                <Heading size="sm">{item.title}</Heading>
                <Text color="gray.600" noOfLines={2} fontSize="sm">
                  {item.description}
                </Text>
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
                <Button
                  as={RouterLink}
                  to={`/announcements/${item._id}`}
                  variant="ghost"
                  colorScheme="brand"
                  rightIcon={<LuArrowRight />}
                  alignSelf="flex-start"
                  size="xs"
                  px={0}
                >
                  Read more
                </Button>
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        )}

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
              Email shashank@aatmanfoundation.in with your case summaries, event listings, or
              partnership ideas. The bulletin is refreshed every Friday.
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
