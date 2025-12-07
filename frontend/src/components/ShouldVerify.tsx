import { useResendVerification } from "@/api/hooks/useResendVerification";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function ShouldVerify({ email }: { email: string }) {
  const [send, setSend] = useState(false);
  const { t } = useTranslation();
  const {
    data: resendData,
    isLoading: resendLoading,
    error: resendError,
    isSuccess: resendSuccess,
  } = useResendVerification(send);

  useEffect(() => {
    if (resendSuccess) {
      toast.success(t("resendSuccess"));
      setSend(false);
    }
  }, [resendSuccess]);

  return (
    <Flex
      bg={"orange.400"}
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text>
        {t("sentVerification")}: <b>{email}</b>. {t("pleaseClick")}
      </Text>
      <Button
        colorScheme="blue"
        loading={resendLoading}
        onClick={() => setSend(true)}
        mt={3}
      >
        {t("resend")}
      </Button>
    </Flex>
  );
}
