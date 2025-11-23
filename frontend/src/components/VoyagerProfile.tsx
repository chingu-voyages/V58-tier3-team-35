import { Box, Flex, Text, VStack, HStack, Avatar } from "@chakra-ui/react";
import Card from "@/components/ui/Card";
import { getInitials, getRandomColor } from "@/utils/avatar";
import { useColorModeValue } from "@/components/ui/color-mode";
import type Voyager from "@/types/voyager";

export default function VoyagerProfile({ data }: { data: Voyager }) {
  console.log(data);
  const {
    timestamp,
    gender,
    countryName,
    goal,
    source,
    roleType,
    voyageRole,
    soloProjectTier,
  } = data;

  const initials = getInitials(voyageRole);
  const avatarBg = getRandomColor(voyageRole);

  const labelColor = useColorModeValue("gray.600", "gray.400");
  const sectionBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  return (
    <Card p={6}>
      <VStack align="stretch" gap={6} overflow={"auto"}>
        <Flex align="center" gap={4}>
          <Avatar.Root size="lg">
            <Avatar.Fallback
              bg={avatarBg}
              color="white"
              fontWeight="bold"
              fontSize="lg"
            >
              {initials}
            </Avatar.Fallback>
          </Avatar.Root>

          <VStack align="start" gap={0}>
            <Text fontSize="xl" fontWeight="bold">
              {voyageRole || "Voyager"}
            </Text>
            <Text fontSize="sm" color={labelColor}>
              {countryName || "Unknown Country"}
            </Text>
          </VStack>
        </Flex>

        <HStack flexWrap="wrap" gap={2}>
          {gender && <Tag label={`Gender: ${gender}`} />}
          {goal && <Tag label={`Goal: ${goal}`} />}
          {source && <Tag label={`Source: ${source}`} />}
          {roleType && <Tag label={`Role Type: ${roleType}`} />}
          {soloProjectTier && (
            <Tag label={`Solo Project Tier: ${soloProjectTier}`} />
          )}
        </HStack>

        <Box
          p={4}
          rounded="md"
          bg={sectionBg}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack align="stretch" gap={3}>
            <Field label="Time Zone" value={data.timezone} />
            <Field label="Country Code" value={data.countryCode} />
            <Field label="Voyage Tier" value={data.voyageTier} />
            <Field label="Voyage Signups" value={data.voyageSignups} />
          </VStack>
        </Box>

        <Text fontSize="xs" color={labelColor} textAlign="right">
          Joined: {timestamp}
        </Text>
      </VStack>
    </Card>
  );
}

function Tag({ label }: { label: string }) {
  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  return (
    <Box
      bg={bg}
      px={2}
      py={1}
      fontSize="xs"
      rounded="md"
      textTransform="capitalize"
      whiteSpace="normal"
    >
      {label.toLowerCase()}
    </Box>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  const labelColor = useColorModeValue("gray.500", "gray.400");
  return (
    <Flex justify="space-between">
      <Text fontSize="sm" color={labelColor}>
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="medium" textAlign={"right"}>
        {value || "—"}
      </Text>
    </Flex>
  );
}
