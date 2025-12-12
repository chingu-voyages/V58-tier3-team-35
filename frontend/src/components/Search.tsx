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
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

export interface SearchFilters {
  query: string;
  gender: string;
  soloProjectTier: string;
  goal: string;
  source: string;
  voyageRole: string;
  roleType: string;
}

interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

const genderCollection = createListCollection({
  items: [
    { label: "All", value: "" },
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Non-binary", value: "NON-BINARY" },
    { label: "Prefer Not to Say", value: "PREFER NOT TO SAY" },
    { label: "Trans", value: "TRANS" },
  ],
});

const soloProjectTierCollection = createListCollection({
  items: [
    { label: "All", value: "" },
    {
      label: "Tier 1 (Landing Pages)",
      value:
        "Tier 1 - HTML - Basic Javascript - Basic Algorithms (LANDING PAGES)",
    },
    {
      label: "Tier 2 (Front-End)",
      value:
        "Tier 2  - Intermediate Algorithms - Front-end Projects (FRONT-END)",
    },
    {
      label: "Tier 3 (Full-Stack)",
      value:
        "Tier 3 - Advanced Projects - Apps having both Front-end and Back-end components (FULL STACK)",
    },
  ],
});

const goalCollection = createListCollection({
  items: [
    { label: "All", value: "" },
    { label: "Accelerate Learning", value: "ACCELERATE LEARNING" },
    { label: "Gain Experience", value: "GAIN EXPERIENCE" },
    {
      label: "Escape Tutorial Purgatory",
      value: "GET OUT OF TUTORIAL PURGATORY",
    },
    { label: "Network with shared goals", value: "NETWORK WITH SHARED goalS" },
    { label: "Other", value: "OTHER" },
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

export default function Search({ onSearch, initialFilters = {} }: SearchProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    query: initialFilters.query ?? "",
    gender: initialFilters.gender ?? "",
    soloProjectTier: initialFilters.soloProjectTier ?? "",
    goal: initialFilters.goal ?? "",
    source: initialFilters.source ?? "",
    voyageRole: initialFilters.voyageRole ?? "",
    roleType: initialFilters.roleType ?? "",
  });

  const triggerBg = useColorModeValue("gray.50", "gray.800");
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const labelColor = useColorModeValue("gray.600", "gray.300");

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleClear = () => {
    const empty: SearchFilters = {
      query: "",
      gender: "",
      goal: "",
      soloProjectTier: "",
      source: "",
      voyageRole: "",
      roleType: "",
    };
    setFilters(empty);
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
          placeholder="Search voyagers..."
          _focus={{ boxShadow: "none" }}
          pointerEvents="none"
        />
      </MotionBox>

      <Modal isOpen={open} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" mb={1}>
          Search & Filters
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Search across all fields or narrow down with filters.
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
              Keyword
            </Text>
            <Input
              placeholder="Country, timezone, notes…"
              px={4}
              py={3}
              borderRadius="md"
              borderColor={triggerBorder}
              value={filters.query}
              onChange={(e) =>
                setFilters({ ...filters, query: e.target.value })
              }
            />
            <Text mt={1} fontSize="xs" color={labelColor}>
              This searches across country, timezone, other text fields, etc.
            </Text>
          </MotionBox>

          <LabeledSelect
            label="Gender"
            value={filters.gender}
            onChange={(v) => setFilters({ ...filters, gender: v })}
            collection={genderCollection}
          />

          <LabeledSelect
            label="Solo Project Tier"
            value={filters.soloProjectTier}
            onChange={(v) => setFilters({ ...filters, soloProjectTier: v })}
            collection={soloProjectTierCollection}
          />

          <LabeledSelect
            label="Goal"
            value={filters.goal}
            onChange={(v) => setFilters({ ...filters, goal: v })}
            collection={goalCollection}
          />

          <LabeledSelect
            label="Source"
            value={filters.source}
            onChange={(v) => setFilters({ ...filters, source: v })}
            collection={sourceCollection}
          />

          <LabeledSelect
            label="Voyage Role"
            value={filters.voyageRole}
            onChange={(v) => setFilters({ ...filters, voyageRole: v })}
            collection={voyageRoleCollection}
          />

          <LabeledSelect
            label="Role Type"
            value={filters.roleType}
            onChange={(v) => setFilters({ ...filters, roleType: v })}
            collection={roleTypeCollection}
          />

          <MotionBox variants={itemVariants}>
            <Flex gap={3} pt={4}>
              <Button flex={1} colorScheme="blue" onClick={handleSearch}>
                Apply
              </Button>
              <Button flex={1} variant="outline" onClick={handleClear}>
                Clear
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
