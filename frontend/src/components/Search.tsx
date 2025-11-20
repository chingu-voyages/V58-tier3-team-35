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

export default function Search({ onSearch, initialFilters = {} }: SearchProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    query: initialFilters.query ?? "",
    goal: initialFilters.goal ?? "",
    gender: initialFilters.gender ?? "",
    soloProjectTier: initialFilters.soloProjectTier ?? "",
    source: initialFilters.source ?? "",
    voyageRole: initialFilters.voyageRole ?? "",
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
      soloProjectTier: "",
      source: "",
      voyageRole: "",
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
        />
      </Box>

      <Modal isOpen={open} onClose={onClose}>
        <Text fontSize="2xl" fontWeight="bold" mb={1}>
          Search & Filters
        </Text>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Search across all fields or narrow down with filters.
        </Text>

        <VStack gap={6} align="stretch">
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
              <option value="NON-BINARY">NON-BINARY</option>
              <option value="PREFER NOT TO SAY">PREFER NOT TO SAY</option>
              <option value="TRANS">TRANS</option>
            </Box>
          </Box>

          <Box>
            <Text mb={2} fontWeight="medium" fontSize="sm">
              Solo Project Tier
            </Text>
            <Box
              as="select"
              w="100%"
              px={4}
              py={3}
              borderWidth="1px"
              borderRadius="md"
              value={filters.soloProjectTier}
              onChange={(e) => setFilters({ ...filters, goal: e.target.value })}
            >
              <option value="">All</option>
              <option value="Tier 1 - HTML - Basic Javascript - Basic Algorithms (LANDING PAGES)">
                Tier 1 - HTML - Basic Javascript - Basic Algorithms (LANDING
                PAGES)
              </option>
              <option value="Tier 2  - Intermediate Algorithms - Front-end Projects (FRONT-END)">
                Tier 2 - Intermediate Algorithms - Front-end Projects
                (FRONT-END)
              </option>
              <option value="Tier 3 - Advanced Projects - Apps having both Front-end and Back-end components (FULL STACK)">
                Tier 3 - Advanced Projects - Apps having both Front-end and
                Back-end components (FULL STACK)
              </option>
            </Box>
          </Box>

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
              <option value="ACCELERATE LEARNING">ACCELERATE LEARNING</option>
              <option value="GAIN EXPERIENCE">GAIN EXPERIENCE</option>
              <option value="GET OUT OF TUTORIAL PURGATORY">
                GET OUT OF TUTORIAL PURGATORY
              </option>
              <option value="NETWORK WITH SHARED goalS">
                NETWORK WITH SHARED goalS
              </option>
              <option value="OTHER">OTHER</option>
            </Box>
          </Box>

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
              <option value="DEV">DEV</option>
              <option value="DEV.TO">DEV.TO</option>
              <option value="FLUTTER EXPLAINED">FLUTTER EXPLAINED</option>
              <option value="FREE CODE CAMP FORUM">FREE CODE CAMP FORUM</option>
              <option value="GOOGLE SEARCH">GOOGLE SEARCH</option>
              <option value="LINKEDIN">LinkedIn</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="OTHER">OTHER</option>
              <option value="PERSONAL NETWORK">PERSONAL NETWORK</option>
              <option value="SCRIMBA">Scrimba</option>
              <option value="TWITTER">Twitter</option>
              <option value="THE JOB HACKERS">The Job Hackers</option>
              <option value="YOUTUBE">YouTube</option>
            </Box>
          </Box>

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
              value={filters.voyageRole}
              onChange={(e) =>
                setFilters({ ...filters, voyageRole: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Owner">Product Owner</option>
              <option value="Scrum Master">Scrum Master</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </Box>
          </Box>

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
              <option value="Python">Python</option>
              <option value="Web">Web</option>
            </Box>
          </Box>

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
