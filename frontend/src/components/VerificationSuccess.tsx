import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  onContinue: () => void;
}

export default function EmailVerificationSuccess({ onContinue }: Props) {
  const { t } = useTranslation();
  return (
    <VStack
      gap={5}
      textAlign="center"
      maxW="380px"
      mx="auto"
      mt="60px"
      p={8}
      borderRadius="lg"
      borderWidth="1px"
      bg="green.50"
      _dark={{ bg: "green.900", borderColor: "whiteAlpha.200" }}
      boxShadow="lg"
    >
      <Box
        bg="green.100"
        _dark={{ bg: "green.800" }}
        p={4}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircle size={34} color="#22c55e" />
      </Box>

      <Text fontSize="xl" fontWeight="bold">
        Email Verified Successfully
      </Text>

      <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
        Your account is now activated. You can continue to your dashboard and
        explore the platform.
      </Text>

      <Button colorScheme="blue" size="md" mt={3} onClick={onContinue}>
        {t("menu.dashboard")}
      </Button>
    </VStack>
  );
}
