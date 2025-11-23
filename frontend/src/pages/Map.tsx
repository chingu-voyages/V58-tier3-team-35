import { useVoyagerCoordinates } from "@/api/hooks.ts/useVoyagerCoordinates";
import LeafletMap from "@/components/maps/LeafletMap";
import Search, { type SearchFilters } from "@/components/Search";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Map() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    gender: "",
    soloProjectTier: "",
    goal: "",
    source: "",
    voyageRole: "",
    roleType: "",
  });

  const { data, isLoading, isError, error, refetch } =
    useVoyagerCoordinates(filters);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message, {
        duration: Infinity,
        action: {
          label: "Retry",
          onClick: () => {
            toast.dismiss();
            refetch();
          },
        },
      });
    }
  }, [isError, error]);

  return (
    <>
      <Box position={"relative"}>
        <Box
          position={"fixed"}
          bg={"transparent"}
          left={0}
          right={0}
          w="full"
          p={3}
          zIndex={1000}
        >
          <Flex w="full" justifyContent={"center"}>
            <Flex
              bg="white"
              borderRadius={10}
              w={{ base: "full", md: "400px" }}
              boxShadow={"md"}
            >
              <Search onSearch={(filter) => setFilters(filter)} />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box height="lvh">
        <LeafletMap data={data?.data || []} loading={isLoading} />
      </Box>
    </>
  );
}
