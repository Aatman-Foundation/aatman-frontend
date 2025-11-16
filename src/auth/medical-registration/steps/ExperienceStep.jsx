import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { DESIGNATION_OPTIONS, SPECIALIZATION_OPTIONS } from "../constants.js";
import { defaultExperience } from "../utils.js";

function ExperienceStep({
  form,
  touched,
  errors,
  onBlur,
  handleNestedChange,
  handleNestedCheckboxGroupChange,
  addArrayItem,
  removeArrayItem,
  isSubmitting,
}) {
  return (
    <Stack spacing={8}>
      <Card variant="outline">
        <CardHeader pb={0}>
          <Heading size="md">Current Practice Details</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl
              isRequired
              isInvalid={
                touched["practiceDetails.currentDesignation"] &&
                Boolean(errors["practiceDetails.currentDesignation"])
              }
            >
              <FormLabel>Current Designation</FormLabel>
              <Select
                placeholder="Select designation"
                value={form.practiceDetails.currentDesignation}
                onChange={handleNestedChange([
                  "practiceDetails",
                  "currentDesignation",
                ])}
                onBlur={onBlur("practiceDetails.currentDesignation")}
              >
                {DESIGNATION_OPTIONS.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors["practiceDetails.currentDesignation"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["practiceDetails.currentInstitution"] &&
                Boolean(errors["practiceDetails.currentInstitution"])
              }
            >
              <FormLabel>Current Institution</FormLabel>
              <Input
                value={form.practiceDetails.currentInstitution}
                onChange={handleNestedChange([
                  "practiceDetails",
                  "currentInstitution",
                ])}
                onBlur={onBlur("practiceDetails.currentInstitution")}
              />
              <FormErrorMessage>
                {errors["practiceDetails.currentInstitution"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["practiceDetails.workAddress"] &&
                Boolean(errors["practiceDetails.workAddress"])
              }
              gridColumn={{ base: "auto", md: "span 2" }}
            >
              <FormLabel>Work Address</FormLabel>
              <Textarea
                rows={3}
                value={form.practiceDetails.workAddress}
                onChange={handleNestedChange([
                  "practiceDetails",
                  "workAddress",
                ])}
                onBlur={onBlur("practiceDetails.workAddress")}
              />
              <FormErrorMessage>
                {errors["practiceDetails.workAddress"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["practiceDetails.yearsExperience"] &&
                Boolean(errors["practiceDetails.yearsExperience"])
              }
            >
              <FormLabel>Years of Experience</FormLabel>
              <Input
                type="number"
                value={form.practiceDetails.yearsExperience}
                onChange={handleNestedChange([
                  "practiceDetails",
                  "yearsExperience",
                ])}
                onBlur={onBlur("practiceDetails.yearsExperience")}
              />
              <FormErrorMessage>
                {errors["practiceDetails.yearsExperience"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["practiceDetails.specializationAreas"] &&
                Boolean(errors["practiceDetails.specializationAreas"])
              }
              gridColumn={{ base: "auto", md: "span 2" }}
            >
              <FormLabel>Areas of Specialization</FormLabel>
              <CheckboxGroup
                value={form.practiceDetails.specializationAreas}
                onChange={handleNestedCheckboxGroupChange(
                  ["practiceDetails", "specializationAreas"],
                  "practiceDetails.specializationAreas",
                )}
              >
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                  {SPECIALIZATION_OPTIONS.map((specialization) => (
                    <Checkbox key={specialization} value={specialization}>
                      {specialization}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </CheckboxGroup>
              <FormErrorMessage>
                {errors["practiceDetails.specializationAreas"]}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </CardBody>
      </Card>

      <Card variant="outline">
        <CardHeader pb={0}>
          <Heading size="md">Previous Experience</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            {form.previousExperience.map((experience, index) => {
              const baseKey = `previousExperience.${index}`;
              return (
                <Box
                  key={baseKey}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="gray.50"
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.designation`] &&
                        Boolean(errors[`${baseKey}.designation`])
                      }
                    >
                      <FormLabel>Designation</FormLabel>
                      <Input
                        value={experience.designation}
                        onChange={handleNestedChange([
                          "previousExperience",
                          index,
                          "designation",
                        ])}
                        onBlur={onBlur(`${baseKey}.designation`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.designation`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.organization`] &&
                        Boolean(errors[`${baseKey}.organization`])
                      }
                    >
                      <FormLabel>Organization</FormLabel>
                      <Input
                        value={experience.organization}
                        onChange={handleNestedChange([
                          "previousExperience",
                          index,
                          "organization",
                        ])}
                        onBlur={onBlur(`${baseKey}.organization`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.organization`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.startDate`] &&
                        Boolean(errors[`${baseKey}.startDate`])
                      }
                    >
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        value={experience.startDate}
                        onChange={handleNestedChange([
                          "previousExperience",
                          index,
                          "startDate",
                        ])}
                        onBlur={onBlur(`${baseKey}.startDate`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.startDate`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.endDate`] &&
                        Boolean(errors[`${baseKey}.endDate`])
                      }
                    >
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="date"
                        value={experience.endDate}
                        onChange={handleNestedChange([
                          "previousExperience",
                          index,
                          "endDate",
                        ])}
                        onBlur={onBlur(`${baseKey}.endDate`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.endDate`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.description`] &&
                        Boolean(errors[`${baseKey}.description`])
                      }
                      gridColumn={{ base: "auto", md: "span 2" }}
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        rows={3}
                        value={experience.description}
                        onChange={handleNestedChange([
                          "previousExperience",
                          index,
                          "description",
                        ])}
                        onBlur={onBlur(`${baseKey}.description`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.description`]}
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                  {form.previousExperience.length > 1 && (
                    <Flex justify="flex-end" mt={3}>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() =>
                          removeArrayItem(["previousExperience"], index)
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
                addArrayItem(["previousExperience"], { ...defaultExperience })
              }
              isDisabled={isSubmitting}
            >
              Add Another Experience
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default ExperienceStep;
