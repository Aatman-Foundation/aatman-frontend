import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Icon,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { LuClock, LuMessageCircle } from "react-icons/lu";

const contactChannels = [
  {
    icon: FiMapPin,
    heading: "Office",
    details: "342/15, Lucknow, Uttar Pradesh",
  },
  {
    icon: FiPhone,
    heading: "Call",
    details: "+91 78971 00929",
  },
  {
    icon: FiMail,
    heading: "Email",
    details: "shashank@aatmanfoundation.in",
  },
  {
    icon: LuClock,
    heading: "Office Hours",
    details: "Monday - Friday, 10:00 AM to 6:00 PM",
  },
];

function ContactUs() {
  const toast = useToast();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: "Message sent",
      description: "Our herbal care team will respond within two working days.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setFormValues({ name: "", email: "", organisation: "", message: "" });
  };

  return (
    <Box>
      <Box bgGradient="linear(to-r, brand.200, accent.200)" color="gray.900">
        <Container py={{ base: 12, md: 18 }}>
          <Stack spacing={5} textAlign="center" maxW="3xl" mx="auto">
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>Let’s co-create the next ritual</Heading>
            <Text fontSize={{ base: "md", md: "lg" }}>
              Whether you are a clinician exploring private-label formulations, a wellness brand planning an experience,
              or a journalist tracking herbal innovation — we would love to hear from you.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 16 }}>
          <Stack spacing={6}>
            <Heading size="lg">Ways to reach us</Heading>
            <Text color="gray.600">
              Our team bridges farms, labs, and partner locations. If you are enquiring about a specific collection or
              collaboration, mention the product or programme name for a quicker response.
            </Text>
            <VStack spacing={5} align="stretch">
              {contactChannels.map((channel) => (
                <HStack
                  key={channel.heading}
                  spacing={4}
                  bg="gray.50"
                  borderRadius="2xl"
                  p={{ base: 5, md: 6 }}
                  boxShadow="lg"
                  align="flex-start"
                >
                  <Icon as={channel.icon} boxSize={7} color="brand.500" />
                  <Stack spacing={1}>
                    <Text fontWeight="semibold">{channel.heading}</Text>
                    <Text color="gray.600">{channel.details}</Text>
                  </Stack>
                </HStack>
              ))}
            </VStack>
          </Stack>

          <Box as="form" onSubmit={handleSubmit} bg="white" borderRadius="2xl" boxShadow="2xl" p={{ base: 6, md: 8 }}>
            <Stack spacing={5}>
              <Heading size="md" display="flex" alignItems="center" gap={3}>
                <Icon as={LuMessageCircle} color="brand.500" />
                Send us a note
              </Heading>
              <FormControl isRequired>
                <FormLabel>Full name</FormLabel>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </FormControl>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Organisation</FormLabel>
                  <Input
                    name="organisation"
                    placeholder="Company / Collective"
                    value={formValues.organisation}
                    onChange={handleChange}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired>
                <FormLabel>How can we help?</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Tell us about your idea, partnership, or question"
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="accent" size="lg" alignSelf="flex-start">
                Send message
              </Button>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ContactUs;
