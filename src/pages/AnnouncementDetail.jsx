import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  Stack,
  HStack,
  Flex,
  Icon,
  Image,
  Button,
  Spinner,
  Center,
  Divider,
} from "@chakra-ui/react";
import { LuCalendarDays, LuArrowLeft, LuUsers } from "react-icons/lu";
import { fetchAnnouncementById } from "../api/announcements.js";

function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncementById(id)
      .then(setAnnouncement)
      .catch(() => setError("Announcement not found or no longer available."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Center py={32}>
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (error || !announcement) {
    return (
      <Container py={20}>
        <Center flexDir="column" gap={4}>
          <Text color="red.500" fontSize="lg">{error}</Text>
          <Button as={RouterLink} to="/announcements" leftIcon={<LuArrowLeft />} variant="ghost">
            Back to announcements
          </Button>
        </Center>
      </Container>
    );
  }

  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)" color="gray.900">
        <Container py={{ base: 10, md: 14 }}>
          <Button
            as={RouterLink}
            to="/announcements"
            leftIcon={<LuArrowLeft />}
            variant="ghost"
            colorScheme="blackAlpha"
            mb={6}
            size="sm"
          >
            All announcements
          </Button>
          <Stack spacing={4} maxW="3xl">
            <HStack spacing={3} flexWrap="wrap">
              <Badge colorScheme="brand" borderRadius="full" px={3} py={1}>
                {announcement.audience || "General"}
              </Badge>
            </HStack>
            <Heading fontSize={{ base: "2xl", md: "4xl" }}>{announcement.title}</Heading>
            <HStack spacing={5} color="gray.700" flexWrap="wrap">
              {announcement.eventDate && (
                <Flex align="center" gap={2}>
                  <Icon as={LuCalendarDays} />
                  <Text fontSize="sm">
                    {new Date(announcement.eventDate).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Flex>
              )}
              {announcement.audience && (
                <Flex align="center" gap={2}>
                  <Icon as={LuUsers} />
                  <Text fontSize="sm">{announcement.audience}</Text>
                </Flex>
              )}
              {announcement.venue && (
                <Flex align="center" gap={2}>
                  <Text fontSize="sm">📍 {announcement.venue}</Text>
                </Flex>
              )}
            </HStack>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 10, md: 14 }} maxW="3xl">
        <Stack spacing={6}>
          {announcement.imageUrl && (
            <Image
              src={announcement.imageUrl}
              alt={announcement.title}
              w="100%"
            />
          )}
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" whiteSpace="pre-wrap" lineHeight="tall">
            {announcement.description}
          </Text>

          {announcement.link && (
            <>
              <Divider />
              <Stack spacing={1}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Reference
                </Text>
                <Text
                  as="a"
                  href={announcement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  {announcement.link}
                </Text>
              </Stack>
            </>
          )}

          <Divider />
          <Button
            as={RouterLink}
            to="/announcements"
            leftIcon={<LuArrowLeft />}
            variant="outline"
            colorScheme="brand"
            alignSelf="flex-start"
          >
            Back to announcements
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnnouncementDetail;
