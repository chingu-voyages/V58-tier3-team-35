import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useColorModeValue } from "./ui/color-mode";

export interface SearchFilters {
  query: string;
  gender: string;
  goal: string;
  source: string;
  role: string;
  roleType: string;
}

interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export default function Search({ onSearch, initialFilters = {} }: SearchProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    query: initialFilters.query ?? "",
    gender: initialFilters.gender ?? "",
    goal: initialFilters.goal ?? "",
    source: initialFilters.source ?? "",
    role: initialFilters.role ?? "",
    roleType: initialFilters.roleType ?? "",
  });

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleClear = () => {
    const empty: SearchFilters = {
      query: "",
      gender: "",
      goal: "",
      source: "",
      role: "",
      roleType: "",
    };
    setFilters(empty);
    onSearch(empty);
  };

  const triggerBg = useColorModeValue("gray.50", "gray.800");
  const triggerBorder = useColorModeValue("gray.200", "whiteAlpha.300");
  const sectionBorder = useColorModeValue("gray.200", "whiteAlpha.200");

  return (
    <>
      {/* Trigger “fake” search bar */}
      <Box
        position="relative"
        cursor="pointer"
        onClick={onOpen}
        borderRadius="lg"
        boxShadow="md"
        bg={triggerBg}
        borderWidth="1px"
        w="full"
        borderColor={triggerBorder}
        _hover={{ boxShadow: "lg" }}
      >
        {/* Icon */}
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
          placeholder="Search participants or open filters…"
          _focus={{ boxShadow: "none" }}
        />
      </Box>

      {/* Modal content */}
      <Modal isOpen={open} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" mb={1}>
          Search & Filters
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Search across all fields or narrow down with filters.
        </Text>

        <VStack gap={6} align="stretch">
          {/* Keyword search */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Keyword
            </Text>
            <Input
              placeholder="Name, country, timezone, notes…"
              px={4}
              py={3}
              borderRadius="md"
              value={filters.query}
              onChange={(e) =>
                setFilters({ ...filters, query: e.target.value })
              }
            />
            <Text mt={1} fontSize="xs" color="gray.500">
              This searches across country, timezone, other text fields, etc.
            </Text>
          </Box>

          {/* Gender */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Gender
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Box>
          </Box>

          {/* Goal */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Goal
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.goal}
              onChange={(e) => setFilters({ ...filters, goal: e.target.value })}
            >
              <option value="">All</option>
              <option value="GAIN EXPERIENCE">Gain Experience</option>
              <option value="BUILD PORTFOLIO">Build Portfolio</option>
              <option value="GROW SKILLS">Grow Skills</option>
              <option value="FIND TEAM">Find Team</option>
            </Box>
          </Box>

          {/* Source */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Source
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.source}
              onChange={(e) =>
                setFilters({ ...filters, source: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="PERSONAL NETWORK">Personal Network</option>
              <option value="LINKEDIN">LinkedIn</option>
              <option value="COMMUNITY">Community</option>
              <option value="WEBSITE">Website</option>
              <option value="OTHER">Other</option>
            </Box>
          </Box>

          {/* Voyage Role */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Voyage Role
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All</option>
              <option value="Scrum Master">Scrum Master</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Project Manager">Project Manager</option>
            </Box>
          </Box>

          {/* Role Type */}
          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Role Type
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.roleType}
              onChange={(e) =>
                setFilters({ ...filters, roleType: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="FULL-TIME">Full-time</option>
              <option value="PART-TIME">Part-time</option>
              <option value="INTERN">Intern</option>
            </Box>
          </Box>

          {/* Buttons */}
          <Flex gap={3} pt={4}>
            <Button
              flex={1}
              colorScheme="blue"
              size="md"
              onClick={handleSearch}
            >
              Apply
            </Button>
            <Button flex={1} variant="outline" size="md" onClick={handleClear}>
              Clear
            </Button>
          </Flex>
        </VStack>
      </Modal>
    </>
  );
}
