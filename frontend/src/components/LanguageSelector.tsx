import {
  Menu as ChakraMenu,
  Button,
  HStack,
  Text,
  Portal,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { languages } from "@/data/language";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const active =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <ChakraMenu.Root>
      <ChakraMenu.Trigger asChild>
        <Button variant="ghost" size="sm" p={0}>
          <HStack gap={2}>
            {active?.flag}
            {/* <Text>{active?.label}</Text> */}
            <ChevronDown size={16} />
          </HStack>
        </Button>
      </ChakraMenu.Trigger>

      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content minW="150px">
            {languages.map((lang) => (
              <ChakraMenu.Item
                key={lang.code}
                value={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                cursor="pointer"
              >
                <HStack gap={3}>
                  {lang.flag}
                  <Text>{lang.label}</Text>
                </HStack>
              </ChakraMenu.Item>
            ))}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};
