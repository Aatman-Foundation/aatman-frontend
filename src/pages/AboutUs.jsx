import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { teamMembers } from "../data/team.js";
import {
  LuGraduationCap,
  LuClipboardCheck,
  LuLaptop,
  LuDatabase,
  LuCalendarDays,
  LuBookOpen,
  LuUsers,
  LuStethoscope,
  LuFileText,
} from "react-icons/lu";
import { FiHeart, FiUsers } from "react-icons/fi";

const highlightCards = [
  {
    label: "Expert-led Partnerships",
    copy: "Guided by leaders across public health, education, technology, and social impact.",
  },
  {
    label: "Evidence-first Approach",
    copy: "Designing interventions rooted in data, research, and lived community wisdom.",
  },
  {
    label: "Lasting Outcomes",
    copy: "Building resilient ecosystems that thrive long after programmes conclude.",
  },
];

const focusAreas = [
  {
    icon: LuGraduationCap,
    title: "Capacity Building",
    description:
      "We design and deliver training programmes, leadership workshops, and professional development initiatives for teachers, healthcare workers, students, and institutions.",
    highlights: [
      "Tailored workshops for schools, colleges, and hospitals",
      "Teacher/Doctor training on digital tools, pedagogy, clinical skills, and management",
      "Certification programmes in collaboration with expert bodies",
    ],
  },
  {
    icon: LuClipboardCheck,
    title: "Healthcare & Education Consulting",
    description:
      "We provide end-to-end consulting services for institutions, organisations, and government bodies.",
    highlights: [
      "Gap analysis & needs assessment",
      "Policy & strategy formulation",
      "Monitoring & evaluation (M&E) frameworks",
      "Advisory for implementing scalable healthcare and education programmes",
    ],
  },
  {
    icon: LuLaptop,
    title: "E-Learning Solutions",
    description:
      "Our e-learning wing supports lifelong learning through digital platforms.",
    highlights: [
      "Self-paced learning modules for professionals",
      "Custom-built learning management systems",
      "Virtual classrooms & webinars",
      "Online certification & skill enhancement courses",
    ],
  },
  {
    icon: LuDatabase,
    title: "Research & Knowledge Repository",
    description:
      "We believe in evidence-based action and curate a digital library of sector-specific research.",
    highlights: [
      "Upload & access research papers, case studies, white papers",
      "Thematic sections across education, public health, Ayurveda, pharma research, and social policy",
      "Peer-reviewed contributions and open resources",
      "Downloadable assets for registered members",
    ],
  },
  {
    icon: LuCalendarDays,
    title: "Events & Conferences",
    description:
      "We convene experts, researchers, and practitioners to learn, network, and innovate together.",
    highlights: [
      "National & international conferences",
      "Roundtable discussions & policy dialogues",
      "Workshops & masterclasses",
      "Annual Aatman Excellence Awards for outstanding contributions",
    ],
  },
];

