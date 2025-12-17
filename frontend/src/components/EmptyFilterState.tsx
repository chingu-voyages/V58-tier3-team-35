import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "./ui/color-mode";

export default function EmptyFilterState() {
  const textColor = useColorModeValue("gray.500", "gray.400");
  const svgFill = useColorModeValue("#0e0f0f", "#4A5568");
  const svgAccent = useColorModeValue("#A0AEC0", "#718096");

  const MotionFlex = motion(Flex);
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  const MotionVStack = motion(VStack);

  return (
    <MotionFlex
      direction="column"
      align="center"
      justify="center"
      py={20}
      textAlign="center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <MotionBox
        mb={8}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      >
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
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
        </motion.svg>
      </MotionBox>
      <MotionVStack
        gap={2}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      >
        <MotionText fontSize="2xl" fontWeight="bold">
          No Saved Filters
        </MotionText>
        <MotionText color={textColor} maxW="md">
          You haven't saved any filters yet. Save your favorite search
          configurations to access them quickly here.
        </MotionText>
      </MotionVStack>
    </MotionFlex>
  );
}
