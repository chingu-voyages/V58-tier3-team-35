import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import Hero from "@/assets/hero.png";
import Locator from "@/assets/IoLocation.svg";
import LocatorDark from "@/assets/locator.svg";
import Arrow from "@/assets/arrow.svg";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Link, useNavigate } from "react-router";
import AiChatBot from "@/components/AiChatBot";
import { useTranslation } from "react-i18next";
import { team, type TeamMember } from "@/data/team";
import { Github, Linkedin } from "lucide-react";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "gray.200");
  const colorChange = useColorModeValue("#B09983", "#FDE3C5");
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Flex
        padding={{ base: 2, md: 10 }}
        w="full"
        gap={10}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex
          flex={1}
          flexDirection={"column"}
          gap={5}
          justifyContent={"space-between"}
        >
          <Box>
            <Text
              fontSize={{ base: 30, md: 40, xl: 60 }}
              mb={4}
              flexDirection={"row"}
              fontWeight={"bolder"}
              color={"#069668"}
            >
              {t("discover")}{" "}
              <Span fontWeight={"normal"} color={textColor}>
                {t("across")}
              </Span>
            </Text>
            <Text fontSize={{ base: 18, md: 25 }}>{t("introduction")}</Text>
          </Box>
          <Flex flexDirection={{ base: "column", md: "row" }} gap={10}>
            <Button
              bg={"#059669"}
              color={"#fff"}
              borderRadius={8}
              px={{ base: 5, md: 10 }}
              py={{ base: 7, md: 10 }}
              fontSize={18}
              onClick={() => navigate("/map")}
            >
              <Text>{t("findChingu")}</Text>
              <Image src={Locator} />
            </Button>

            <Button
              bg={"#D1FAE5"}
              color={"#064E3B"}
              borderRadius={8}
              px={{ base: 5, md: 10 }}
              py={{ base: 7, md: 10 }}
              fontSize={18}
              onClick={() => navigate("/list")}
            >
              <Text>{t("list")}</Text>
              <Image src={Arrow} />
            </Button>
          </Flex>
        </Flex>
        <Box flex={1}>
          <Image src={Hero} w={{ base: 2000, lg: 3000 }} />
        </Box>
        <AiChatBot />
      </Flex>
      <Box m={10}>
        <Heading fontSize={40} fontWeight="bold" mb={4} textAlign="center">
          {t("Meet the Team")}{" "}
          <Span fontWeight="bolder" color={colorChange}>
            (Phoenix)
          </Span>
        </Heading>
        <Text fontSize={20} color={textColor} textAlign="center">
          {t(
            "A global team of developers, designers and dreamers building tools for the chingu community. "
          )}
        </Text>
        <Grid
          gap={4}
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          justifyContent="center"
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
    </>
  );
}
