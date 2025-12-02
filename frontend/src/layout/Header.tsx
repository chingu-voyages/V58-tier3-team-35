import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  Text,
  Link,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerBackdrop,
  DrawerCloseTrigger,
  Image,
} from "@chakra-ui/react";
import { Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { NavLink, useNavigate } from "react-router";
import Logo from "@/assets/logo.svg";
import LogoDark from "@/assets/logo-white.svg";
import { LanguageSelector } from "@/components/LanguageSelector";
import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const navLinks: { title: string; route: string }[] = [
    {
      title: t("menu.home"),
      route: "/",
    },
    {
      title: t("menu.map"),
      route: "/map",
    },
    {
      title: t("menu.list"),
      route: "/list",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Box
      bg={bg}
      px={4}
      py={2}
      shadow="sm"
      w="100%"
      position="sticky"
      top={0}
      zIndex={100000}
      width="100%"
    >
      <Flex
        alignItems="center"
        justifyContent={{ base: "space-between", md: "space-between" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 0 }}
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          textAlign="center"
          flex={1}
          display={{ base: "block", md: "none" }}
          color={textColor}
        >
          {currentTime.toLocaleString(i18n.language, {
            weekday: "long",
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </Text>

        <Flex
          w="full"
          align="center"
          justify={{ base: "space-between", md: "space-between" }}
        >
          {colorMode === "light" ? (
            <Image onClick={() => navigate("/")} src={Logo} />
          ) : (
            <Image onClick={() => navigate("/")} src={LogoDark} />
          )}

          <Text
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
            flex={1}
            color={textColor}
            display={{ base: "none", md: "block" }}
          >
            {currentTime.toLocaleString(i18n.language, {
              weekday: "long",
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>

          <HStack gap={4} display={{ base: "none", md: "flex" }}>
            {navLinks.map((nav) => (
              <NavLink
                key={nav.title}
                to={nav.route}
                style={({ isActive }) => ({
                  color: isActive ? "#3182ce" : "inherit",
                })}
              >
                {nav.title}
              </NavLink>
            ))}
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              variant="ghost"
            >
              {colorMode === "light" ? <Moon /> : <Sun />}
            </IconButton>
          </HStack>

          <LanguageSelector />
          <HStack display={{ base: "flex", md: "none" }}>
            <IconButton
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              variant="ghost"
            >
              {colorMode === "light" ? <Moon /> : <Sun />}
            </IconButton>
            <IconButton aria-label="Open Menu" onClick={onOpen} variant="ghost">
              <Menu />
            </IconButton>
          </HStack>
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      <Drawer.Root placement="end" open={isOpen} onOpenChange={onClose}>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerBody mt={10}>
            <VStack gap={4}>
              {navLinks.map((nav) => (
                <NavLink
                  key={nav.title}
                  to={nav.route}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    color: isActive ? "#3182ce" : "inherit",
                  })}
                >
                  {nav.title}
                </NavLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer.Root>
    </Box>
  );
};

export default Header;
