import { Box, Fragment, Circle, Text, Divider, HStack, Flex,  } from "@chakra-ui/react";

export  default function StepperV2({ steps, activeStep }) {
  return (
    <Box w="100%" overflowX="auto" py={2}>
      <HStack spacing={0} align="center">
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const isComplete = i < activeStep;
          const color = isComplete ? "white" : isActive ? "white" : "gray.600";
          const bg = isComplete
            ? "blue.500"
            : isActive
            ? "blue.600"
            : "gray.200";
          return (
            <React.Fragment key={step.label}>
              <Flex
                direction="column"
                align="center"
                minW="80px"
                flex="1"
                px={2}
              >
                <Circle size="32px" bg={bg} color={color} fontWeight="semibold">
                  {isComplete ? "✓" : i + 1}
                </Circle>
                <Text mt={2} fontSize="sm" textAlign="center" noOfLines={2}>
                  {step.label}
                </Text>
              </Flex>
              {i !== steps.length - 1 && (
                <Divider
                  flex="none"
                  orientation="horizontal"
                  borderBottomWidth="2px"
                  borderColor={i < activeStep ? "blue.500" : "gray.300"}
                  w="40px"
                />
              )}
            </React.Fragment>
          );
        })}
      </HStack>
    </Box>
  );
}