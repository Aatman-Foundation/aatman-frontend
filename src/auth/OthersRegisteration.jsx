import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  useToast,
  HStack,
  Flex,
  Circle,
  Divider,
  SimpleGrid,
  FormErrorMessage,
  FormHelperText,
  Badge,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Select,
  Progress,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import BackButton from "../components/BackButton.jsx";


function StepperV2({ steps, activeStep }) {
  return (
    <Box w="100%" overflowX="auto" py={2}>
      <HStack spacing={0} align="center">
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const isComplete = i < activeStep;
          const color = isComplete ? "white" : isActive ? "white" : "gray.600";
          const bg = isComplete
            ? "pink.500"
            : isActive
            ? "pink.600"
            : "gray.200";
          return (
            <React.Fragment key={step.label}>
              <Flex
                direction="column"
                align="center"
                minW="80px"
                flex="1"
                px={2}
              >
                <Circle size="32px" bg={bg} color={color} fontWeight="semibold">
                  {isComplete ? "✓" : i + 1}
                </Circle>
                <Text mt={2} fontSize="sm" textAlign="center" noOfLines={2}>
                  {step.label}
                </Text>
              </Flex>
              {i !== steps.length - 1 && (
                <Divider
                  flex="none"
                  orientation="horizontal"
                  borderBottomWidth="2px"
                  borderColor={i < activeStep ? "blue.500" : "gray.300"}
                  w="40px"
                />
              )}
            </React.Fragment>
          );
        })}
      </HStack>
    </Box>
  );
}

const steps = [
  { label: "Personal Info" },
  { label: "Contact Details" },
  { label: "Academic Info" },
  { label: "Training" },
  { label: "Digital Presence" },
  { label: "Consent" },
  { label: "Submit" },
];

