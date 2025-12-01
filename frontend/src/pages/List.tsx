import useVoyagerDetails from "@/api/hooks/useVoyagerDetails";
import { useVoyagers } from "@/api/hooks/useVoyagers";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import ProfileCard from "@/components/ProfileCard";
import Search, { type SearchFilters } from "@/components/Search";
import VoyagerProfile from "@/components/VoyagerProfile";
import type Voyager from "@/types/voyager";
import { Box, Button, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AddVoyager from "@/components/AddVoyager";
import { useTranslation } from "react-i18next";

export default function List() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<SearchFilters>({
    query: "",
    gender: "",
    soloProjectTier: "",
    goal: "",
    source: "",
    voyageRole: "",
    roleType: "",
  });

  const [voyagerId, setVoyagerId] = useState<string | null>(null);
  const [showVoyagerModal, setShowVoyagerModal] = useState<boolean>(false);
  const {
    data: voyagerData,
    isLoading: voyagerLoading,
    isError,
    error,
  } = useVoyagerDetails(voyagerId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading: isVoyagerLoading,
    isError: isVoyagerError,
    error: voyagerError,
  } = useVoyagers(filter);

  const loadMoreRef = useRef(null);
  const {
    open: isAddVoyagerOpen,
    onOpen: onAddVoyagerOpen,
    onClose: onAddVoyagerClose,
  } = useDisclosure();

  useEffect(() => {
    if (isVoyagerError && voyagerError) {
      toast.error(voyagerError.message, {
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
  }, [isVoyagerError, voyagerError]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const Voyagers = data?.pages.flatMap((page: any) => page.data.docs) ?? [];
  return isVoyagerLoading ? (
    <Loading fullscreen size="lg" />
  ) : (
    <>
      <Flex flexDirection={"column"} gap={5} p={{ base: 4, md: 10 }} pt={5}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap={5}
          justify={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Text fontWeight={"bold"} fontSize={20}>
              {t("ourVoyager")}
            </Text>
          </Box>
          <Flex
            w={{ base: "full", md: 250, lg: 400 }}
            flexDirection={{ base: "column", md: "row" }}
            gap={2}
          >
            <Search onSearch={(filter) => setFilter(filter)} />
            <Button borderRadius={10} onClick={onAddVoyagerOpen}>
              {t("addVoyager")}
            </Button>
          </Flex>
        </Flex>
        {Voyagers.length > 0 ? (
          <>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3,1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={4}
            >
              {Voyagers &&
                Voyagers.length > 0 &&
                Voyagers.map((voyager: Voyager) => (
                  <ProfileCard
                    onCardClick={() => {
                      setVoyagerId(voyager._id);
                      setShowVoyagerModal(true);
                    }}
                    key={voyager._id}
                    data={voyager}
                  />
                ))}
            </Grid>
            <div ref={loadMoreRef} style={{ height: 40 }}></div>
            {isFetchingNextPage && <Loading text={t("loading")} />}
          </>
        ) : (
          <Box p={{ base: 4, md: 10 }} pt={5}>
            <EmptyState
              title={t("noVoyagersFound")}
              description={t("noVoyagerDescription")}
            />
          </Box>
        )}
      </Flex>
      <Modal
        isOpen={showVoyagerModal}
        onClose={() => setShowVoyagerModal(false)}
      >
        {!voyagerData && voyagerLoading && (
          <Box p={4}>
            <Loading fullscreen text={t("loading")} />
          </Box>
        )}
        {voyagerData && !voyagerLoading && (
          <VoyagerProfile data={voyagerData.data} />
        )}
      </Modal>
      <AddVoyager isOpen={isAddVoyagerOpen} onClose={onAddVoyagerClose} />
    </>
  );
}
