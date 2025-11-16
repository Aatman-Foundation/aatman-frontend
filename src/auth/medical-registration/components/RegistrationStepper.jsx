import { Box, Circle, Divider, Flex, HStack, Text } from "@chakra-ui/react";

function RegistrationStepper({ steps, activeStep }) {
  return (
    <Box w="100%" overflowX="auto" py={2}>
      <HStack spacing={0} align="center">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;
          const circleBg = isComplete
            ? "green.500"
            : isActive
            ? "blue.500"
            : "gray.200";
          const circleColor = isComplete || isActive ? "white" : "gray.600";

          return (
            <Flex key={step.label} align="center">
              <Flex
                direction="column"
                align="center"
                minW="80px"
                flex="1"
                px={2}
              >
                <Circle size="36px" bg={circleBg} color={circleColor}>
                  {isComplete ? "✓" : index + 1}
                </Circle>
                <Text
                  mt={2}
                  fontSize="sm"
                  textAlign="center"
                  noOfLines={2}
                  color={isActive ? "blue.600" : "gray.600"}
                  fontWeight={isActive ? "semibold" : "normal"}
                >
                  {step.label}
                </Text>
              </Flex>
              {index !== steps.length - 1 && (
                <Divider
                  orientation="horizontal"
                  borderBottomWidth="2px"
                  borderColor={index < activeStep ? "green.500" : "gray.300"}
                  w="40px"
                />
              )}
            </Flex>
          );
        })}
      </HStack>
    </Box>
  );
}

export default RegistrationStepper;
