import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  useFavoriteFilters,
  useDeleteFavoriteFilter,
  type FavoriteFilter,
} from "@/api/hooks/useFavoriteFilters";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function MyFilters() {
  const { t } = useTranslation();
  const { data: filters, isLoading, error } = useFavoriteFilters();
  const { mutate: deleteFilter, isPending: isDeleting } =
    useDeleteFavoriteFilter();

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this filter?")) {
      deleteFilter(id, {
        onSuccess: () => {
          toast.success("Filter deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete filter");
        },
      });
    }
  };

  const handleOpenFilter = (url: string) => {
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text color="red.500">Failed to load filters.</Text>
      </Center>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading mb={8} fontSize="3xl" fontWeight="bold">
        {t("menu.filter")}
      </Heading>

      {filters && filters.length === 0 ? (
        <Text textAlign="center" color={textColor} fontSize="lg">
          You haven't saved any filters yet.
        </Text>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {filters?.map((filter: FavoriteFilter) => (
            <Box
              key={filter._id}
              bg={bg}
              p={6}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              shadow="sm"
              _hover={{ shadow: "md", borderColor: "blue.500" }}
              cursor="pointer"
              onClick={() => handleOpenFilter(filter.url)}
              transition="all 0.2s"
              position="relative"
            >
              <VStack align="start" gap={3}>
                <Heading size="md" fontWeight="semibold">
                  {filter.name}
                </Heading>
                <Text fontSize="sm" color={textColor}>
                  Created: {new Date(filter.createdAt).toLocaleString()}
                </Text>

                <HStack w="full" justify="flex-end" mt={2}>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="gray.500"
                    _hover={{ color: "red.500", bg: "red.50" }}
                    onClick={(e) => handleDelete(filter._id, e)}
                    disabled={isDeleting}
                  >
                    <Trash2 size={18} />
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}
