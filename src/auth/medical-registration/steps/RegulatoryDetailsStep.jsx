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
} from "@chakra-ui/react";

function RegulatoryDetailsStep({
  form,
  touched,
  errors,
  onBlur,
  handleNestedChange,
}) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Regulatory Credentials</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl
            isRequired
            isInvalid={
              touched["regulatoryDetails.regulatoryAyushRegNo"] &&
              Boolean(errors["regulatoryDetails.regulatoryAyushRegNo"])
            }
          >
            <FormLabel>AYUSH Registration Number</FormLabel>
            <Input
              value={form.regulatoryDetails.regulatoryAyushRegNo}
              onChange={handleNestedChange([
                "regulatoryDetails",
                "regulatoryAyushRegNo",
              ])}
              onBlur={onBlur("regulatoryDetails.regulatoryAyushRegNo")}
            />
            <FormErrorMessage>
              {errors["regulatoryDetails.regulatoryAyushRegNo"]}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              touched["regulatoryDetails.councilName"] &&
              Boolean(errors["regulatoryDetails.councilName"])
            }
          >
            <FormLabel>Council Name</FormLabel>
            <Input
              value={form.regulatoryDetails.councilName}
              onChange={handleNestedChange([
                "regulatoryDetails",
                "councilName",
              ])}
              onBlur={onBlur("regulatoryDetails.councilName")}
            />
            <FormErrorMessage>
              {errors["regulatoryDetails.councilName"]}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              touched["regulatoryDetails.registrationDate"] &&
              Boolean(errors["regulatoryDetails.registrationDate"])
            }
          >
            <FormLabel>Registration Date</FormLabel>
            <Input
              type="date"
              value={form.regulatoryDetails.registrationDate}
              onChange={handleNestedChange([
                "regulatoryDetails",
                "registrationDate",
              ])}
              onBlur={onBlur("regulatoryDetails.registrationDate")}
            />
            <FormErrorMessage>
              {errors["regulatoryDetails.registrationDate"]}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={
              touched["regulatoryDetails.regulatoryValidityUntil"] &&
              Boolean(errors["regulatoryDetails.regulatoryValidityUntil"])
            }
          >
            <FormLabel>Validity Until</FormLabel>
            <Input
              type="date"
              value={form.regulatoryDetails.regulatoryValidityUntil}
              onChange={handleNestedChange([
                "regulatoryDetails",
                "regulatoryValidityUntil",
              ])}
              onBlur={onBlur("regulatoryDetails.regulatoryValidityUntil")}
            />
            <FormErrorMessage>
              {errors["regulatoryDetails.regulatoryValidityUntil"]}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}

export default RegulatoryDetailsStep;
