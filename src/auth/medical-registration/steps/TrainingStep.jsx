import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { defaultTraining } from "../utils.js";

function TrainingStep({
  form,
  touched,
  errors,
  onBlur,
  handleNestedChange,
  handleTrainingRoleChange,
  formatTrainingRole,
  addArrayItem,
  removeArrayItem,
  isSubmitting,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Training & Workshops</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={6}>
          {form.traningDetails.map((training, index) => {
            const baseKey = `traningDetails.${index}`;
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
                      touched[`${baseKey}.trainingName`] &&
                      Boolean(errors[`${baseKey}.trainingName`])
                    }
                  >
                    <FormLabel>Training Name</FormLabel>
                    <Input
                      value={training.trainingName}
                      onChange={handleNestedChange([
                        "traningDetails",
                        index,
                        "trainingName",
                      ])}
                      onBlur={onBlur(`${baseKey}.trainingName`)}
                    />
                    <FormErrorMessage>
                      {errors[`${baseKey}.trainingName`]}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={
                      touched[`${baseKey}.trainingOrganizer`] &&
                      Boolean(errors[`${baseKey}.trainingOrganizer`])
                    }
                  >
                    <FormLabel>Organizer</FormLabel>
                    <Input
                      value={training.trainingOrganizer}
                      onChange={handleNestedChange([
                        "traningDetails",
                        index,
                        "trainingOrganizer",
                      ])}
                      onBlur={onBlur(`${baseKey}.trainingOrganizer`)}
                    />
                    <FormErrorMessage>
                      {errors[`${baseKey}.trainingOrganizer`]}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={
                      touched[`${baseKey}.trainingRole`] &&
                      Boolean(errors[`${baseKey}.trainingRole`])
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
                      {errors[`${baseKey}.trainingRole`]}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={
                      touched[`${baseKey}.trainingStartDate`] &&
                      Boolean(errors[`${baseKey}.trainingStartDate`])
                    }
                  >
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      value={training.trainingStartDate}
                      onChange={handleNestedChange([
                        "traningDetails",
                        index,
                        "trainingStartDate",
                      ])}
                      onBlur={onBlur(`${baseKey}.trainingStartDate`)}
                    />
                    <FormErrorMessage>
                      {errors[`${baseKey}.trainingStartDate`]}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={
                      touched[`${baseKey}.trainingEndDate`] &&
                      Boolean(errors[`${baseKey}.trainingEndDate`])
                    }
                  >
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      value={training.trainingEndDate}
                      onChange={handleNestedChange([
                        "traningDetails",
                        index,
                        "trainingEndDate",
                      ])}
                      onBlur={onBlur(`${baseKey}.trainingEndDate`)}
                    />
                    <FormErrorMessage>
                      {errors[`${baseKey}.trainingEndDate`]}
                    </FormErrorMessage>
                  </FormControl>
                </SimpleGrid>

                {form.traningDetails.length > 1 && (
                  <Flex justify="flex-end" mt={3}>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeArrayItem(["traningDetails"], index)}
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
              addArrayItem(["traningDetails"], { ...defaultTraining })
            }
            isDisabled={isSubmitting}
          >
            Add Training / Workshop
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default TrainingStep;