const advisoryBoardMembers = [
  {
    id: "rakesh_sharma",
    name: "Vaidya Dr. Rakesh Sharma",
    designation: "M.D. (Ayurveda), Ph.D. Guide (Kayachikitsa)",
    bio: [
      "Vaidya Dr. Rakesh Sharma is a distinguished Ayurvedic physician, academician, and administrator with over four decades of experience in Ayurveda and public health governance. A postgraduate in Ayurveda (M.D. - Kayachikitsa) and a recognized Ph.D. guide, he has championed the advancement, regulation, and ethical practice of Indian systems of medicine in India.",
      "Dr. Sharma has served with the Government of Punjab in eminent roles, including Director, Ayurveda, and Director, Punjab Health Systems Corporation, where he strengthened institutional Ayurveda, policy formulation, and integration of traditional medicine with the public health system.",
      "He currently serves as the President, Board of Ethics and Registration for Indian Systems of Medicine, and as a member of the National Commission for Indian System of Medicine (NCISM), the apex statutory body for education, regulation, and professional standards in Ayurveda and allied systems.",
      "As part of the Advisory Board of Aatman Foundation, he continues to guide strategic initiatives in education, training, and national collaborations that strengthen Ayurveda and holistic healthcare across India.",
    ],
  },
  {
    id: "ss_tripathi",
    name: "Dr. Shiv Shankar Tripathi (Rajvaidya)",
    designation: null,
    bio: [
      "A veteran Ayurveda physician and scholar, Dr. S. S. Tripathi has served as Incharge Medical Officer (Ayurveda) at Raj Bhawan, Uttar Pradesh, and Advisor to the National AYUSH Mission (U.P.).",
      "With over 40 years of clinical practice, institutional management, and Ayurveda research, he provides strategic guidance to Aatman Foundation's training programs, traditional health education initiatives, and professional workshops for practitioners and academicians.",
    ],
  },
  {
    id: "tarachand_sharma",
    name: "Vaidya Tarachand Sharma",
    designation: "M.D. (Ayurveda)",
    bio: [
      "Vaidya Tarachand Sharma is a revered figure in Ayurveda, with a career spanning five decades dedicated to teaching, research, and clinical excellence.",
      "He currently serves as the President of the All India Ayurveda Vidyapeeth and Head of the Department of Ayurveda at Model Eye Hospital, Lajpat Nagar, New Delhi, delivering lectures and keynote addresses across India and abroad on critical and complex diseases.",
      "With more than 20 research papers published nationally and internationally, he remains a distinguished speaker for CCRAS, CCIM, and Rashtriya Ayurveda Vidyapeeth, inspiring practitioners, scholars, and students alike.",
    ],
  },
  {
    id: "adarsh_kumar",
    name: "Vd. Adarsh Kumar",
    designation: "M.D. (Kayachikitsa), Ph.D. (Kayachikitsa)",
    bio: [
      "Dr. Adarsh Kumar is a distinguished Ayurvedic physician, academician, and researcher with deep experience in clinical practice, policy, and institutional leadership.",
      "A retired Assistant Director (Ayurveda) from CCRAS, Ministry of AYUSH, Government of India, he has been instrumental in promoting evidence-based Ayurvedic research and education.",
      "Currently serving as Consultant (Ayurveda) at the HRD Cell, CCRAS, New Delhi, he focuses on training, capacity building, and human resource development while guiding Aatman Foundation to integrate classical Ayurvedic wisdom with modern holistic well-being.",
    ],
  },
  {
    id: "awadhesh_srivastava",
    name: "Vaidya Awadhesh Kumar Srivastava",
    designation: null,
    bio: [
      "Vaidya Awadhesh Kumar Srivastava is a respected Ayurveda professional with over 45 years of service across education, government policy, and institutional governance.",
      "His experience spans curriculum design, policy formulation, and national Ayurveda initiatives, and he continues to guide Aatman Foundation's training and development programs in alignment with National AYUSH Mission objectives.",
    ],
  },
  {
    id: "ajay_plaha",
    name: "Mr. Ajay Plaha",
    designation: null,
    bio: [
      "As the CEO of Trilogy Consultancy and Honorary Advisor, BRICS CCI healthcare vertical, Mr. Ajay Plaha is an expert in Ayurveda, wellness, and cosmetics with deep insights into policy advocacy and public-private partnerships.",
      "He has led national and international conferences, workshops, and exhibitions promoting Ayurveda and Indian traditional health systems, strengthening Aatman Foundation's ability to scale wellness and Ayurveda initiatives nationwide.",
    ],
  },
  {
    id: "digvijay_pandey",
    name: "Mr. Digvijay Pandey",
    designation: null,
    bio: [
      "Mr. Digvijay Pandey is a seasoned education and leadership trainer with over two decades of experience in teacher development, leadership enhancement, and institutional transformation programs.",
      "Known for his engaging, hands-on methodology, he reinforces Aatman Foundation's mission to nurture effective educational leadership across India.",
    ],
  },
  {
    id: "ram_krishna_mishra",
    name: "Mr. Ram Krishna Mishra",
    designation: null,
    bio: [
      "Mr. Ram Krishna Mishra is an ex-paramilitary professional with over 15 years of experience in education, leadership, and human resource development.",
      "Holding a Master's degree in Social Work, he is known for transformative sessions on leadership consciousness, emotional intelligence, and capacity building for teachers and administrative officers, helping Aatman Foundation develop purpose-driven leaders.",
    ],
  },
  {
    id: "sharaleepa_majumder",
    name: "Ms. Sharaleepa Majumder",
    designation: null,
    bio: [
      "With a Bachelor's in Education specializing in Cognitive Science and a Master's in Microbiology, Ms. Sharaleepa Majumder blends scientific and pedagogical expertise.",
      "She designs and conducts workshops on cognitive learning, inclusive education, and capacity building, empowering educators to adopt evidence-based, inclusive classroom practices.",
    ],
  },
  {
    id: "abhishek_sharma",
    name: "Mr. Abhishek Sharma",
    designation: null,
    bio: [
      "Mr. Abhishek Sharma is a dynamic training professional with a Master's in Management and certification as an NEP trainer.",
      "Recognized for high-energy delivery and youth-focused approaches, he drives educational innovation, skill development, and NEP 2020 implementation, adding a contemporary edge to the Foundation's outreach.",
    ],
  },
];

