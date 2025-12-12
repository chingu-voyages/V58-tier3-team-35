import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useDisclosure,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

export interface SearchFilters {
  search: string;
  gender: string;
  soloProjectTier: string;
  goal: string;
  source: string;
  voyageRole: string;
  roleType: string;
}

interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
  disableUrlUpdate?: boolean;
}

export default function Search({
  onSearch,
  disableUrlUpdate = false,
}: SearchProps) {
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Filer option data
   */

  const genderCollection = createListCollection({
    items: [
      { label: t("all"), value: "" },
      { label: t("male"), value: "MALE" },
      { label: t("female"), value: "FEMALE" },
      { label: t("nonBinary"), value: "NON-BINARY" },
      { label: t("preferNotSay"), value: "PREFER NOT TO SAY" },
      { label: t("trans"), value: "TRANS" },
    ],
  });

  const soloProjectTierCollection = createListCollection({
    items: [
      { label: t("all"), value: "" },
      {
        label: t("tier1Landing"),
        value:
          "Tier 1 - HTML - Basic Javascript - Basic Algorithms (LANDING PAGES)",
      },
      {
        label: t("tier2frontend"),
        value:
          "Tier 2  - Intermediate Algorithms - Front-end Projects (FRONT-END)",
      },
      {
        label: t("tier3full"),
        value:
          "Tier 3 - Advanced Projects - Apps having both Front-end and Back-end components (FULL STACK)",
      },
    ],
  });

  const goalCollection = createListCollection({
    items: [
      { label: t("all"), value: "" },
      { label: t("accelerate"), value: "ACCELERATE LEARNING" },
      { label: t("gainExperience"), value: "GAIN EXPERIENCE" },
      {
        label: t("escapeTutorial"),
        value: "GET OUT OF TUTORIAL PURGATORY",
      },
      {
        label: t("network"),
        value: "NETWORK WITH SHARED goalS",
      },
      { label: t("other"), value: "OTHER" },
    ],
  });

  const sourceCollection = createListCollection({
    items: [
      { label: "All", value: "" },
      { label: "DEV", value: "DEV" },
      { label: "DEV.TO", value: "DEV.TO" },
      { label: "Flutter Explained", value: "FLUTTER EXPLAINED" },
      { label: "FreeCodeCamp Forum", value: "FREE CODE CAMP FORUM" },
      { label: "Google Search", value: "GOOGLE SEARCH" },
      { label: "LinkedIn", value: "LINKEDIN" },
      { label: "Medium", value: "MEDIUM" },
      { label: "Other", value: "OTHER" },
      { label: "Personal Network", value: "PERSONAL NETWORK" },
      { label: "Scrimba", value: "SCRIMBA" },
      { label: "Twitter", value: "TWITTER" },
      { label: "The Job Hackers", value: "THE JOB HACKERS" },
      { label: "YouTube", value: "YOUTUBE" },
    ],
  });

  const voyageRoleCollection = createListCollection({
    items: [
      { label: "All", value: "" },
      { label: "Data Scientist", value: "Data Scientist" },
      { label: "Product Owner", value: "Product Owner" },
      { label: "Scrum Master", value: "Scrum Master" },
      { label: "UI/UX Designer", value: "UI/UX Designer" },
    ],
  });

  const roleTypeCollection = createListCollection({
    items: [
      { label: "All", value: "" },
      { label: "Python", value: "Python" },
      { label: "Web", value: "Web" },
    ],
  });

  /**
   * Filter option data ends
   */

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<SearchFilters>({
    search: searchParams.get("search") ?? "",
    gender: searchParams.get("gender") ?? "",
    soloProjectTier: searchParams.get("soloProjectTier") ?? "",
    goal: searchParams.get("goal") ?? "",
    source: searchParams.get("source") ?? "",
    voyageRole: searchParams.get("voyageRole") ?? "",
    roleType: searchParams.get("roleType") ?? "",
  });

  const triggerBg = useColorModeValue("gray.50", "gray.800");
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const labelColor = useColorModeValue("gray.600", "gray.300");

  const handleSearch = () => {
    const newParams: any = {};

    if (filters.search) newParams.search = filters.search;
    if (filters.gender) newParams.gender = filters.gender;
    if (filters.soloProjectTier)
      newParams.soloProjectTier = filters.soloProjectTier;
    if (filters.goal) newParams.goal = filters.goal;
    if (filters.source) newParams.source = filters.source;
    if (filters.voyageRole) newParams.voyageRole = filters.voyageRole;
    if (filters.roleType) newParams.roleType = filters.roleType;

    const currentParams = Object.fromEntries(searchParams.entries());

    if (
      !disableUrlUpdate &&
      JSON.stringify(currentParams) !== JSON.stringify(newParams)
    ) {
      setSearchParams(newParams);
    }
    onSearch(filters);
    onClose();
  };

  const handleClear = () => {
    const empty: SearchFilters = {
      search: "",
      gender: "",
      goal: "",
      soloProjectTier: "",
      source: "",
      voyageRole: "",
      roleType: "",
    };
    setFilters(empty);
    if (!disableUrlUpdate) {
      setSearchParams([]);
    }
    onSearch(empty);
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <>
      <MotionBox
        position="relative"
        cursor="pointer"
        onClick={onOpen}
        borderRadius="lg"
        boxShadow="md"
        bg={triggerBg}
        borderWidth="1px"
        w="full"
        borderColor={triggerBorder}
        whileHover={{ scale: 1.02, boxShadow: "lg" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          position="absolute"
          left="14px"
          top="50%"
          transform="translateY(-50%)"
          fontSize="sm"
          color="gray.500"
        >
          🔍
        </Box>

        <Input
          ref={inputRef}
          readOnly
          border="none"
          bg="transparent"
          pl="40px"
          pr="16px"
          py="14px"
          fontSize="sm"
          placeholder={t("searchFilterPlaceHolder")}
          _focus={{ boxShadow: "none" }}
          pointerEvents="none"
        />
      </MotionBox>

      <Modal isOpen={open} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" mb={1}>
          {t("searchFilter")}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          {t("searchFilterDescription")}
        </Text>

        <MotionVStack
          gap={6}
          align="stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionBox variants={itemVariants}>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              {t("keyword")}
            </Text>
            <Input
              placeholder={t("keywordPlaceholder")}
              px={4}
              py={3}
              borderRadius="md"
              borderColor={triggerBorder}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <Text mt={1} fontSize="xs" color={labelColor}>
              {t("searchFilterDescription2")}
            </Text>
          </MotionBox>

          <LabeledSelect
            label={t("gender")}
            value={filters.gender}
            onChange={(v) => setFilters({ ...filters, gender: v })}
            collection={genderCollection}
          />

          <LabeledSelect
            label={t("soloProjectTier")}
            value={filters.soloProjectTier}
            onChange={(v) => setFilters({ ...filters, soloProjectTier: v })}
            collection={soloProjectTierCollection}
          />

          <LabeledSelect
            label={t("goal")}
            value={filters.goal}
            onChange={(v) => setFilters({ ...filters, goal: v })}
            collection={goalCollection}
          />

          <LabeledSelect
            label={t("source")}
            value={filters.source}
            onChange={(v) => setFilters({ ...filters, source: v })}
            collection={sourceCollection}
          />

          <LabeledSelect
            label={t("voyageRole")}
            value={filters.voyageRole}
            onChange={(v) => setFilters({ ...filters, voyageRole: v })}
            collection={voyageRoleCollection}
          />

          <LabeledSelect
            label={t("roleType")}
            value={filters.roleType}
            onChange={(v) => setFilters({ ...filters, roleType: v })}
            collection={roleTypeCollection}
          />

          <MotionBox variants={itemVariants}>
            <Flex gap={3} pt={4}>
              <Button flex={1} colorScheme="blue" onClick={handleSearch}>
                {t("apply")}
              </Button>
              <Button flex={1} variant="outline" onClick={handleClear}>
                {t("clear")}
              </Button>
            </Flex>
          </MotionBox>
        </MotionVStack>
      </Modal>
    </>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const LabeledSelect = ({
  label,
  value,
  onChange,
  collection,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  collection: any;
}) => {
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");

  return (
    <MotionBox variants={itemVariants}>
      <SelectRoot
        collection={collection}
        value={value ? [value] : []}
        onValueChange={(e: any) => onChange(e.value[0])}
        size="md"
      >
        <SelectLabel mb={2} fontWeight="medium" fontSize="sm">
          {label}
        </SelectLabel>
        <SelectTrigger
          borderColor={triggerBorder}
          borderWidth="1px"
          borderRadius="md"
          p={2}
        >
          <SelectValueText placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent zIndex={2000} portalled={false}>
          {collection.items.map((item: any) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </MotionBox>
  );
};
