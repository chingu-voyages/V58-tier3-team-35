import { Box, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MessageCircleIcon } from 'lucide-react'

const AiChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box position="fixed" bottom="28px" right="40px" zIndex={1400}>
        <IconButton
          aria-label="Open help chat"
          _icon={{
            color: "white",
            bg: "teal.500",
            borderRadius: "full",
            shadow: "lg",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircleIcon />
        </IconButton>
    </Box>
  );
};

export default AiChatButton;