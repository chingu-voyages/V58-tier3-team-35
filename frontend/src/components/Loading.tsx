import { Flex, Spinner, Text, Stack } from "@chakra-ui/react";

interface LoadingProps {
  text?: string;
  fullscreen?: boolean;
  palette?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Loading({
  text = "Loading…",
  fullscreen = false,
  palette = "blue",
  size = "lg",
}: LoadingProps) {
  const Content = (
    <Stack align="center" gap="3">
      <Spinner size={size} color="colorPalette.600" colorPalette={palette} />
      <Text fontSize="sm" color="gray.500" textAlign="center">
        {text}
      </Text>
    </Stack>
  );

  if (!fullscreen)
    return (
      <Flex justify="center" py="6">
        {Content}
      </Flex>
    );

  return (
    <Flex
      position="fixed"
      inset={0}
      justify="center"
      align="center"
      backdropFilter="blur(8px)"
      bg="blackAlpha.400"
      zIndex={9999}
    >
      {Content}
    </Flex>
  );
}
