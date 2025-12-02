import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Span,
  Text,
} from "@chakra-ui/react";
import Hero from "@/assets/hero.png";
import Locator from "@/assets/IoLocation.svg";
import LocatorDark from "@/assets/locator.svg";
import Arrow from "@/assets/arrow.svg";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { useNavigate } from "react-router";
import AiChatBot from "@/components/AiChatBot";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.700", "gray.200");
  return (
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
  );
}
