import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const SummaryItem = ({ label, value }) => (
  <Stack spacing={0}>
    <Text fontSize="sm" color="gray.500">
      {label}
    </Text>
    <Text fontWeight="medium">{value || "—"}</Text>
  </Stack>
);

function ReviewStep({ form }) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Review your details</Heading>
        <Text color="gray.600" fontSize="sm">
          Please make sure everything looks correct before submitting. You can
          use the Back button to edit any section.
        </Text>
      </CardHeader>
      <CardBody>
        <Stack spacing={8}>
          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Personal
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SummaryItem label="Full Name" value={form.fullname} />
              <SummaryItem label="Gender" value={form.gender} />
              <SummaryItem label="Date of Birth" value={form.dateOfBirth} />
              <SummaryItem label="Marital Status" value={form.maritalStatus} />
              <SummaryItem
                label="Nationality"
                value={form.personalNationality}
              />
            </SimpleGrid>
          </Stack>

          <Divider />

          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Contact
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SummaryItem
                label="Primary Phone"
                value={form.phoneNumber}
              />
              <SummaryItem
                label="Alternate Phone"
                value={form.altPhoneNumber}
              />
              <SummaryItem label="Primary Email" value={form.emailPrimary} />
              <SummaryItem
                label="Alternate Email"
                value={form.emailAlternate}
              />
            </SimpleGrid>
            <SummaryItem
              label="Permanent Address"
              value={[
                form.permanentAddress.houseNo,
                form.permanentAddress.street,
                form.permanentAddress.city,
                form.permanentAddress.state,
                form.permanentAddress.pinCode,
              ]
                .filter(Boolean)
                .join(", ")}
            />
          </Stack>

          <Divider />

          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Practice & Research
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SummaryItem
                label="Current Designation"
                value={form.practiceDetails.currentDesignation}
              />
              <SummaryItem
                label="Current Institution"
                value={form.practiceDetails.currentInstitution}
              />
              <SummaryItem
                label="Years of Experience"
                value={form.practiceDetails.yearsExperience}
              />
              <SummaryItem
                label="Specialization Areas"
                value={form.practiceDetails.specializationAreas.join(", ")}
              />
            </SimpleGrid>
            <SummaryItem
              label="Research Interests"
              value={form.researchInterests.join(", ")}
            />
          </Stack>

          <Divider />

          <Stack spacing={4}>
            <Heading size="sm" color="gray.700">
              Digital Footprint
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SummaryItem label="Website" value={form.digitalWebsite} />
              <SummaryItem label="LinkedIn" value={form.digitalLinkedIn} />
              <SummaryItem
                label="ResearchGate"
                value={form.digitalResearchGate}
              />
              <SummaryItem label="ORCID" value={form.digitalOrcid} />
            </SimpleGrid>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ReviewStep;
