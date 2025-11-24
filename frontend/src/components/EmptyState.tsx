import { Box, Flex, Text, Button, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { FolderOpen } from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const subtle = useColorModeValue("gray.600", "gray.400");

  return (
    <Flex w="full" h="full" align="center" justify="center" px={4}>
      <Box
        p={10}
        maxW="sm"
        textAlign="center"
        borderWidth="1px"
        borderColor={border}
        borderRadius="2xl"
        bg={bg}
        boxShadow="lg"
      >
        <VStack gap={5}>
          <Box
            w="70px"
            h="70px"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={useColorModeValue("gray.100", "whiteAlpha.200")}
          >
            {icon ?? <FolderOpen size={32} />}
          </Box>

          <Text fontSize="xl" fontWeight="semibold">
            {title}
          </Text>

          {description && (
            <Text fontSize="sm" color={subtle} px={2}>
              {description}
            </Text>
          )}

          {actionLabel && onAction && (
            <Button colorScheme="blue" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}
