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
    useBreakpointValue,
  } from '@chakra-ui/react'
  import React, { useEffect, useRef, useState } from 'react'
  import { MessageCircleIcon, SendIcon } from 'lucide-react'
  import { keyframes } from '@emotion/react'
  
  type Message = {
    role: 'user' | 'assistant'
    content: string
    createdAt: Date
  }
  
  const MAX_MESSAGE_LENGTH = 500
  
  const pulse = keyframes`
    0%   { transform: scale(1);   box-shadow: 0 0 0 0 rgba(56, 178, 172, 0.6); }
    70%  { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(56, 178, 172, 0); }
    100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(56, 178, 172, 0); }
  `
  
  const AiChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
      {
        role: 'assistant',
        content:
          'Hi! I’m your ChinguVerse helper. Ask me how to use the map, filters, or lists and I’ll guide you 😊',
        createdAt: new Date(),
      },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const endRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  
    const dialogSize = useBreakpointValue({ base: 'cover', md: 'md' })
    const dialogPlacement = useBreakpointValue<'bottom' | 'bottom-end'>({
      base: 'bottom',
      md: 'bottom-end',
    })
  
    // Auto-scroll to latest message
    useEffect(() => {
      if (endRef.current) {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [messages, loading, isOpen])
  
    // Auto-grow textarea up to ~5 lines
    const autoResizeTextarea = (el: HTMLTextAreaElement) => {
      const lineHeight = 20 // px approximation
      const maxHeight = lineHeight * 5
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value.slice(0, MAX_MESSAGE_LENGTH)
      setInput(value)
      autoResizeTextarea(e.target)
    }
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }
  
    const handleSend = () => {
      const trimmed = input.trim()
      if (!trimmed || loading) return
  
      const newMsg: Message = {
        role: 'user',
        content: trimmed,
        createdAt: new Date(),
      }
  
      setMessages((prev) => [...prev, newMsg])
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
  
      // Frontend-only for now: fake “thinking” and static reply.
      setLoading(true)
      setTimeout(() => {
        const reply: Message = {
          role: 'assistant',
          content:
            "I'm not connected to the AI backend yet, but soon I'll be able to answer questions about using this app in real-time 🚀",
          createdAt: new Date(),
        }
        setMessages((prev) => [...prev, reply])
        setLoading(false)
      }, 1200)
    }
  
    const handleClose = () => {
      setIsOpen(false)
      // keep messages so conversation persists between opens
    }
  
    const handleOpen = () => {
      setIsOpen(true)
      if (!hasOpenedOnce) setHasOpenedOnce(true)
    }
  
    // For future infinite scroll: detect scroll-to-top to load older messages.
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      if (target.scrollTop === 0) {
        // TODO: trigger loading older messages from backend
      }
    }
  
    const disabled = loading || !input.trim()
  
    return (
      <>
        {/* Floating chat icon */}
        <Box position="fixed" bottom="28px" right="40px" zIndex={1400}>
          <Box position="relative">
            <IconButton
              aria-label="Open help chat"
              _icon={{
                color: "white",
                bg: "teal.500",
                borderRadius: "full",
                shadow: "lg",
              }}
              colorPalette="teal"
              variant="solid"
              rounded="full"
              size="lg"
              onClick={handleOpen}
            />
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
              <Dialog.Content borderRadius={{ base: 'none', md: 'lg' }} maxH="80vh">
                <Dialog.Header fontWeight="semibold">
                  Need help using ChinguVerse?
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
                        justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                      >
                        <Box
                          px={3}
                          py={2}
                          borderRadius="lg"
                          maxW="80%"
                          fontSize="sm"
                          bg={msg.role === 'user' ? 'teal.500' : 'gray.100'}
                          color={msg.role === 'user' ? 'white' : 'gray.800'}
                        >
                          <Text whiteSpace="pre-wrap">{msg.content}</Text>
                          {/* Optional timestamp */}
                          <Text
                            fontSize="xs"
                            opacity={0.7}
                            mt={1}
                            textAlign={msg.role === 'user' ? 'right' : 'left'}
                          >
                            {msg.createdAt.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        </Box>
                      </HStack>
                    ))}
  
                    {loading && (
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
                          <Text>Thinking…</Text>
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
                    placeholder="Ask me anything about using this app..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                  />
                  <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
                    {input.length}/{MAX_MESSAGE_LENGTH}
                  </Text>
                </Dialog.Body>
  
                <Dialog.Footer display="flex" justifyContent="space-between" gap={2}>
                  <Button variant="ghost" onClick={handleClose} size="sm">
                    Close
                  </Button>
                  <Button
                    colorPalette="teal"
                    onClick={handleSend}
                    disabled={disabled}
                    loading={loading}
                    _icon={{
                      color: "white",
                      bg: "teal.500",
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
    )
  }
  
  export default AiChatBot