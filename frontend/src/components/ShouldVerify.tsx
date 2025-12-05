import { Box, Text } from "@chakra-ui/react";

export default function ShouldVerify({ email }: { email: string }) {
  return (
    <Box bg={"orange.400"} p={4}>
      <Text>
        A verification email has been sent to your email: <b>{email}</b>. Please
        click the link in the mail to verify your account.
      </Text>
    </Box>
  );
}
