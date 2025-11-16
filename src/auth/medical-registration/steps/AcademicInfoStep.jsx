import {
  Card,
  CardBody,
  CardHeader,
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
import { PG_QUALIFICATIONS, UG_QUALIFICATIONS } from "../constants.js";
import { arrayToMultiline } from "../utils.js";

function AcademicInfoStep({
  form,
  touched,
  errors,
  onBlur,
  handleNestedChange,
  handleListTextChange,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Academic Background</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Undergraduate Qualification
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.ug.qualification"] &&
                  Boolean(errors["academicQualifications.ug.qualification"])
                }
              >
                <FormLabel>Qualification</FormLabel>
                <Select
                  placeholder="Select UG qualification"
                  value={form.academicQualifications.ug.qualification}
                  onChange={handleNestedChange([
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
                  {errors["academicQualifications.ug.qualification"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.ug.specialization"] &&
                  Boolean(errors["academicQualifications.ug.specialization"])
                }
              >
                <FormLabel>Specialization</FormLabel>
                <Input
                  value={form.academicQualifications.ug.specialization}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "ug",
                    "specialization",
                  ])}
                  onBlur={onBlur("academicQualifications.ug.specialization")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.ug.specialization"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.ug.college"] &&
                  Boolean(errors["academicQualifications.ug.college"])
                }
              >
                <FormLabel>College</FormLabel>
                <Input
                  value={form.academicQualifications.ug.college}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "ug",
                    "college",
                  ])}
                  onBlur={onBlur("academicQualifications.ug.college")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.ug.college"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.ug.yearOfPassing"] &&
                  Boolean(errors["academicQualifications.ug.yearOfPassing"])
                }
              >
                <FormLabel>Year of Passing</FormLabel>
                <Input
                  type="number"
                  value={form.academicQualifications.ug.yearOfPassing}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "ug",
                    "yearOfPassing",
                  ])}
                  onBlur={onBlur("academicQualifications.ug.yearOfPassing")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.ug.yearOfPassing"]}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </Stack>

          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Postgraduate Qualification
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.pg.qualification"] &&
                  Boolean(errors["academicQualifications.pg.qualification"])
                }
              >
                <FormLabel>Qualification</FormLabel>
                <Select
                  placeholder="Select PG qualification"
                  value={form.academicQualifications.pg.qualification}
                  onChange={handleNestedChange([
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
                  {errors["academicQualifications.pg.qualification"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.pg.specialization"] &&
                  Boolean(errors["academicQualifications.pg.specialization"])
                }
              >
                <FormLabel>Specialization</FormLabel>
                <Input
                  value={form.academicQualifications.pg.specialization}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "pg",
                    "specialization",
                  ])}
                  onBlur={onBlur("academicQualifications.pg.specialization")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.pg.specialization"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.pg.college"] &&
                  Boolean(errors["academicQualifications.pg.college"])
                }
              >
                <FormLabel>College</FormLabel>
                <Input
                  value={form.academicQualifications.pg.college}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "pg",
                    "college",
                  ])}
                  onBlur={onBlur("academicQualifications.pg.college")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.pg.college"]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={
                  touched["academicQualifications.pg.yearOfPassing"] &&
                  Boolean(errors["academicQualifications.pg.yearOfPassing"])
                }
              >
                <FormLabel>Year of Passing</FormLabel>
                <Input
                  type="number"
                  value={form.academicQualifications.pg.yearOfPassing}
                  onChange={handleNestedChange([
                    "academicQualifications",
                    "pg",
                    "yearOfPassing",
                  ])}
                  onBlur={onBlur("academicQualifications.pg.yearOfPassing")}
                />
                <FormErrorMessage>
                  {errors["academicQualifications.pg.yearOfPassing"]}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl>
              <FormLabel>PhD or Research Degrees</FormLabel>
              <Textarea
                rows={4}
                value={arrayToMultiline(form.academics_phdOrResearchDegrees)}
                onChange={handleListTextChange(
                  "academics_phdOrResearchDegrees",
                )}
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
                onChange={handleListTextChange(
                  "academics_additionalCertifications",
                )}
                placeholder="Enter each certification on a new line"
              />
            </FormControl>
          </SimpleGrid>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default AcademicInfoStep;
