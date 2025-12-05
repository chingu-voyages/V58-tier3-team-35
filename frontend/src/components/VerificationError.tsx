import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";

interface Props {
  loading: boolean;
  onResend: () => void;
}

export default function VerificationError({
  loading = false,
  onResend,
}: Props) {
  return (
    <VStack
      gap={5}
      textAlign="center"
      maxW="400px"
      mx="auto"
      mt="60px"
      p={8}
      borderRadius="lg"
      borderWidth="1px"
      bg="gray.50"
      _dark={{ bg: "gray.800", borderColor: "whiteAlpha.200" }}
      boxShadow="lg"
    >
      <Box
        bg="red.100"
        _dark={{ bg: "red.900" }}
        p={4}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AlertTriangle size={32} color="#E53E3E" />
      </Box>

      <Text fontSize="xl" fontWeight="bold">
        Verification Failed
      </Text>

      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
        Your verification link is invalid or expired. Please click the link
        below to send a new verification token.
      </Text>

      <Button colorScheme="blue" loading={loading} onClick={onResend} mt={3}>
        Resend Verification Link
      </Button>
    </VStack>
  );
}