function OthersRegisteration() {
  const toast = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const progress = Math.round((activeStep / (steps.length - 1)) * 100);

  // Minimal form state for demo — expand as needed
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    motherName : "",
    maritalStatus : "",
    gender: "",
    dob: "",
    nationality : "",
    passPortPhoto : null,
    address: "",
    email: "",
    alternateEmail : "",
    phone: "",
    altPhone: "",
    ug: "",
    pg: "",
    phdResearch : "",
    additionalCertifications : "",
    researchAreas: [],
    workshops: "",
    trainingConducted : "" ,
    personalWebsite : "",
    researchGateORCIDID : "" ,
    sdocialHandles : "",
    linkedin: "",
    consentTruth: false,
    consentData: false,
  });

  const [touched, setTouched] = useState({});

  const onChange = (field) => (eOrValue) => {
    // handle Chakra controlled inputs (value string) and events
    const value =
      typeof eOrValue === "string" || Array.isArray(eOrValue)
        ? eOrValue
        : eOrValue?.target?.type === "checkbox"
        ? eOrValue.target.checked
        : eOrValue?.target?.type === "file"
        ? eOrValue.target.files?.[0] ?? null
        : eOrValue?.target?.value;

    setForm((f) => ({ ...f, [field]: value }));
  };

  const stepErrors = useMemo(() => {
    const errors = {};
    const emailOk = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)?$/.test(form.email) && (form.email ? /@/.test(form.email) : true);
    const phoneDigits = (form.phone || "").replace(/\D/g, "");

    switch (activeStep) {
      case 0: {
        if (!form.fullName?.trim()) errors.fullName = "Full name is required";
        if (!form.gender) errors.gender = "Select a gender";
        if (!form.dob) errors.dob = "Date of birth is required";
        break;
      }
      case 1: {
        if (!form.address?.trim()) errors.address = "Address is required";
        if (!form.email?.trim()) errors.email = "Email is required";
        else if (!emailOk) errors.email = "Enter a valid email";
        if (!form.phone?.trim()) errors.phone = "Mobile number is required";
        else if (phoneDigits.length < 10) errors.phone = "Enter at least 10 digits";
        break;
      }
      case 5: {
        if (!form.consentTruth) errors.consentTruth = "Please confirm the declaration";
        if (!form.consentData) errors.consentData = "Please authorize data usage";
        break;
      }
      default:
        break;
    }
    return errors;
  }, [activeStep, form]);

  const canGoNext = useMemo(() => Object.keys(stepErrors).length === 0, [stepErrors]);

  const onBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const next = () => {
    if (!canGoNext) {
      toast({
        title: "Please complete required fields on this step.",
        status: "warning",
      });
      return;
    }
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => setActiveStep((s) => Math.max(s - 1, 0));

  const reset = () => {
    setActiveStep(0);
    toast({ title: "Form reset.", status: "info" });
  };

  return (
    <>
      <BackButton
        position="fixed"
        top={{ base: 4, md: 6 }}
        left={{ base: 4, md: 6 }}
        zIndex={10}
      />
      <Box  minH="100vh" py={10} bgGradient="linear(to-b, gray.50, white)">
      <Box  mb={6} align="center" maxW={900} mx="auto" px={{ base: 6, md: 10 }}>
        <StepperV2  steps={steps} activeStep={activeStep} />
        <Progress mt={3} size="sm" colorScheme="blue" value={progress} rounded="full" />
      </Box>
        
      <Box as="form"  maxW="900px" mx="auto" bg="white" px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }} rounded="xl" shadow="md" >
        <Heading textAlign="center" color="#2a4d69" mb={2}>
        Registration
        </Heading>
        <Text textAlign="center" color="gray.600" mb={8}>
          Provide accurate details to complete your registration.
        </Text>

        {/* Progress bar (Chakra v2 custom) */}
        
        <HStack justify="space-between" mb={8} color="gray.600">
          <Text fontSize="sm">Step {activeStep + 1} of {steps.length}</Text>
          <Badge colorScheme="pink" variant="subtle">{steps[activeStep].label}</Badge>
        </HStack>

        {/* Panels */}
        <Box>
          {(() => {
            const gridProps = { columns: { base: 1, md: 2 }, spacing: 6 };
            const panels = [
              (
                <SimpleGrid {...gridProps}>
                  <FormControl isRequired isInvalid={touched.fullName && Boolean(stepErrors.fullName)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Full Name</FormLabel>
                    <Input value={form.fullName} onChange={onChange("fullName")} onBlur={onBlur("fullName")} placeholder="Enter your full name" autoComplete="name" />
                    <FormErrorMessage>{stepErrors.fullName}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.gender && Boolean(stepErrors.gender)}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup value={form.gender} onChange={onChange("gender")} onBlur={onBlur("gender")}>
                      <Stack direction="row" spacing={6}>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{stepErrors.gender}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.dob && Boolean(stepErrors.dob)}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" value={form.dob} onChange={onChange("dob")} onBlur={onBlur("dob")} />
                    <FormErrorMessage>{stepErrors.dob}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={touched.fatherName && Boolean(stepErrors.fatherName)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Father Name</FormLabel>
                    <Input value={form.fatherName} onChange={onChange("fatherName")} onBlur={onBlur("fatherName")} placeholder="Enter your father's name" autoComplete="fatherName" />
                    <FormErrorMessage>{stepErrors.fatherName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={touched.motherName && Boolean(stepErrors.motherName)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Mother Name</FormLabel>
                    <Input value={form.motherName} onChange={onChange("motherName")} onBlur={onBlur("motherName")} placeholder="Enter your mother's name" autoComplete="motherName" />
                    <FormErrorMessage>{stepErrors.motherName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={touched.maritalStatus && Boolean(stepErrors.maritalStatus)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Marital Status</FormLabel>
                    <Select value={form.maritalStatus} onChange={onChange("maritalStatus")} onBlur={onBlur("maritalStatus")} placeholder="Select your marital status" autoComplete="maritalStatus" >
                      <option value="single">Single</option>
                      <option value="married">Married</option>

                    </Select>
                    <FormErrorMessage>{stepErrors.maritalStatus}</FormErrorMessage>
                  </FormControl>
                  <FormControl gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Passport-sized photo</FormLabel>
                    <Input type="file" onChange={onChange("passPortPhoto")} placeholder="Upload your photo"  />
                  </FormControl>
                </SimpleGrid>
              ),
              (
                <SimpleGrid {...gridProps}>
                  <FormControl isRequired isInvalid={touched.address && Boolean(stepErrors.address)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Permanent Address (House No., Street, City, State, Pin Code)</FormLabel>
                    <Textarea rows={3} value={form.address} onChange={onChange("address")} onBlur={onBlur("address")} placeholder="House no, street, city, state" autoComplete="street-address" />
                    <FormErrorMessage>{stepErrors.address}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.address && Boolean(stepErrors.address)} gridColumn={{ base: 'auto', md: 'span 2' }}>
                    <FormLabel>Correspondence Address (if different from permanent)</FormLabel>
                    <Textarea rows={3} value={form.address} onChange={onChange("address")} onBlur={onBlur("address")} placeholder="House no, street, city, state" autoComplete="street-address" />
                    <FormErrorMessage>{stepErrors.address}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.phone && Boolean(stepErrors.phone)}>
                    <FormLabel>Mobile Number</FormLabel>
                    <Input type="tel" value={form.phone} onChange={onChange("phone")} onBlur={onBlur("phone")} inputMode="tel" placeholder="10+ digit mobile number" autoComplete="tel-national" />
                    <FormHelperText>Include country code if outside India.</FormHelperText>
                    <FormErrorMessage>{stepErrors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>What's App Number</FormLabel>
                    <Input type="tel" value={form.altPhone} onChange={onChange("altPhone")} inputMode="tel" placeholder="10+ digit mobile number" autoComplete="tel-national" />
                    <FormHelperText>Optional. Include country code if outside India.</FormHelperText>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.email && Boolean(stepErrors.email)}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={form.email} onChange={onChange("email")} onBlur={onBlur("email")} placeholder="name@example.com" autoComplete="email" />
                    <FormErrorMessage>{stepErrors.email}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Alternate Email</FormLabel>
                    <Input type="email" value={form.alternateEmail} onChange={onChange("alternateEmail")} placeholder="name.alt@example.com" autoComplete="email" />
                  </FormControl>
                </SimpleGrid>
              ),
              (
                <SimpleGrid {...gridProps}>
                  <FormControl>
                    <FormLabel>UG Qualification</FormLabel>
                    <Input placeholder="College & Year" value={form.ug} onChange={onChange("ug")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>PG Qualification</FormLabel>
                    <Input placeholder="Specialization, College & Year" value={form.pg} onChange={onChange("pg")} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>PhD / Research Degrees (if any)</FormLabel>
                    <Input placeholder="PhD / Research Degrees" value={form.phdResearch} onChange={onChange("phdResearch")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Additional Certifications</FormLabel>
                    <Input as="textarea" placeholder="Enter any additional certifications" value={form.additionalCertifications} onChange={onChange("additionalCertifications")} />
                  </FormControl>
                </SimpleGrid>
              ),
              (
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Participation in National Health Programs</FormLabel>
                    <Select>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Workshops Attended</FormLabel>
                    <Textarea rows={2} value={form.workshops} onChange={onChange("workshops")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Training Conducted</FormLabel>
                    <Textarea rows={2} value={form.trainingConducted} onChange={onChange("trainingConducted")} />
                  </FormControl>
                </Stack>
              ),
              (
                <Stack spacing={6}>
                  <FormControl>
                    <FormLabel>Personal Website / Blog (if any)</FormLabel>
                    <Input type="url" value={form.personalWebsite} onChange={onChange("personalWebsite")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <Input type="url" value={form.linkedin} onChange={onChange("linkedin")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>ResearchGate / ORCID ID (optional)</FormLabel>
                    <Input type="url" value={form.researchGateORCIDID} onChange={onChange("researchGateORCIDID")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Social Media Handles (optional, if used professionally)</FormLabel>
                    <Input type="text" value={form.sdocialHandles} onChange={onChange("sdocialHandles")} />
                  </FormControl>
                </Stack>
              ),
              (
                <Stack spacing={4}>
                  <FormControl isInvalid={touched.consentTruth && Boolean(stepErrors.consentTruth)}>
                    <Checkbox isChecked={form.consentTruth} onChange={onChange("consentTruth")} onBlur={onBlur("consentTruth")}>
                      I hereby declare that the information provided is true and correct to the best of my knowledge.
                    </Checkbox>
                    <FormErrorMessage>{stepErrors.consentTruth}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={touched.consentData && Boolean(stepErrors.consentData)}>
                    <Checkbox isChecked={form.consentData} onChange={onChange("consentData")} onBlur={onBlur("consentData")} >
                      I agree to receive updates, notifications, and invitations for training/events.
                    </Checkbox>
                    <FormErrorMessage>{stepErrors.consentData}</FormErrorMessage>
                  </FormControl>
                </Stack>
              ),
              (
                <Stack spacing={6}>
                  <Text color="gray.700">Review your details and complete the CAPTCHA during final submission.</Text>
                </Stack>
              ),
            ];
            return panels[activeStep] ?? null;
          })()}
        </Box>

        {/* Navigation */}
        <Flex mt={8} justify="space-between" align="center" wrap="wrap" gap={3} position="sticky" bottom={0} bg="white" py={3} borderTopWidth="1px">
          <Button onClick={reset} variant="ghost">Reset</Button>
          <HStack>
            {activeStep > 0 && (
              <Button onClick={prev} variant="outline">
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button colorScheme="pink" onClick={next} isDisabled={!canGoNext}>
                Next: {steps[activeStep + 1].label}
              </Button>
            ) : (
              <Button colorScheme="green" type="submit">
                Register
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>
      
    </Box>
    </>
  );
}

export default OthersRegisteration;
