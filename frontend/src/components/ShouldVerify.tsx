import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ShouldVerify({ email }: { email: string }) {
  const { t } = useTranslation();
  return (
    <Box bg={"orange.400"} p={4}>
      <Text>
        {t("sentVerification")}: <b>{email}</b>. {t("pleaseClick")}
      </Text>
    </Box>
  );
}
