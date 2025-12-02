import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { useLocation } from "react-router-dom";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function FloatingCopyButton() {
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const [hasCopied, setHasCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const fullUrl = `${window.location.origin}${location.pathname}${location.search}`;

  const border = useColorModeValue("gray.200", "gray.600");

  const handleCopy = async () => {
    try {
      setIsCopying(true);

      // Modern clipboard API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = fullUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setHasCopied(true);

      toast.success("Copied!", {
        description: "The page URL has been copied to your clipboard.",
        duration: 1800,
      });

      setTimeout(() => setHasCopied(false), 1500);
    } catch (e) {
      toast.error("Copy failed", {
        description: "Your browser blocked clipboard access.",
        duration: 2500,
      });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <>
      <IconButton
        aria-label="Copy URL"
        onClick={onOpen}
        position="fixed"
        bottom="24px"
        left="24px"
        zIndex={2000}
        colorScheme="light"
        rounded="full"
        size="2xl"
        shadow="2xl"
      >
        <Copy />
      </IconButton>

      <Modal isOpen={open} onClose={onClose}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          {t("sharePage")}
        </Text>

        <Flex
          align="center"
          bg={useColorModeValue("gray.50", "gray.700")}
          p={3}
          rounded="md"
          border="1px solid"
          borderColor={border}
          justify="space-between"
          gap={3}
        >
          <Box
            fontSize="sm"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            flex={1}
            pr={2}
          >
            {fullUrl}
          </Box>

          <Button
            onClick={handleCopy}
            loading={isCopying}
            colorScheme={hasCopied ? "green" : "blue"}
            size="sm"
            minW="85px"
          >
            {hasCopied ? t("copied") : t("copy")}
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
