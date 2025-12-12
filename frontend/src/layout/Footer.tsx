import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Link,
  Grid,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import team from "@/data/team.json"; // adjust path as needed
import { useColorModeValue } from "@/components/ui/color-mode";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.700", "gray.400");

  return (
    <Box as="footer" bg={bg} color={color} py={6} px={8} mt="auto">
      <Flex
        direction="column"
        align={{ base: "center", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <Box flex={1}>
          <Grid gap={4} templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}>
            {" "}
          </Grid>
        </Box>
        <Link
          href="https://github.com/chingu-voyages/V58-tier3-team-35"
          target="_blank"
          flex={1}
        >
          <IconButton
            aria-label="Project GitHub"
            variant="ghost"
            colorScheme="gray"
            fontSize="xl"
          />
          <FaGithub size={40} />
        </Link>

        <Text fontSize="sm" textAlign={{ base: "center", md: "right" }}>
          © {new Date().getFullYear()} {t("footer.copyright")}
        </Text>
      </Flex>
    </Box>
  );
}
