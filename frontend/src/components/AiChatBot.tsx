import {
  Box,
  Button,
  Dialog,
  HStack,
  IconButton,
  Portal,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Icon, SendIcon } from "lucide-react";
import { RiChatSmileAiFill } from "react-icons/ri";
import { keyframes } from "@emotion/react";
import { toast } from "sonner";
import constants from "@/utils/constants";
import { useAIChat } from "@/api/hooks/useAIChat";
import { LuX } from "react-icons/lu";
import { useTranslation } from "react-i18next";

type Message = {
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

const MAX_MESSAGE_LENGTH = 500;

const pulse = keyframes`
    0%   { transform: scale(1);   box-shadow: 0 0 0 0 rgba(56, 178, 172, 0.6); }
    70%  { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(56, 178, 172, 0); }
    100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(56, 178, 172, 0); }
  `;

const AiChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m your ChinguVerse helper. Ask me how to use the map, filters, or lists and I’ll guide you 😊",
      createdAt: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { mutateAsync: sendPrompt, isPending } = useAIChat();
  const { t } = useTranslation();

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPending, isOpen]);

  const autoResizeTextarea = (el: HTMLTextAreaElement) => {
    const lineHeight = 20;
    const maxHeight = lineHeight * 5;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
    setInput(value);
    autoResizeTextarea(e.target);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isPending) return;

    const newMsg: Message = {
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    sendPrompt({ prompt: trimmed })
      .then((replyText) => {
        const reply: Message = {
          role: "assistant",
          content: replyText,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, reply]);
      })
      .catch((err: unknown) => {
        const description =
          err instanceof Error
            ? err.message
            : "Unable to reach the chat service.";
        toast.error("Chat error", {
          description,
          duration: 4000,
        });
      });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpenedOnce) setHasOpenedOnce(true);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop === 0) {
    }
  };

  const disabled = isPending || !input.trim();

  return (
    <>
      {/* Floating chat icon */}
      <Box position="fixed" bottom="28px" right="40px" zIndex={1400}>
        <Box position="relative">
          <IconButton
            aria-label="Open help chat"
            colorPalette="teal"
            variant="solid"
            rounded="full"
            size="lg"
            onClick={handleOpen}
          >
            <RiChatSmileAiFill size="lg" />
          </IconButton>
          {!hasOpenedOnce && (
            <Box
              position="absolute"
              top="4px"
              right="4px"
              w="10px"
              h="10px"
              borderRadius="full"
              bg="red.400"
              border="2px solid white"
            />
          )}
        </Box>
      </Box>

      {/* Chat dialog */}
      <Dialog.Root
        open={isOpen}
        onOpenChange={(details: { open: boolean }) => setIsOpen(details.open)}
        scrollBehavior="inside"
        placement="bottom"
        size="cover"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.CloseTrigger />
            <Dialog.Content
              borderRadius={{ base: "none", md: "lg" }}
              maxH="80vh"
            >
              <Dialog.Header fontWeight="semibold">
                <HStack align="center" gap={2} justify="between" w="100%">
                  <Text w="100%">
                    {t(
                      `Need help using ${constants.CHAT_BOT_NAME} the chatbot?`
                    )}
                  </Text>
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                  >
                    <LuX size="lg" color="gray.700" />
                  </IconButton>
                </HStack>
              </Dialog.Header>

              <Dialog.Body>
                <VStack
                  align="stretch"
                  gap={3}
                  maxH="260px"
                  overflowY="auto"
                  mb={3}
                  onScroll={handleScroll}
                >
                  {messages.map((msg, idx) => (
                    <HStack
                      key={idx}
                      justify={msg.role === "user" ? "flex-end" : "flex-start"}
                    >
                      <Box
                        px={3}
                        py={2}
                        borderRadius="lg"
                        maxW="80%"
                        fontSize="sm"
                        bg={msg.role === "user" ? "teal.500" : "gray.100"}
                        color={msg.role === "user" ? "white" : "gray.800"}
                      >
                        <Text whiteSpace="pre-wrap">{t(msg.content)}</Text>
                        {/* Optional timestamp */}
                        <Text
                          fontSize="xs"
                          opacity={0.7}
                          mt={1}
                          textAlign={msg.role === "user" ? "right" : "left"}
                        >
                          {msg.createdAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </Box>
                    </HStack>
                  ))}

                  {isPending && (
                    <HStack justify="flex-start">
                      <Box
                        bg="gray.100"
                        px={3}
                        py={2}
                        borderRadius="lg"
                        fontSize="sm"
                        display="flex"
                        gap={2}
                        alignItems="center"
                      >
                        <Spinner size="sm" />
                        <Text color="gray.700">{t("Thinking…")}</Text>
                      </Box>
                    </HStack>
                  )}

                  <div ref={endRef} />
                </VStack>

                <Textarea
                  ref={textareaRef}
                  rows={2}
                  resize="none"
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder={t("Ask me anything about using this app...")}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={isPending}
                />
                <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                  {input.length}/{MAX_MESSAGE_LENGTH}
                </Text>
              </Dialog.Body>

              <Dialog.Footer
                display="flex"
                justifyContent="space-between"
                gap={2}
              >
                <Button variant="ghost" onClick={handleClose} size="sm">
                  {t("Close")}
                </Button>
                <Button
                  colorPalette="teal"
                  onClick={handleSend}
                  disabled={disabled}
                  loading={isPending}
                  _icon={{
                    color: "white",
                  }}
                  size="sm"
                >
                  <SendIcon size={14} />
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default AiChatBot;
