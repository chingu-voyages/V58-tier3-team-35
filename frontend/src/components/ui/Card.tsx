// components/Card.tsx
import { Box } from "@chakra-ui/react";
import { type ReactNode } from "react";
import { useColorModeValue } from "./color-mode";

interface CardProps {
  children: ReactNode;
  p?: number;
  w?: string | number;
}

export default function Card({ children, p = 4, w = "full" }: CardProps) {
  const bg = useColorModeValue("white", "gray.600");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const shadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      w={w}
      bg={bg}
      p={p}
      rounded="lg"
      borderWidth="1px"
      borderColor={border}
      shadow={shadow}
    >
      {children}
    </Box>
  );
}
