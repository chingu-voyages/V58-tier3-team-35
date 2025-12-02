import { useVoyagerCoordinates } from "@/api/hooks/useVoyagerCoordinates";
import FloatingCopyButton from "@/components/FloatingCopy";
import LeafletMap from "@/components/maps/LeafletMap";
import Search, { type SearchFilters } from "@/components/Search";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export default function Map() {
  const { t } = useTranslation();
  const [urlParams, setUrlParams] = useSearchParams();

  const [filters, setFilters] = useState<SearchFilters>({
    query: urlParams.get("query") || "",
    gender: urlParams.get("gender") || "",
    soloProjectTier: urlParams.get("soloProjectTier") || "",
    goal: urlParams.get("goal") || "",
    source: urlParams.get("source") || "",
    voyageRole: urlParams.get("voyageRole") || "",
    roleType: urlParams.get("roleType") || "",
  });

  const { data, isLoading, isError, error, refetch, isRefetching } =
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
              bg="none"
              borderRadius={10}
              w={{ base: "full", md: "400px" }}
              gap={2}
            >
              <Search onSearch={(filter) => setFilters(filter)} />{" "}
              <Button onClick={() => refetch({ cancelRefetch: false })}>
                {t("refresh")}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box height="lvh">
        <LeafletMap
          data={data?.data || []}
          loading={isLoading || isRefetching}
        />
      </Box>
      {urlParams.size > 0 && <FloatingCopyButton />}
    </>
  );
}
