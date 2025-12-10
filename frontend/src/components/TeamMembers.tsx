import { team, type TeamMember } from "@/data/team";
import {
  Box,
  Grid,
  Span,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router";
const TeamMembers = () => {
  const { t } = useTranslation();
  const colorChange = useColorModeValue("#B09983", "#FDE3C5");
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  return (
    <Box m={10}>
      <Heading fontSize={40} fontWeight="bold" mb={4} textAlign="center">
        {t("meetTheTeam")}{" "}
        <Span fontWeight="bolder" color={colorChange}>
          (Phoenix)
        </Span>
      </Heading>
      <Text fontSize={20} color={textColor} textAlign="center">
        {t(
          "globalTeam"
        )}
      </Text>
      <Grid
        gap={4}
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        justifyContent="center"
        alignItems="center"
        gapY={{ base: 2, md: 10, xl: 20 }}
        my={10}
      >
        {team.map((member: TeamMember) => (
          <VStack
            key={member.ghUsername}
            bg={bg}
            w={{ base: "full", xl: 330 }}
            borderRadius={8}
            boxShadow="md"
            alignItems="start"
            _hover={{
              transform: "scale(1.05)",
              transition: "transform 0.3s",
            }}
            transition="transform 0.3s"
          >
            <Image
              src={member.image}
              w="full"
              h="full"
              borderRadius={8}
              alt={member.name}
            />
            <VStack p={4} alignItems="flex-start" w="full">
              <Text fontSize={16} fontWeight="bold">
                {member.name}
              </Text>
              <Text fontSize={14} color={textColor}>
                {member.role}
              </Text>
              <Text fontSize={14} color={textColor}>
                {member.quote}
              </Text>
              <HStack gap={10} w="full" justifyContent="flex-end">
                <Link to={member.ghUsername} target="_blank">
                  <Github size={20} />
                </Link>
                <Link to={member.linkedin} target="_blank">
                  <Linkedin size={20} />
                </Link>
              </HStack>
            </VStack>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamMembers;