function AboutUs() {
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
                About Aatman Foundation
              </Badge>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                lineHeight="1.05"
                color="#1c1234"
                fontWeight="extrabold"
              >
                Building dignity-centred ecosystems
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="rgba(54, 60, 92, 0.85)"
                lineHeight={{ base: "1.7", md: "1.8" }}
              >
                The Aatman Foundation is a forward-looking, impact-driven
                organization committed to advancing transformative change in the
                education and healthcare sectors. With a team of seasoned
                professionals from diverse domains—including public policy,
                program management, research, and grassroots implementation—the
                Foundation brings together over a decade of collective expertise
                to design and deliver high-impact development initiatives.
              </Text>
              <Stack
                spacing={{ base: 4, md: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Button
                  as={RouterLink}
                  to="/contact"
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
                  Collaborate with us
                </Button>
                <Button
                  as={RouterLink}
                  to="/team"
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
              </Stack>
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
        <Stack
          position="relative"
          spacing={{ base: 10, md: 12 }}
          bg="white"
          borderRadius="3xl"
          boxShadow="2xl"
          border="1px solid"
          borderColor="brand.100"
          px={{ base: 6, md: 10 }}
          py={{ base: 10, md: 14 }}
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-120px"
            right="-80px"
            w="260px"
            h="260px"
            bgGradient="radial(brand.200 0%, transparent 70%)"
            opacity={0.4}
            filter="blur(60px)"
          />
          <Box
            position="absolute"
            bottom="-140px"
            left="-100px"
            w="320px"
            h="320px"
            bgGradient="radial(accent.200 0%, transparent 70%)"
            opacity={0.25}
            filter="blur(70px)"
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} zIndex={1}>
            <Stack spacing={5} textAlign={{ base: "center", md: "left" }}>
              <Badge alignSelf={{ base: "center", md: "flex-start" }} colorScheme="accent" borderRadius="full" px={4} py={1}>
                What We Are
              </Badge>
              <Heading fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.2">
                Building trust through collaboration and stewardship
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                The Foundation exists to convene practitioners, researchers, and community voices on one table.
                We operationalise programmes with deep respect for the cultural, ecological, and emotional contexts
                of the people we serve.
              </Text>
            </Stack>

            <Stack spacing={5} textAlign={{ base: "center", md: "left" }}>
              <Badge alignSelf={{ base: "center", md: "flex-start" }} colorScheme="brand" borderRadius="full" px={4} py={1}>
                Our Mission
              </Badge>
              <Heading fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.2">
                Strengthening capacities with knowledge, training, and resources
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                We empower individuals, institutions, and systems through tailored capacity-building,
                evidence-led consulting, and accessible resources. By co-creating strategies with stakeholders,
                we ensure sustainable, community-rooted solutions that drive dignity-centred outcomes.
              </Text>
            </Stack>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 10 }} zIndex={1}>
            {highlightCards.map((item) => (
              <Stack
                key={item.label}
                spacing={3}
                bg="gray.50"
                borderRadius="2xl"
                p={{ base: 5, md: 6 }}
                border="1px solid"
                borderColor="brand.100"
                boxShadow="lg"
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading size="sm" color="brand.600">
                  {item.label}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {item.copy}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      <Box bg="white" py={{ base: 14, md: 20 }}>
        <Container>
          <Stack spacing={{ base: 8, md: 12 }}>
            <Stack textAlign="center" spacing={3} maxW="3xl" mx="auto">
              <Heading fontSize={{ base: "3xl", md: "4xl" }}>Our Values</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                We stay anchored by principles that keep every collaboration focused on trust, inclusion, and lasting change.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
              {values.map((value) => (
                <Stack
                  key={value.title}
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 5, md: 6 }}
                  bg="gray.50"
                  borderRadius="2xl"
                  boxShadow="lg"
                  p={{ base: 6, md: 8 }}
                  align="center"
                >
                  <Icon as={value.icon} boxSize={10} color="brand.600" />
                  <Stack spacing={2} textAlign={{ base: "center", md: "left" }}>
                    <Heading size="md" color="brand.700">
                      {value.title}
                    </Heading>
                    <Text color="gray.600">{value.description}</Text>
                  </Stack>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Box bg="gray.50" py={{ base: 14, md: 20 }}>
        <Container>
          <Stack spacing={{ base: 8, md: 12 }}>
            <Stack textAlign="center" spacing={3} maxW="3xl" mx="auto">
              <Heading fontSize={{ base: "3xl", md: "4xl" }}>Key Focus Areas</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                We translate our values into action through programmes and partnerships that respond to real needs across health and education.
              </Text>
            </Stack>

            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, minmax(0, 1fr))" }}
              gap={{ base: 6, md: 8, lg: 10 }}
            >
              {focusAreas.map((area, index) => (
                <GridItem
                  key={area.title}
                  colSpan={index === focusAreas.length - 1 ? { base: 1, lg: 2 } : 1}
                  display="flex"
                  justifyContent="center"
                >
                  <Stack
                    spacing={6}
                    bg="white"
                    borderRadius="3xl"
                    boxShadow="0px 24px 50px rgba(63, 81, 181, 0.12)"
                    p={{ base: 6, md: 8 }}
                    border="1px solid"
                    borderColor="rgba(63, 81, 181, 0.08)"
                    position="relative"
                    overflow="hidden"
                    maxW={{ base: "full", lg: index === focusAreas.length - 1 ? "640px" : "full" }}
                    w="full"
                  >
                    <Box
                      position="absolute"
                      inset="0"
                      bgGradient="linear(to-br, rgba(244, 251, 255, 0.9), rgba(255, 255, 255, 0.95))"
                    />
                    <Box
                      position="absolute"
                      top="-20%"
                      right="-10%"
                      w="220px"
                      h="220px"
                      bgGradient="radial(accent.200 0%, transparent 70%)"
                      opacity={0.3}
                      filter="blur(60px)"
                    />
                    <Box
                      position="absolute"
                      bottom="-30%"
                      left="-20%"
                      w="260px"
                      h="260px"
                      bgGradient="radial(brand.200 0%, transparent 70%)"
                      opacity={0.25}
                      filter="blur(75px)"
                    />

                    <Flex align="flex-start" gap={5} zIndex={1} flexWrap="wrap">
                      <Box
                        bgGradient="linear(to-br, brand.500, accent.400)"
                        color="white"
                        borderRadius="full"
                        boxSize={{ base: "12", md: "14" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="lg"
                      >
                        <Icon as={area.icon} boxSize={{ base: 6, md: 7 }} />
                      </Box>
                      <Stack spacing={3} flex="1" minW="220px">
                        <Heading size="md" color="brand.700">
                          {area.title}
                        </Heading>
                        <Text color="gray.600">{area.description}</Text>
                      </Stack>
                    </Flex>

                    <Stack spacing={3} zIndex={1} pt={2}>
                      {area.highlights.map((point) => (
                        <Flex key={point} align="flex-start" gap={3}>
                          <Box
                            mt={1}
                            w={2}
                            h={2}
                            borderRadius="full"
                            bgGradient="linear(to-br, accent.400, brand.400)"
                            boxShadow="0 0 0 4px rgba(99, 179, 237, 0.12)"
                            flexShrink={0}
                          />
                          <Text fontSize="sm" color="gray.600">
                            {point}
                          </Text>
                        </Flex>
                      ))}
                    </Stack>
                  </Stack>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Container py={{ base: 14, md: 20 }}>
        <Stack
          spacing={6}
          bgGradient="linear(to-r, #ff8ed5, #7fb3ff)"
          color="white"
          borderRadius="3xl"
          px={{ base: 6, md: 10 }}
          py={{ base: 10, md: 14 }}
          align={{ base: "flex-start", md: "center" }}
          textAlign={{ base: "left", md: "center" }}
        >
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Let’s co-create the next chapter of resilient, community-led impact.
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800">
            Whether you are a practitioner, policymaker, or philanthropist, we would love to understand your goals
            and explore how we can collaborate on evidence-based initiatives.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button colorScheme="accent" variant="solid" size="lg" as={RouterLink} to="/contact">
              Collaborate with us
            </Button>
            <Button variant="outline" colorScheme="whiteAlpha" size="lg" as={RouterLink} to="/gallery">
              Explore recent projects
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Container py={{ base: 14, md: 20 }}>
        <Stack spacing={{ base: 6, md: 8 }}>
          <Stack textAlign="center" spacing={3} maxW="3xl" mx="auto">
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>
              The people behind the movement
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
              A cross-functional team of strategists, clinicians, educators, and program managers anchors each
              engagement with deep empathy and execution excellence.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} spacing={{ base: 8, md: 10 }}>
            {teamMembers.slice(0, 6).map((member) => (
              <Stack
                key={member.id}
                spacing={0}
                bg="white"
                borderRadius="3xl"
                boxShadow="0 24px 55px rgba(28, 18, 52, 0.12)"
                p={{ base: 6, md: 8 }}
                border="1px solid rgba(132, 63, 181, 0.08)"
                position="relative"
                overflow="hidden"
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: 5, md: 7 }}
                  align="flex-start"
                  position="relative"
                  zIndex={1}
                >
                  <Box flexShrink={0} position="relative">
                    <Avatar
                      name={member.name}
                      src={member.image}
                      size="xl"
                      borderRadius="full"
                      boxShadow="0 16px 34px rgba(15, 127, 191, 0.2)"
                      border="4px solid"
                      borderColor="white"
                      bg="white"
                      color="#0f7fbf"
                      icon={
                        !member.image ? (
                          <FiUsers fontSize="1.75rem" color="#0f7fbf" />
                        ) : undefined
                      }
                    />
                    <Box
                      position="absolute"
                      inset="-6px"
                      borderRadius="full"
                      bgGradient="linear(to-r, rgba(15, 127, 191, 0.25), rgba(255, 142, 213, 0.35))"
                      filter="blur(22px)"
                      zIndex={-1}
                    />
                  </Box>
                  <Stack spacing={{ base: 4, md: 5 }} flex="1" minW="0">
                    <Stack spacing={1}>
                      <Heading size="md" color="#1c1234">
                        {member.name}
                      </Heading>
                      {member.role ? (
                        <Text fontWeight="semibold" color="#0f7fbf">
                          {member.role}
                        </Text>
                      ) : null}
                    </Stack>
                    {member.shortBio || member.bio ? (
                      <Text color="rgba(28, 18, 52, 0.68)" lineHeight="1.7">
                        {member.shortBio || member.bio}
                      </Text>
                    ) : null}
                    <Link
                      as={RouterLink}
                      to="/team"
                      color="#0f7fbf"
                      fontWeight="semibold"
                      _hover={{ color: "#0b6ea4", textDecoration: "underline" }}
                    >
                      Read more
                    </Link>
                  </Stack>
                </Flex>
              </Stack>
            ))}
          </SimpleGrid>

          <Stack align="center">
            <Button variant="outline" colorScheme="brand" as={RouterLink} to="/team">
              Meet the entire team
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box bg="#f8f6ff" py={{ base: 14, md: 20 }}>
        <Container>
          <Stack spacing={{ base: 8, md: 12 }}>
            <Stack spacing={3} textAlign="center" maxW="4xl" mx="auto">
              <Badge
                alignSelf="center"
                bg="rgba(255, 255, 255, 0.8)"
                color="brand.600"
                borderRadius="full"
                px={4}
                py={1}
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize={{ base: "sm", md: "md" }}
              >
                Advisory Board
              </Badge>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} color="#1c1234">
                Guidance from nationally respected Ayurveda and education leaders
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="rgba(28, 18, 52, 0.72)">
                Our Advisory Board blends classical Ayurvedic wisdom, policy acumen, and contemporary pedagogy to ensure every
                programme stays evidence-led, ethical, and future-ready.
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }}>
              {advisoryBoardMembers.map((member) => (
                <Stack
                  key={member.id}
                  spacing={4}
                  bg="white"
                  borderRadius="3xl"
                  boxShadow="0 18px 45px rgba(28, 18, 52, 0.08)"
                  p={{ base: 6, md: 8 }}
                  border="1px solid rgba(63, 81, 181, 0.08)"
                >
                  <Flex align="center" gap={4}>
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      bgGradient="conic(at 50% 50%, #ff7cc7, #53accb, #7f5af0, #ff7cc7)"
                      p="3px"
                      borderRadius="full"
                      boxShadow="0 12px 26px rgba(28, 18, 52, 0.12)"
                    >
                      <Avatar
                        name={member.name}
                        src={member.image}
                        size="lg"
                        bg="white"
                        color="#1c1234"
                        border="2px solid white"
                      />
                    </Box>
                    <Stack spacing={1} flex="1" minW="0">
                      <Heading size="md" color="#1c1234">
                        {member.name}
                      </Heading>
                      {member.designation ? (
                        <Text fontWeight="semibold" color="#0f7fbf">
                          {member.designation}
                        </Text>
                      ) : null}
                    </Stack>
                  </Flex>
                  <Stack spacing={3}>
                    {member.bio.map((paragraph, index) => (
                      <Text key={`${member.id}-${index}`} color="rgba(28, 18, 52, 0.75)" fontSize="sm" lineHeight="1.7">
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      <Box
        bgGradient="linear(to-r, rgba(254, 186, 229, 0.95), rgba(192, 230, 255, 0.95))"
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
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 10, lg: 12 }}
            align="stretch"
          >
            <Stack spacing={{ base: 6, md: 8 }} flex={{ base: "1", lg: "0 0 50%" }}>
              <Badge
                alignSelf={{ base: "flex-start", lg: "flex-start" }}
                bg="rgba(255, 255, 255, 0.6)"
                color="brand.600"
                borderRadius="full"
                px={4}
                py={1}
                fontWeight="semibold"
                letterSpacing="wide"
              >
                Leadership in action
              </Badge>
              <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} color="#1c1234">
                Curious about the minds steering every initiative?
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="rgba(28, 18, 52, 0.75)">
                Explore the extended leadership circle, their decades of experience, and the
                philosophies that keep the Aatman Foundation relentlessly future-ready.
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={{ base: 4, sm: 6 }}>
                <Stack spacing={1} align={{ base: "flex-start", sm: "center" }}>
                  <Heading size="lg" color="#1565C0">
                    4+
                  </Heading>
                  <Text fontSize="sm" color="rgba(28, 18, 52, 0.65)">
                    Core leaders & advisors
                  </Text>
                </Stack>
                <Stack spacing={1} align={{ base: "flex-start", sm: "center" }}>
                  <Heading size="lg" color="#1565C0">
                    20+ yrs
                  </Heading>
                  <Text fontSize="sm" color="rgba(28, 18, 52, 0.65)">
                    Avg. domain expertise
                  </Text>
                </Stack>
                <Stack spacing={1} align={{ base: "flex-start", sm: "center" }}>
                  <Heading size="lg" color="#1565C0">
                    Pan-India
                  </Heading>
                  <Text fontSize="sm" color="rgba(28, 18, 52, 0.65)">
                    Programme delivery footprint
                  </Text>
                </Stack>
              </SimpleGrid>
              <Button
                alignSelf={{ base: "flex-start", sm: "center", lg: "flex-start" }}
                bgGradient="linear(to-r, #ff4ebc, #ff7cc7)"
                color="white"
                size="lg"
                px={8}
                _hover={{ bgGradient: "linear(to-r, #ff5fca, #ff8ed5)", transform: "translateY(-2px)" }}
                as={RouterLink}
                to="/team"
              >
                Meet the full leadership team
              </Button>
            </Stack>

            <Box
              flex="1"
              bgGradient="linear(to-b, rgba(227, 231, 255, 0.98), rgba(255, 235, 248, 0.92))"
              borderRadius="3xl"
              boxShadow="0 28px 60px rgba(28, 18, 52, 0.12)"
              p={{ base: 6, md: 6 }}
              border="1px solid rgba(255, 255, 255, 0.6)"
              position="relative"
            >
              <Box
                position="absolute"
                inset="0"
                borderRadius="3xl"
                border="1px solid rgba(63, 81, 181, 0.08)"
                pointerEvents="none"
              />
              <Stack spacing={5} position="relative" zIndex={1}>
                <Heading size="md" color="#1565C0">
                  What you will find
                </Heading>
                <Box h="1px" bg="rgba(56, 121, 217, 0.25)" />
                <Stack spacing={4}>
                  <Text color="gray.700" lineHeight="1.7">
                    Detailed leadership journeys, milestone projects, and the personal missions fuelling each member.
                  </Text>
                  <Text color="gray.700" lineHeight="1.7">
                    Insights into how multidisciplinary expertise blends into the Foundation&apos;s signature programmes.
                  </Text>
                  <Text color="gray.700" lineHeight="1.7">
                    Opportunities to connect, collaborate, or invite our experts for speaking engagements.
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutUs;
const values = [
  {
    icon: LuUsers,
    title: "Integrity & Transparency",
    description: "Upholding ethical practices in all partnerships.",
  },
  {
    icon: LuBookOpen,
    title: "Collaboration & Inclusivity",
    description: "Bringing together stakeholders across disciplines.",
  },
  {
    icon: LuFileText,
    title: "Innovation & Research",
    description: "Promoting evidence-based solutions.",
  },
  {
    icon: LuStethoscope,
    title: "Impact Orientation",
    description: "Ensuring measurable outcomes in all our initiatives.",
  },
];
