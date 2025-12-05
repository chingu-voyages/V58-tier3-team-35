import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Ghost, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
    >
      <VStack
        gap={6}
        textAlign="center"
        animation="fadeIn 0.6s ease"
        maxW="400px"
      >
        <Ghost size={80} strokeWidth={1.5} />

        <Heading size="2xl" fontWeight="bold">
          404
        </Heading>

        <Text fontSize="lg" opacity={0.8}>
          {t("notFound")}
        </Text>

        <Button
          colorScheme="blue"
          size="md"
          onClick={() => navigate(-1)}
          width="full"
        >
          {t("back")}
        </Button>

        <Button
          variant="outline"
          size="sm"
          opacity={0.8}
          onClick={() => navigate("/")}
        >
          {t("menu.home")}
        </Button>
      </VStack>
    </Box>
  );
}
