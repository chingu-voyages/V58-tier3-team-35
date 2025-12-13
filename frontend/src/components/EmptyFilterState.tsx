import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

export default function EmptyFilterState() {
  const textColor = useColorModeValue("gray.500", "gray.400");
  const svgFill = useColorModeValue("#0e0f0f", "#4A5568");
  const svgAccent = useColorModeValue("#A0AEC0", "#718096");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      py={20}
      textAlign="center"
    >
      <Box mb={8}>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill={useColorModeValue("#d3d6d7", "#2D3748")}
          />
          <path
            d="M65 80H135M65 80L85 110V150L115 135V110L135 80M65 80H135"
            stroke={svgFill}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M145 55L135 80"
            stroke={svgAccent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M55 55L65 80"
            stroke={svgAccent}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="150" cy="140" r="15" fill={svgAccent} opacity="0.5" />
          <circle cx="50" cy="120" r="10" fill={svgFill} opacity="0.5" />
          <circle cx="160" cy="60" r="8" fill={svgFill} opacity="0.3" />
        </svg>
      </Box>
      <VStack gap={2}>
        <Text fontSize="2xl" fontWeight="bold">
          No Saved Filters
        </Text>
        <Text color={textColor} maxW="md">
          You haven't saved any filters yet. Save your favorite search
          configurations to access them quickly here.
        </Text>
      </VStack>
    </Flex>
  );
}
