import { Box, Button, Flex, Text, Image, VStack, Span } from "@chakra-ui/react";
import Hero from "@/assets/hero.png";
import Locator from "@/assets/IoLocation.svg";
import LocatorDark from "@/assets/locator.svg";
import Arrow from "@/assets/arrow.svg";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useNavigate } from "react-router";
import AiChatBot from "@/components/AiChatBot";
import { useTranslation } from "react-i18next";
import TeamMembers from "@/components/TeamMembers";
import MapVideo from "/src/assets/videos/background.mp4";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // COLORS
  const overlayBg = useColorModeValue(
    "whiteAlpha.800", // light mode → soft white veil over video
    "blackAlpha.700" // dark mode → darken video for contrast
  );

  const headingAccent = useColorModeValue("green.700", "green.200"); // “Chingus”
  const headingSecondary = useColorModeValue("gray.800", "whiteAlpha.900");

  const bodyTextColor = useColorModeValue("gray.700", "gray.100");

  const primaryBtnBg = useColorModeValue("green.600", "green.400");
  const primaryBtnHover = useColorModeValue("green.700", "green.300");
  const primaryBtnText = useColorModeValue("white", "gray.900");

  const secondaryBtnBg = useColorModeValue("green.100", "whiteAlpha.200");
  const secondaryBtnHover = useColorModeValue("green.200", "whiteAlpha.300");
  const secondaryBtnText = useColorModeValue("green.900", "green.100");

  const locatorIcon = useColorModeValue(LocatorDark, Locator); // darker icon on light bg, lighter on dark

  return (
    <>
      <Box position="relative" height="100vh" overflow="hidden">
        {/* Background Video */}
        <Box
          as="video"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          objectFit="cover"
          zIndex="-1"
          // @ts-expect-error - video attrs valid
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={MapVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>

        <Box position="absolute" inset="0" bg={overlayBg} zIndex="0" />

        <Flex
          px={{ base: 4, md: 10 }}
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
          gap={10}
          flexDirection={{ base: "column", lg: "row" }}
          zIndex={1}
        >
          <VStack
            gap={6}
            w={{ base: "full", lg: "2/3", xl: "1/2" }}
            align="center"
            textAlign="center"
            zIndex={1}
          >
            {/* Heading */}
            <Text
              fontSize={{ base: 32, md: 44, xl: 60 }}
              fontWeight="extrabold"
              lineHeight="1.1"
            >
              <Span color={headingSecondary}>{t("discover")} </Span>
              <Span color={headingAccent}>{t("chingus")}</Span>
              <Span color={headingSecondary}> {t("across")}</Span>
            </Text>

            {/* Body copy */}
            <Text
              fontSize={{ base: 16, md: 20 }}
              maxW="3xl"
              color={bodyTextColor}
            >
              {t("introduction")}
            </Text>

            {/* CTA buttons */}
            <Flex flexDirection={{ base: "column", md: "row" }} gap={4} mt={2}>
              <Button
                bg={primaryBtnBg}
                _hover={{ bg: primaryBtnHover }}
                color={primaryBtnText}
                borderRadius={8}
                px={{ base: 6, md: 10 }}
                py={{ base: 7, md: 8 }}
                fontSize={18}
                display="inline-flex"
                alignItems="center"
                gap={2}
                onClick={() => navigate("/map")}
              >
                <Text>{t("findChingu")}</Text>
                <Image src={locatorIcon} alt="location icon" />
              </Button>

              <Button
                bg={secondaryBtnBg}
                _hover={{ bg: secondaryBtnHover }}
                color={secondaryBtnText}
                borderRadius={8}
                px={{ base: 6, md: 10 }}
                py={{ base: 7, md: 8 }}
                fontSize={18}
                display="inline-flex"
                alignItems="center"
                gap={2}
                onClick={() => navigate("/list")}
              >
                <Text>{t("list")}</Text>
                <Image src={Arrow} alt="arrow icon" />
              </Button>
            </Flex>
          </VStack>

          <AiChatBot />
        </Flex>
      </Box>

      <TeamMembers />
    </>
  );
}
