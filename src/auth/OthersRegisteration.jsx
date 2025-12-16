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
import { useMemo, useState, useCallback } from "react";
import BackButton from "../components/BackButton.jsx";
import apiClient from "../api/client.js";
import {
  arrayToCommaSeparated,
  arrayToMultiline,
  sanitizeStringArray,
  setValueAtPath,
  defaultTraining,
  isObjectEmpty,
} from "./medical-registration/utils.js";
import {
  PG_QUALIFICATIONS,
  UG_QUALIFICATIONS,
} from "./medical-registration/constants.js";

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
  const createInitialForm = () => ({
    fullName: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    gender: "",
    dob: "",
    nationality: "",
    passPortPhoto: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    email: "",
    alternateEmail: "",
    phone: "",
    altPhone: "",
    academicQualifications: {
      ug: {
        qualification: "",
        specialization: "",
        college: "",
        yearOfPassing: "",
      },
      pg: {
        qualification: "",
        specialization: "",
        college: "",
        yearOfPassing: "",
      },
    },
    academics_phdOrResearchDegrees: [],
    academics_additionalCertifications: [],
    researchAreas: [],
    trainingDetails: [{ ...defaultTraining }],
    personalWebsite: "",
    researchGateORCIDID: "",
    sdocialHandles: "",
    linkedin: "",
    consentTruth: false,
    consentData: false,
  });
  const [form, setForm] = useState(createInitialForm);
  const [photoInputKey, setPhotoInputKey] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [touched, setTouched] = useState({});

  const getInputValue = (eOrValue) => {
    if (typeof eOrValue === "string" || Array.isArray(eOrValue)) {
      return eOrValue;
    }
    if (eOrValue?.target?.type === "checkbox") return eOrValue.target.checked;
    if (eOrValue?.target?.type === "file") {
      return eOrValue.target.files?.[0] ?? null;
    }
    return eOrValue?.target?.value;
  };

  const onChange = (field) => (eOrValue) => {
    const value = getInputValue(eOrValue);
    setForm((f) => ({ ...f, [field]: value }));
  };

  const onNestedChange = (path) => (eOrValue) => {
    const value = getInputValue(eOrValue);
    setForm((prev) => setValueAtPath(prev, path, value));
  };

  const onNestedListChange = (path) => (event) => {
    const value = event?.target?.value ?? "";
    setForm((prev) => setValueAtPath(prev, path, toArray(value)));
  };

  const addArrayItem = (path, template) => {
    setForm((prev) =>
      setValueAtPath(prev, path, (currentValue) => {
        const safe = Array.isArray(currentValue) ? [...currentValue] : [];
        safe.push(template);
        return safe;
      }),
    );
  };

  const removeArrayItem = (path, index) => {
    setForm((prev) =>
      setValueAtPath(prev, path, (currentValue) => {
        const safe = Array.isArray(currentValue) ? [...currentValue] : [];
        safe.splice(index, 1);
        if (safe.length === 0) {
          return [{ ...defaultTraining }];
        }
        return safe;
      }),
    );
  };

  const toArray = useCallback(
    (value) =>
      sanitizeStringArray(
        typeof value === "string"
          ? value
              .split(/[\n,]/)
              .map((item) => item.trim())
              .filter(Boolean)
          : Array.isArray(value)
          ? value
          : [],
      ),
    [],
  );

  const handlePhotoUpload = useCallback(
    (event) => {
      setTouched((prev) => ({ ...prev, passPortPhoto: true }));
      const file = event.target.files?.[0];
      if (!file) {
        setForm((prev) => ({ ...prev, passPortPhoto: "" }));
        return;
      }

      // Quick guardrail to avoid very large payloads
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 5MB.",
          status: "warning",
        });
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, passPortPhoto: reader.result }));
      };
      reader.onerror = () => {
        toast({
          title: "Could not process image",
          description: "Please try again with a different photo.",
          status: "error",
        });
        setForm((prev) => ({ ...prev, passPortPhoto: "" }));
      };
      reader.readAsDataURL(file);
    },
    [toast],
  );

  const buildPayload = useCallback(() => {
    const trainings = (form.trainingDetails || [])
      .map((training) => ({
        trainingName: training.trainingName,
        traningName: training.trainingName, // legacy key expected by validator
        trainingOrganizer: training.trainingOrganizer,
        traningOrganizer: training.trainingOrganizer,
        trainingRole: sanitizeStringArray(training.trainingRole),
        traningRole: sanitizeStringArray(training.trainingRole),
        trainingStartDate: training.trainingStartDate,
        traningStartDate: training.trainingStartDate,
        trainingEndDate: training.trainingEndDate,
        traningEndDate: training.trainingEndDate,
      }))
      .filter((training) => !isObjectEmpty(training));

    return {
      fullname: form.fullName,
      fatherName: form.fatherName,
      motherName: form.motherName,
      gender: form.gender,
      dateOfBirth: form.dob,
      maritalStatus: form.maritalStatus,
      personalNationality: form.nationality,
      personalPhoto: form.passPortPhoto,
      permanentAddress: {
        houseNo: form.houseNo,
        street: form.street,
        city: form.city,
        state: form.state,
        pinCode: form.pinCode,
      },
      phoneNumber: form.phone,
      altPhoneNumber: form.altPhone,
      emailPrimary: form.email,
      emailAlternate: form.alternateEmail,
      academicQualifications: {
        ug: { ...form.academicQualifications.ug },
        pg: { ...form.academicQualifications.pg },
      },
      academics_phdOrResearchDegrees: sanitizeStringArray(
        form.academics_phdOrResearchDegrees,
      ),
      academics_additionalCertifications: sanitizeStringArray(
        form.academics_additionalCertifications,
      ),
      researchInterests: toArray(form.researchAreas),
      trainingDetails: trainings.length > 0 ? trainings : [],
      digitalWebsite: form.personalWebsite,
      digitalLinkedIn: form.linkedin,
      digitalResearchGate: form.researchGateORCIDID,
      digitalSocialHandle: toArray(form.sdocialHandles),
      consent_infoTrueAndCorrect: form.consentTruth,
      consent_authorizeDataUse: form.consentData,
      consent_agreeToNotifications: form.consentData,
      consent_timestamp: new Date().toISOString(),
    };
  }, [form, toArray]);

  const stepErrors = useMemo(() => {
    const errors = {};
    const isBlank = (value) => String(value ?? "").trim() === "";
    const requireField = (condition, key, message) => {
      if (condition) errors[key] = message;
    };
    const emailOk = /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)?$/.test(form.email) && (form.email ? /@/.test(form.email) : true);
    const phoneDigits = (form.phone || "").replace(/\D/g, "");

    switch (activeStep) {
      case 0: {
        if (!form.fullName?.trim()) errors.fullName = "Full name is required";
        if (!form.gender) errors.gender = "Select a gender";
        if (!form.dob) errors.dob = "Date of birth is required";
        if (!form.nationality?.trim()) errors.nationality = "Nationality is required";
        break;
      }
      case 1: {
        if (!form.houseNo?.trim()) errors.houseNo = "House number is required";
        if (!form.street?.trim()) errors.street = "Street is required";
        if (!form.city?.trim()) errors.city = "City is required";
        if (!form.state?.trim()) errors.state = "State is required";
        if (!form.pinCode?.trim()) errors.pinCode = "PIN code is required";
        if (!form.email?.trim()) errors.email = "Email is required";
        else if (!emailOk) errors.email = "Enter a valid email";
        if (!form.phone?.trim()) errors.phone = "Mobile number is required";
        else if (phoneDigits.length < 10) errors.phone = "Enter at least 10 digits";
        break;
      }
      case 2: {
        const { ug = {}, pg = {} } = form.academicQualifications || {};
        requireField(
          isBlank(ug.qualification),
          "academicQualifications.ug.qualification",
          "UG qualification is required",
        );
        requireField(
          isBlank(ug.specialization),
          "academicQualifications.ug.specialization",
          "UG specialization is required",
        );
        requireField(
          isBlank(ug.college),
          "academicQualifications.ug.college",
          "UG college is required",
        );
        requireField(
          isBlank(ug.yearOfPassing),
          "academicQualifications.ug.yearOfPassing",
          "UG year of passing is required",
        );
        requireField(
          isBlank(pg.qualification),
          "academicQualifications.pg.qualification",
          "PG qualification is required",
        );
        requireField(
          isBlank(pg.specialization),
          "academicQualifications.pg.specialization",
          "PG specialization is required",
        );
        requireField(
          isBlank(pg.college),
          "academicQualifications.pg.college",
          "PG college is required",
        );
        requireField(
          isBlank(pg.yearOfPassing),
          "academicQualifications.pg.yearOfPassing",
          "PG year of passing is required",
        );
        break;
      }
      case 3: {
        const firstTraining = form.trainingDetails?.[0] || {};
        requireField(
          isBlank(firstTraining.trainingName),
          "trainingDetails.0.trainingName",
          "Training name is required",
        );
        requireField(
          isBlank(firstTraining.trainingOrganizer),
          "trainingDetails.0.trainingOrganizer",
          "Organizer is required",
        );
        requireField(
          isBlank(firstTraining.trainingRole),
          "trainingDetails.0.trainingRole",
          "Role is required",
        );
        requireField(
          isBlank(firstTraining.trainingStartDate),
          "trainingDetails.0.trainingStartDate",
          "Start date is required",
        );
        requireField(
          isBlank(firstTraining.trainingEndDate),
          "trainingDetails.0.trainingEndDate",
          "End date is required",
        );
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

  const handleTrainingRoleChange = (index) => (event) => {
    const value = event?.target?.value ?? "";
    const roles = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setForm((prev) =>
      setValueAtPath(prev, ["trainingDetails", index, "trainingRole"], roles),
    );
  };

  const formatTrainingRole = (index) =>
    arrayToCommaSeparated(form.trainingDetails?.[index]?.trainingRole);

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

  const reset = (showToast = true) => {
    setActiveStep(0);
    setForm(createInitialForm());
    setTouched({});
    setPhotoInputKey(Date.now());
    if (showToast) {
      toast({ title: "Form reset.", status: "info" });
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault?.();
    if (activeStep !== steps.length - 1) {
      next();
      return;
    }

    const payload = buildPayload();

    try {
      setIsSubmitting(true);
      await apiClient.post(
        "/user/non-medical-professional-registration",
        payload,
        { skipAuthRefresh: true },
      );
      toast({
        title: "Registration submitted",
        description: "We received your registration details.",
        status: "success",
      });
      reset(false);
    } catch (error) {
      const description =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong while submitting the form.";
      toast({
        title: "Submission failed",
        description,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        
      <Box as="form" onSubmit={handleSubmit}  maxW="900px" mx="auto" bg="white" px={{ base: 6, md: 10 }} py={{ base: 8, md: 10 }} rounded="xl" shadow="md" >
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
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Other">Other</Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{stepErrors.gender}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.dob && Boolean(stepErrors.dob)}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" value={form.dob} onChange={onChange("dob")} onBlur={onBlur("dob")} />
                    <FormErrorMessage>{stepErrors.dob}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={touched.nationality && Boolean(stepErrors.nationality)}>
                    <FormLabel>Nationality</FormLabel>
                    <Input value={form.nationality} onChange={onChange("nationality")} onBlur={onBlur("nationality")} placeholder="Enter your nationality" autoComplete="country-name" />
                    <FormErrorMessage>{stepErrors.nationality}</FormErrorMessage>
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
                    <Stack spacing={2}>
                      <Input key={photoInputKey} type="file" accept="image/*" onChange={handlePhotoUpload} placeholder="Upload your photo" name="personalPhoto" />
                      <FormHelperText fontSize="xs" color="gray.500">
                        Upload a clear portrait JPEG/PNG under 5 MB.
                      </FormHelperText>
                    </Stack>
                  </FormControl>
                </SimpleGrid>
              ),
              (
                <SimpleGrid {...gridProps}>
                  <FormControl isRequired isInvalid={touched.houseNo && Boolean(stepErrors.houseNo)}>
                    <FormLabel>House / Flat No.</FormLabel>
                    <Input value={form.houseNo} onChange={onChange("houseNo")} onBlur={onBlur("houseNo")} placeholder="e.g., 12B" autoComplete="address-line1" />
                    <FormErrorMessage>{stepErrors.houseNo}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.street && Boolean(stepErrors.street)}>
                    <FormLabel>Street / Locality</FormLabel>
                    <Input value={form.street} onChange={onChange("street")} onBlur={onBlur("street")} placeholder="Street / locality" autoComplete="address-line2" />
                    <FormErrorMessage>{stepErrors.street}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.city && Boolean(stepErrors.city)}>
                    <FormLabel>City</FormLabel>
                    <Input value={form.city} onChange={onChange("city")} onBlur={onBlur("city")} placeholder="City" autoComplete="address-level2" />
                    <FormErrorMessage>{stepErrors.city}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.state && Boolean(stepErrors.state)}>
                    <FormLabel>State</FormLabel>
                    <Input value={form.state} onChange={onChange("state")} onBlur={onBlur("state")} placeholder="State" autoComplete="address-level1" />
                    <FormErrorMessage>{stepErrors.state}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={touched.pinCode && Boolean(stepErrors.pinCode)}>
                    <FormLabel>PIN Code</FormLabel>
                    <Input value={form.pinCode} onChange={onChange("pinCode")} onBlur={onBlur("pinCode")} placeholder="6-digit PIN" inputMode="numeric" />
                    <FormErrorMessage>{stepErrors.pinCode}</FormErrorMessage>
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
                <Stack spacing={8}>
                  <Stack spacing={4}>
                    <Heading size="sm" color="gray.700">
                      Undergraduate Qualification
                    </Heading>
                    <SimpleGrid {...gridProps}>
                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.ug.qualification"] &&
                          Boolean(stepErrors["academicQualifications.ug.qualification"])
                        }
                      >
                        <FormLabel>Qualification</FormLabel>
                        <Select
                          placeholder="Select UG qualification"
                          value={form.academicQualifications.ug.qualification}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "ug",
                            "qualification",
                          ])}
                          onBlur={onBlur("academicQualifications.ug.qualification")}
                        >
                          {UG_QUALIFICATIONS.map((qualification) => (
                            <option key={qualification} value={qualification}>
                              {qualification}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.ug.qualification"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.ug.specialization"] &&
                          Boolean(stepErrors["academicQualifications.ug.specialization"])
                        }
                      >
                        <FormLabel>Specialization</FormLabel>
                        <Input
                          value={form.academicQualifications.ug.specialization}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "ug",
                            "specialization",
                          ])}
                          onBlur={onBlur("academicQualifications.ug.specialization")}
                          placeholder="Enter specialization"
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.ug.specialization"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.ug.college"] &&
                          Boolean(stepErrors["academicQualifications.ug.college"])
                        }
                      >
                        <FormLabel>College</FormLabel>
                        <Input
                          value={form.academicQualifications.ug.college}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "ug",
                            "college",
                          ])}
                          onBlur={onBlur("academicQualifications.ug.college")}
                          placeholder="College / University"
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.ug.college"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.ug.yearOfPassing"] &&
                          Boolean(stepErrors["academicQualifications.ug.yearOfPassing"])
                        }
                      >
                        <FormLabel>Year of Passing</FormLabel>
                        <Input
                          type="number"
                          value={form.academicQualifications.ug.yearOfPassing}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "ug",
                            "yearOfPassing",
                          ])}
                          onBlur={onBlur("academicQualifications.ug.yearOfPassing")}
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.ug.yearOfPassing"]}
                        </FormErrorMessage>
                      </FormControl>
                    </SimpleGrid>
                  </Stack>

                  <Stack spacing={4}>
                    <Heading size="sm" color="gray.700">
                      Postgraduate Qualification
                    </Heading>
                    <SimpleGrid {...gridProps}>
                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.pg.qualification"] &&
                          Boolean(stepErrors["academicQualifications.pg.qualification"])
                        }
                      >
                        <FormLabel>Qualification</FormLabel>
                        <Select
                          placeholder="Select PG qualification"
                          value={form.academicQualifications.pg.qualification}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "pg",
                            "qualification",
                          ])}
                          onBlur={onBlur("academicQualifications.pg.qualification")}
                        >
                          {PG_QUALIFICATIONS.map((qualification) => (
                            <option key={qualification} value={qualification}>
                              {qualification}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.pg.qualification"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.pg.specialization"] &&
                          Boolean(stepErrors["academicQualifications.pg.specialization"])
                        }
                      >
                        <FormLabel>Specialization</FormLabel>
                        <Input
                          value={form.academicQualifications.pg.specialization}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "pg",
                            "specialization",
                          ])}
                          onBlur={onBlur("academicQualifications.pg.specialization")}
                          placeholder="Enter specialization"
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.pg.specialization"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.pg.college"] &&
                          Boolean(stepErrors["academicQualifications.pg.college"])
                        }
                      >
                        <FormLabel>College</FormLabel>
                        <Input
                          value={form.academicQualifications.pg.college}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "pg",
                            "college",
                          ])}
                          onBlur={onBlur("academicQualifications.pg.college")}
                          placeholder="College / University"
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.pg.college"]}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          touched["academicQualifications.pg.yearOfPassing"] &&
                          Boolean(stepErrors["academicQualifications.pg.yearOfPassing"])
                        }
                      >
                        <FormLabel>Year of Passing</FormLabel>
                        <Input
                          type="number"
                          value={form.academicQualifications.pg.yearOfPassing}
                          onChange={onNestedChange([
                            "academicQualifications",
                            "pg",
                            "yearOfPassing",
                          ])}
                          onBlur={onBlur("academicQualifications.pg.yearOfPassing")}
                        />
                        <FormErrorMessage>
                          {stepErrors["academicQualifications.pg.yearOfPassing"]}
                        </FormErrorMessage>
                      </FormControl>
                    </SimpleGrid>
                  </Stack>

                  <SimpleGrid {...gridProps}>
                    <FormControl>
                      <FormLabel>PhD or Research Degrees</FormLabel>
                      <Textarea
                        rows={4}
                        value={arrayToMultiline(form.academics_phdOrResearchDegrees)}
                        onChange={onNestedListChange([
                          "academics_phdOrResearchDegrees",
                        ])}
                        placeholder="Enter each degree on a new line"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Additional Certifications</FormLabel>
                      <Textarea
                        rows={4}
                        value={arrayToMultiline(
                          form.academics_additionalCertifications,
                        )}
                        onChange={onNestedListChange([
                          "academics_additionalCertifications",
                        ])}
                        placeholder="Enter each certification on a new line"
                      />
                    </FormControl>
                  </SimpleGrid>
                </Stack>
              ),
              (
                <Stack spacing={6}>
                  {form.trainingDetails.map((training, index) => {
                    const baseKey = `trainingDetails.${index}`;
                    return (
                      <Box
                        key={baseKey}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={4}
                        bg="gray.50"
                      >
                        <SimpleGrid {...gridProps}>
                          <FormControl
                            isRequired
                            isInvalid={
                              touched[`${baseKey}.trainingName`] &&
                              Boolean(stepErrors[`${baseKey}.trainingName`])
                            }
                          >
                            <FormLabel>Training Name</FormLabel>
                            <Input
                              value={training.trainingName}
                              onChange={onNestedChange([
                                "trainingDetails",
                                index,
                                "trainingName",
                              ])}
                              onBlur={onBlur(`${baseKey}.trainingName`)}
                            />
                            <FormErrorMessage>
                              {stepErrors[`${baseKey}.trainingName`]}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isRequired
                            isInvalid={
                              touched[`${baseKey}.trainingOrganizer`] &&
                              Boolean(stepErrors[`${baseKey}.trainingOrganizer`])
                            }
                          >
                            <FormLabel>Organizer</FormLabel>
                            <Input
                              value={training.trainingOrganizer}
                              onChange={onNestedChange([
                                "trainingDetails",
                                index,
                                "trainingOrganizer",
                              ])}
                              onBlur={onBlur(`${baseKey}.trainingOrganizer`)}
                            />
                            <FormErrorMessage>
                              {stepErrors[`${baseKey}.trainingOrganizer`]}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isRequired
                            isInvalid={
                              touched[`${baseKey}.trainingRole`] &&
                              Boolean(stepErrors[`${baseKey}.trainingRole`])
                            }
                            gridColumn={{ base: "auto", md: "span 2" }}
                          >
                            <FormLabel>Role (comma separated)</FormLabel>
                            <Input
                              value={formatTrainingRole(index)}
                              onChange={handleTrainingRoleChange(index)}
                              onBlur={onBlur(`${baseKey}.trainingRole`)}
                              placeholder="e.g., Participant, Speaker"
                            />
                            <FormErrorMessage>
                              {stepErrors[`${baseKey}.trainingRole`]}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isRequired
                            isInvalid={
                              touched[`${baseKey}.trainingStartDate`] &&
                              Boolean(stepErrors[`${baseKey}.trainingStartDate`])
                            }
                          >
                            <FormLabel>Start Date</FormLabel>
                            <Input
                              type="date"
                              value={training.trainingStartDate}
                              onChange={onNestedChange([
                                "trainingDetails",
                                index,
                                "trainingStartDate",
                              ])}
                              onBlur={onBlur(`${baseKey}.trainingStartDate`)}
                            />
                            <FormErrorMessage>
                              {stepErrors[`${baseKey}.trainingStartDate`]}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isRequired
                            isInvalid={
                              touched[`${baseKey}.trainingEndDate`] &&
                              Boolean(stepErrors[`${baseKey}.trainingEndDate`])
                            }
                          >
                            <FormLabel>End Date</FormLabel>
                            <Input
                              type="date"
                              value={training.trainingEndDate}
                              onChange={onNestedChange([
                                "trainingDetails",
                                index,
                                "trainingEndDate",
                              ])}
                              onBlur={onBlur(`${baseKey}.trainingEndDate`)}
                            />
                            <FormErrorMessage>
                              {stepErrors[`${baseKey}.trainingEndDate`]}
                            </FormErrorMessage>
                          </FormControl>
                        </SimpleGrid>
                        {form.trainingDetails.length > 1 && (
                          <Flex justify="flex-end" mt={3}>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() =>
                                removeArrayItem(["trainingDetails"], index)
                              }
                              isDisabled={isSubmitting}
                            >
                              Remove
                            </Button>
                          </Flex>
                        )}
                      </Box>
                    );
                  })}
                  <Button
                    size="sm"
                    alignSelf="flex-start"
                    onClick={() =>
                      addArrayItem(["trainingDetails"], { ...defaultTraining })
                    }
                    isDisabled={isSubmitting}
                  >
                    Add Training / Workshop
                  </Button>
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
              <Button onClick={prev} variant="outline" isDisabled={isSubmitting}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button colorScheme="pink" onClick={next} isDisabled={!canGoNext || isSubmitting}>
                Next: {steps[activeStep + 1].label}
              </Button>
            ) : (
              <Button colorScheme="green" type="submit" isLoading={isSubmitting} loadingText="Submitting">
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
