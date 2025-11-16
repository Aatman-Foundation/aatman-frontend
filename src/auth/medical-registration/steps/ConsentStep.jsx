import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

function ConsentStep({
  form,
  touched,
  errors,
  onBlur,
  handleChange,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Consent & Declarations</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={4}>
          <FormControl
            isInvalid={
              touched.consent_infoTrueAndCorrect &&
              Boolean(errors.consent_infoTrueAndCorrect)
            }
          >
            <Checkbox
              isChecked={form.consent_infoTrueAndCorrect}
              onChange={handleChange("consent_infoTrueAndCorrect")}
              onBlur={onBlur("consent_infoTrueAndCorrect")}
            >
              I confirm the information provided is true and correct.
            </Checkbox>
            <FormErrorMessage>
              {errors.consent_infoTrueAndCorrect}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              touched.consent_authorizeDataUse &&
              Boolean(errors.consent_authorizeDataUse)
            }
          >
            <Checkbox
              isChecked={form.consent_authorizeDataUse}
              onChange={handleChange("consent_authorizeDataUse")}
              onBlur={onBlur("consent_authorizeDataUse")}
            >
              I authorize AYUSH to process and store my data for verification
              and communication.
            </Checkbox>
            <FormErrorMessage>
              {errors.consent_authorizeDataUse}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <Checkbox
              isChecked={form.consent_agreeToNotifications}
              onChange={handleChange("consent_agreeToNotifications")}
            >
              I agree to receive notifications, updates, and relevant
              communication.
            </Checkbox>
          </FormControl>

          <Text fontSize="sm" color="gray.600">
            Timestamp captured on submission: {form.consent_timestamp}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ConsentStep;
