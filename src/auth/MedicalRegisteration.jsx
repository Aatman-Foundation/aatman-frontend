import React, { useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import BackButton from "../components/BackButton.jsx";
import apiClient from "../api/client.js";
import { steps } from "./medical-registration/constants.js";
import RegistrationStepper from "./medical-registration/components/RegistrationStepper.jsx";
import { useMedicalRegistrationForm } from "./medical-registration/useMedicalRegistrationForm.js";
import PersonalInfoStep from "./medical-registration/steps/PersonalInfoStep.jsx";
import ContactDetailsStep from "./medical-registration/steps/ContactDetailsStep.jsx";
import AcademicInfoStep from "./medical-registration/steps/AcademicInfoStep.jsx";
import RegulatoryDetailsStep from "./medical-registration/steps/RegulatoryDetailsStep.jsx";
import ExperienceStep from "./medical-registration/steps/ExperienceStep.jsx";
import ResearchStep from "./medical-registration/steps/ResearchStep.jsx";
import TrainingStep from "./medical-registration/steps/TrainingStep.jsx";
import DigitalPresenceStep from "./medical-registration/steps/DigitalPresenceStep.jsx";
import ConsentStep from "./medical-registration/steps/ConsentStep.jsx";
import ReviewStep from "./medical-registration/steps/ReviewStep.jsx";

const stepComponents = [
  PersonalInfoStep,
  ContactDetailsStep,
  AcademicInfoStep,
  RegulatoryDetailsStep,
  ExperienceStep,
  ResearchStep,
  TrainingStep,
  DigitalPresenceStep,
  ConsentStep,
  ReviewStep,
];

function MedicalRegisteration() {
  const toast = useToast();
  const {
    activeStep,
    setActiveStep,
    form,
    touched,
    onBlur,
    handleChange,
    handleNestedChange,
    handleCheckboxGroupChange,
    handleNestedCheckboxGroupChange,
    handleListTextChange,
    handleNestedListTextChange,
    handleTrainingRoleChange,
    handlePersonalPhotoUpload,
    personalPhotoFileName,
    personalPhotoInputKey,
    addArrayItem,
    removeArrayItem,
    isSubmitting,
    setIsSubmitting,
    stepErrors,
    canGoNext,
    resetForm,
    buildPayload,
    formatTrainingRole,
  } = useMedicalRegistrationForm(toast);

  const progress = useMemo(
    () => Math.round((activeStep / (steps.length - 1)) * 100),
    [activeStep],
  );

  const ActiveStepComponent = stepComponents[activeStep];

  const stepProps = {
    form,
    touched,
    errors: stepErrors,
    onBlur,
    handleChange,
    handleNestedChange,
    handleCheckboxGroupChange,
    handleNestedCheckboxGroupChange,
    handleListTextChange,
    handleNestedListTextChange,
    handleTrainingRoleChange,
    handlePersonalPhotoUpload,
    personalPhotoFileName,
    personalPhotoInputKey,
    addArrayItem,
    removeArrayItem,
    isSubmitting,
    formatTrainingRole,
  };

  const handleNext = () => {
    if (!canGoNext) {
      toast({
        title: "Complete required fields before continuing.",
        status: "warning",
      });
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (activeStep !== steps.length - 1) {
      handleNext();
      return;
    }

    const payload = buildPayload();

    try {
      setIsSubmitting(true);
      await apiClient.post("/user/ayush-registration", payload, {
        skipAuthRefresh: true,
      });

      toast({
        title: "Registration submitted",
        description: "We received your registration details.",
        status: "success",
      });
      resetForm();
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
      <Box bgGradient="linear(to-b, gray.50, white)" minH="100vh" py={10}>
        <Container maxW="6xl">
          <Stack spacing={6}>
            <Stack spacing={3} align="center">
              <Heading color="#2a4d69">AYUSH Registration</Heading>
              <Text color="gray.600" textAlign="center" maxW="3xl">
                A guided, multi-step flow crafted to capture every detail
                required by the AYUSH council. Complete each section and submit
                your profile for verification.
              </Text>
            </Stack>

            <Box borderWidth="1px" borderRadius="xl" bg="white" shadow="md">
              <Box px={{ base: 4, md: 8 }} pt={6}>
                <RegistrationStepper steps={steps} activeStep={activeStep} />
                <Progress
                  mt={4}
                  colorScheme="blue"
                  size="sm"
                  value={progress}
                  rounded="full"
                  aria-label="Step progress"
                />
                <HStack justify="space-between" mt={4} color="gray.600">
                  <Text fontSize="sm">
                    Step {activeStep + 1} of {steps.length}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {steps[activeStep].label}
                  </Text>
                </HStack>
              </Box>

              <Box
                as="form"
                onSubmit={(event) => event.preventDefault()}
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 8 }}
              >
                <Stack spacing={8}>
                  <ActiveStepComponent {...stepProps} />

                  <Flex
                    justify="space-between"
                    align={{ base: "stretch", md: "center" }}
                    direction={{ base: "column-reverse", md: "row" }}
                    gap={4}
                  >
                    <Button
                      onClick={resetForm}
                      variant="ghost"
                      isDisabled={isSubmitting}
                    >
                      Reset form
                    </Button>
                    <HStack>
                      {activeStep > 0 && (
                        <Button
                          onClick={handleBack}
                          variant="outline"
                          isDisabled={isSubmitting}
                        >
                          Back
                        </Button>
                      )}
                      {activeStep < steps.length - 1 ? (
                        <Button
                          colorScheme="blue"
                          type="button"
                          onClick={handleNext}
                          isDisabled={isSubmitting}
                        >
                          Next: {steps[activeStep + 1].label}
                        </Button>
                      ) : (
                        <Button
                          colorScheme="green"
                          type="button"
                          onClick={handleSubmit}
                          isLoading={isSubmitting}
                        >
                          Submit Registration
                        </Button>
                      )}
                    </HStack>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MedicalRegisteration;
