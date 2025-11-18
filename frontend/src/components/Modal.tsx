import { Box, Portal } from "@chakra-ui/react";
import { useEffect, type ReactNode } from "react";
import { useColorMode } from "./ui/color-mode";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Dynamic background
  const bg = colorMode === "dark" ? "gray.800" : "white";
  const borderColor =
    colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.200";
  const shadow = colorMode === "dark" ? "dark-lg" : "xl";

  return (
    <Portal>
      {/* BACKDROP */}
      <Box
        position="fixed"
        inset={0}
        bg={colorMode === "dark" ? "blackAlpha.700" : "blackAlpha.500"}
        backdropFilter="blur(6px)"
        transition="all 0.2s ease"
        onClick={onClose}
        zIndex={1000}
      />

      {/* MODAL CARD */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg={bg}
        p={6}
        rounded="xl"
        shadow={shadow}
        borderWidth="1px"
        borderColor={borderColor}
        maxW="lg"
        w="90%"
        transition="all 0.2s ease"
        zIndex={1001}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Portal>
  );
}
