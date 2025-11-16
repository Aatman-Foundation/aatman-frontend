import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

function PersonalInfoStep({
  form,
  touched,
  errors,
  onBlur,
  handleChange,
  handlePersonalPhotoUpload,
  personalPhotoFileName,
  personalPhotoInputKey,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Tell us about yourself</Heading>
        <Text color="gray.600" fontSize="sm">
          These details help the Aatman team verify your profile.
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl
            isRequired
            isInvalid={touched.fullname && Boolean(errors.fullname)}
            gridColumn={{ base: "auto", md: "span 2" }}
          >
            <FormLabel>Full Name</FormLabel>
            <Input
              value={form.fullname}
              onChange={handleChange("fullname")}
              onBlur={onBlur("fullname")}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            <FormErrorMessage>{errors.fullname}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={touched.gender && Boolean(errors.gender)}
          >
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              value={form.gender}
              onChange={handleChange("gender")}
              onBlur={onBlur("gender")}
            >
              <HStack spacing={6}>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>{errors.gender}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
          >
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
              onBlur={onBlur("dateOfBirth")}
            />
            <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              touched.maritalStatus && Boolean(errors.maritalStatus)
            }
          >
            <FormLabel>Marital Status</FormLabel>
            <Select
              placeholder="Select marital status"
              value={form.maritalStatus}
              onChange={handleChange("maritalStatus")}
              onBlur={onBlur("maritalStatus")}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </Select>
            <FormErrorMessage>{errors.maritalStatus}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              touched.personalNationality &&
              Boolean(errors.personalNationality)
            }
          >
            <FormLabel>Nationality</FormLabel>
            <Input
              value={form.personalNationality}
              onChange={handleChange("personalNationality")}
              onBlur={onBlur("personalNationality")}
              placeholder="Enter your nationality"
              autoComplete="country-name"
            />
            <FormErrorMessage>{errors.personalNationality}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={touched.personalPhoto && Boolean(errors.personalPhoto)}
          >
            <FormLabel>Passport-sized Photograph</FormLabel>
            <Stack spacing={2}>
              <Input
              name="personalPhoto"
                key={personalPhotoInputKey}
                type="file"
                accept="image/*"
                onChange={handlePersonalPhotoUpload}
                onBlur={onBlur("personalPhoto")}
              />
              <FormHelperText fontSize="xs" color="gray.500">
                Upload a clear portrait JPEG/PNG under 3 MB.
              </FormHelperText>
              {personalPhotoFileName && (
                <FormHelperText fontSize="sm" color="green.600">
                  {personalPhotoFileName} selected
                </FormHelperText>
              )}
            </Stack>
            <FormErrorMessage>{errors.personalPhoto}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}

export default PersonalInfoStep;
