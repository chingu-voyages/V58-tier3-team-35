import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Copy, Save } from "lucide-react";
import { useLocation } from "react-router-dom";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useSaveFilter } from "@/api/hooks/useSaveFilter";

export default function FloatingCopyButton() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    open: copyOpen,
    onOpen: onCopyOpen,
    onClose: onCopyClose,
  } = useDisclosure();
  const {
    open: saveOpen,
    onOpen: onSaveOpen,
    onClose: onSaveClose,
  } = useDisclosure();
  const location = useLocation();

  const [hasCopied, setHasCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [filterName, setFilterName] = useState("");

  const { mutate: saveFilter, isPending: isSaving } = useSaveFilter();

  const fullUrl = `${window.location.origin}/V58-tier3-team-35${location.pathname}${location.search}`;

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

  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      toast.error("Please enter a name for the filter.");
      return;
    }

    saveFilter(
      { name: filterName, filters: fullUrl },
      {
        onSuccess: () => {
          toast.success("Filter saved successfully!");
          onSaveClose();
          setFilterName("");
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to save filter.");
        },
      }
    );
  };

  return (
    <>
      <Flex
        position="fixed"
        bottom="24px"
        left="24px"
        zIndex={2000}
        gap={2}
        flexDirection="column"
      >
        {user && (
          <IconButton
            aria-label="Save Filter"
            onClick={onSaveOpen}
            colorScheme="blue"
            rounded="full"
            size="2xl"
            shadow="2xl"
          >
            <Save />
          </IconButton>
        )}
        <IconButton
          aria-label="Copy URL"
          onClick={onCopyOpen}
          colorScheme="light"
          rounded="full"
          size="2xl"
          shadow="2xl"
        >
          <Copy />
        </IconButton>
      </Flex>

      {/* Copy Modal */}
      <Modal isOpen={copyOpen} onClose={onCopyClose}>
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

      {/* Save Filter Modal */}
      <Modal isOpen={saveOpen} onClose={onSaveClose}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Save Filter
        </Text>
        <VStack gap={4} align="stretch">
          <Box>
            <Text mb={2} fontSize="sm" fontWeight="medium">
              Filter Name
            </Text>
            <Input
              placeholder="e.g., Senior Frontend Devs in US"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              borderColor={useColorModeValue("gray.200", "gray.600")}
              _focus={{ borderColor: "blue.500" }}
            />
          </Box>
          <Button
            colorScheme="blue"
            onClick={handleSaveFilter}
            loading={isSaving}
            w="full"
          >
            Save
          </Button>
        </VStack>
      </Modal>
    </>
  );
}
