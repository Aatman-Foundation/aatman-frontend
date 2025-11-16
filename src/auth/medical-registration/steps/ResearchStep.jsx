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
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { RESEARCH_INTEREST_OPTIONS } from "../constants.js";
import { defaultPublication } from "../utils.js";

function ResearchStep({
  form,
  touched,
  errors,
  onBlur,
  handleNestedChange,
  handleCheckboxGroupChange,
  addArrayItem,
  removeArrayItem,
  isSubmitting,
}) {
  return (
    <Stack spacing={8}>
      <Card variant="outline">
        <CardHeader pb={0}>
          <Heading size="md">Research Focus</Heading>
        </CardHeader>
        <CardBody>
          <FormControl
            isRequired
            isInvalid={
              touched.researchInterests && Boolean(errors.researchInterests)
            }
          >
            <FormLabel>Research Interest Areas</FormLabel>
            <CheckboxGroup
              value={form.researchInterests}
              onChange={handleCheckboxGroupChange("researchInterests")}
            >
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                {RESEARCH_INTEREST_OPTIONS.map((interest) => (
                  <Checkbox key={interest} value={interest}>
                    {interest}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
            <FormErrorMessage>{errors.researchInterests}</FormErrorMessage>
          </FormControl>
        </CardBody>
      </Card>

      <Card variant="outline">
        <CardHeader pb={0}>
          <Heading size="md">Publication Details</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            {form.publicationDetails.map((publication, index) => {
              const baseKey = `publicationDetails.${index}`;
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
                        touched[`${baseKey}.journal`] &&
                        Boolean(errors[`${baseKey}.journal`])
                      }
                    >
                      <FormLabel>Journal</FormLabel>
                      <Input
                        value={publication.journal}
                        onChange={handleNestedChange([
                          "publicationDetails",
                          index,
                          "journal",
                        ])}
                        onBlur={onBlur(`${baseKey}.journal`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.journal`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.title`] &&
                        Boolean(errors[`${baseKey}.title`])
                      }
                    >
                      <FormLabel>Title</FormLabel>
                      <Input
                        value={publication.title}
                        onChange={handleNestedChange([
                          "publicationDetails",
                          index,
                          "title",
                        ])}
                        onBlur={onBlur(`${baseKey}.title`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.title`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.year`] &&
                        Boolean(errors[`${baseKey}.year`])
                      }
                    >
                      <FormLabel>Year</FormLabel>
                      <Input
                        type="number"
                        value={publication.year}
                        onChange={handleNestedChange([
                          "publicationDetails",
                          index,
                          "year",
                        ])}
                        onBlur={onBlur(`${baseKey}.year`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.year`]}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={
                        touched[`${baseKey}.link`] &&
                        Boolean(errors[`${baseKey}.link`])
                      }
                    >
                      <FormLabel>Link</FormLabel>
                      <Input
                        type="url"
                        value={publication.link}
                        onChange={handleNestedChange([
                          "publicationDetails",
                          index,
                          "link",
                        ])}
                        onBlur={onBlur(`${baseKey}.link`)}
                      />
                      <FormErrorMessage>
                        {errors[`${baseKey}.link`]}
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>
                  {form.publicationDetails.length > 1 && (
                    <Flex justify="flex-end" mt={3}>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() =>
                          removeArrayItem(["publicationDetails"], index)
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
                addArrayItem(["publicationDetails"], { ...defaultPublication })
              }
              isDisabled={isSubmitting}
            >
              Add Publication
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default ResearchStep;
