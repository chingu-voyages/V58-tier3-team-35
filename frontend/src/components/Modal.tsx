import { Box, Portal } from "@chakra-ui/react";
import { useEffect, type ReactNode } from "react";
import { useColorMode } from "./ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create(Box);

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

  // Dynamic background
  const bg = colorMode === "dark" ? "gray.800" : "white";
  const borderColor =
    colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.200";
  const shadow = colorMode === "dark" ? "dark-lg" : "xl";

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <MotionBox
              key="backdrop"
              position="fixed"
              inset={0}
              bg={colorMode === "dark" ? "blackAlpha.700" : "blackAlpha.500"}
              backdropFilter="blur(6px)"
              onClick={onClose}
              zIndex={100010}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* MODAL CARD */}
            <MotionBox
              key="modal"
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
              zIndex={100011}
              onClick={(e) => e.stopPropagation()}
              overflow={"auto"}
              maxH={{ base: "80vh", md: "90vh" }}
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
