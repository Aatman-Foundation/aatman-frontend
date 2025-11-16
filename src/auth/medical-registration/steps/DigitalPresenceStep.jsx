import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { arrayToMultiline } from "../utils.js";

function DigitalPresenceStep({ form, handleChange, handleListTextChange }) {
  return (
    <Card variant="outline">
      <CardHeader pb={0}>
        <Heading size="md">Digital Presence</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input
              type="url"
              value={form.digitalWebsite}
              onChange={handleChange("digitalWebsite")}
              placeholder="https://example.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Blog</FormLabel>
            <Input
              type="url"
              value={form.digitalBlog}
              onChange={handleChange("digitalBlog")}
              placeholder="https://blog.example.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>LinkedIn</FormLabel>
            <Input
              type="url"
              value={form.digitalLinkedIn}
              onChange={handleChange("digitalLinkedIn")}
              placeholder="https://linkedin.com/in/username"
            />
          </FormControl>

          <FormControl>
            <FormLabel>ResearchGate</FormLabel>
            <Input
              type="url"
              value={form.digitalResearchGate}
              onChange={handleChange("digitalResearchGate")}
              placeholder="https://researchgate.net/profile/username"
            />
          </FormControl>

          <FormControl>
            <FormLabel>ORCID</FormLabel>
            <Input
              type="url"
              value={form.digitalOrcid}
              onChange={handleChange("digitalOrcid")}
              placeholder="https://orcid.org/..."
            />
          </FormControl>

          <FormControl gridColumn={{ base: "auto", md: "span 2" }}>
            <FormLabel>Social Platforms</FormLabel>
            <Textarea
              rows={3}
              value={arrayToMultiline(form.digitalSocialPlatform)}
              onChange={handleListTextChange("digitalSocialPlatform")}
              placeholder="Enter each platform on a new line"
            />
          </FormControl>

          <FormControl gridColumn={{ base: "auto", md: "span 2" }}>
            <FormLabel>Social Handles</FormLabel>
            <Textarea
              rows={3}
              value={arrayToMultiline(form.digitalSocialHandle)}
              onChange={handleListTextChange("digitalSocialHandle")}
              placeholder="Enter each handle on a new line"
            />
          </FormControl>

          <FormControl gridColumn={{ base: "auto", md: "span 2" }}>
            <FormLabel>Social URLs</FormLabel>
            <Textarea
              rows={3}
              value={arrayToMultiline(form.digitalSocialURL)}
              onChange={handleListTextChange("digitalSocialURL")}
              placeholder="Enter each URL on a new line"
            />
          </FormControl>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}

export default DigitalPresenceStep;
