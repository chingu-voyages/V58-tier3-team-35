// components/ProfileCard.tsx
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Card from "@/components/ui/Card";
import { getInitials, getRandomColor } from "@/utils/avatar";
import { useColorModeValue } from "./ui/color-mode";

interface ProfileRecord {
  timestamp: string;
  gender: string;
  countryCode: string;
  timezone: string;
  goal: string;
  goalOther: string;
  source: string;
  sourceOther: string;
  countryName: string;
  soloProjectTier: string;
  roleType: string;
  voyageRole: string;
  voyageSignups: string;
  voyageTier: string;
}

interface ProfileCardProps {
  data: ProfileRecord;
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const { timestamp, gender, countryName, goal, source, roleType, voyageRole } =
    data;

  const initials = getInitials(voyageRole);
  const avatarBg = getRandomColor(voyageRole);

  const labelColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Card>
      <Flex
        flexDirection={"column"}
        gap={2}
        h="full"
        justifyContent={"space-between"}
      >
        <Flex align="center" gap={4}>
          <Box
            w="60px"
            h="60px"
            rounded="full"
            bg={avatarBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="xl"
            fontWeight="bold"
            flexShrink={0}
          >
            {initials}
          </Box>

          <VStack align="start" gap={1} flex={1}>
            <Text fontSize="lg" fontWeight="bold">
              {voyageRole || "Unknown Role"}
            </Text>

            <Text fontSize="sm" color={labelColor}>
              {countryName || "Unknown Country"}
            </Text>

            <Flex gap={2} wrap="wrap" mt={2}>
              {gender && <Tag label={gender} />}
              {goal && <Tag label={goal} />}
              {source && <Tag label={source} />}
              {roleType && <Tag label={roleType} />}
            </Flex>
          </VStack>
        </Flex>

        <Flex justify={"end"}>
          <Text mt={4} fontSize="xs" color={labelColor}>
            Joined: {timestamp}
          </Text>
        </Flex>
      </Flex>
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
    >
      {label.toLowerCase()}
    </Box>
  );
}
