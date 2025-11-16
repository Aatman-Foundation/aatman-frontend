import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

function ContactDetailsStep({
  form,
  touched,
  errors,
  onBlur,
  handleChange,
  handleNestedChange,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Contact & Address</Heading>
        <Text fontSize="sm" color="gray.600">
          Provide accurate contact information so the AYUSH team can reach out
          when needed.
        </Text>
      </CardHeader>
      <CardBody>
        <Stack spacing={8}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl
              isRequired
              isInvalid={
                touched["permanentAddress.houseNo"] &&
                Boolean(errors["permanentAddress.houseNo"])
              }
            >
              <FormLabel>House / Flat No.</FormLabel>
              <Input
                value={form.permanentAddress.houseNo}
                onChange={handleNestedChange(["permanentAddress", "houseNo"])}
                onBlur={onBlur("permanentAddress.houseNo")}
              />
              <FormErrorMessage>
                {errors["permanentAddress.houseNo"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["permanentAddress.street"] &&
                Boolean(errors["permanentAddress.street"])
              }
            >
              <FormLabel>Street</FormLabel>
              <Input
                value={form.permanentAddress.street}
                onChange={handleNestedChange(["permanentAddress", "street"])}
                onBlur={onBlur("permanentAddress.street")}
              />
              <FormErrorMessage>
                {errors["permanentAddress.street"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["permanentAddress.city"] &&
                Boolean(errors["permanentAddress.city"])
              }
            >
              <FormLabel>City</FormLabel>
              <Input
                value={form.permanentAddress.city}
                onChange={handleNestedChange(["permanentAddress", "city"])}
                onBlur={onBlur("permanentAddress.city")}
              />
              <FormErrorMessage>
                {errors["permanentAddress.city"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["permanentAddress.state"] &&
                Boolean(errors["permanentAddress.state"])
              }
            >
              <FormLabel>State</FormLabel>
              <Input
                value={form.permanentAddress.state}
                onChange={handleNestedChange(["permanentAddress", "state"])}
                onBlur={onBlur("permanentAddress.state")}
              />
              <FormErrorMessage>
                {errors["permanentAddress.state"]}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                touched["permanentAddress.pinCode"] &&
                Boolean(errors["permanentAddress.pinCode"])
              }
            >
              <FormLabel>PIN Code</FormLabel>
              <Input
                value={form.permanentAddress.pinCode}
                onChange={handleNestedChange(["permanentAddress", "pinCode"])}
                onBlur={onBlur("permanentAddress.pinCode")}
              />
              <FormErrorMessage>
                {errors["permanentAddress.pinCode"]}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl
              isRequired
              isInvalid={touched.phoneNumber && Boolean(errors.phoneNumber)}
            >
              <FormLabel>Primary Phone Number</FormLabel>
              <Input
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
                onBlur={onBlur("phoneNumber")}
                inputMode="tel"
                placeholder="Enter phone number"
              />
              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Alternate Phone Number</FormLabel>
              <Input
                value={form.altPhoneNumber}
                onChange={handleChange("altPhoneNumber")}
                inputMode="tel"
                placeholder="Enter alternate phone number"
              />
            </FormControl>

            <FormControl
              isRequired
              isInvalid={touched.emailPrimary && Boolean(errors.emailPrimary)}
            >
              <FormLabel>Primary Email</FormLabel>
              <Input
                type="email"
                value={form.emailPrimary}
                onChange={handleChange("emailPrimary")}
                onBlur={onBlur("emailPrimary")}
                placeholder="name@example.com"
                autoComplete="email"
              />
              <FormErrorMessage>{errors.emailPrimary}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Alternate Email</FormLabel>
              <Input
                type="email"
                value={form.emailAlternate}
                onChange={handleChange("emailAlternate")}
                placeholder="name.alt@example.com"
              />
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Correspondence Address</FormLabel>
            <Textarea
              rows={3}
              value={form.correspondenceAddress}
              onChange={handleChange("correspondenceAddress")}
              placeholder="If different from permanent address"
            />
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ContactDetailsStep;
