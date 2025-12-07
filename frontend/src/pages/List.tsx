import useVoyagerDetails from "@/api/hooks/useVoyagerDetails";
import { useVoyagers } from "@/api/hooks/useVoyagers";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import ProfileCard from "@/components/ProfileCard";
import Search, { type SearchFilters } from "@/components/Search";
import VoyagerProfile from "@/components/VoyagerProfile";
import type Voyager from "@/types/voyager";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useDisclosure,
  HStack,
  IconButton,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddVoyager from "@/components/AddVoyager";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import FloatingCopyButton from "@/components/FloatingCopy";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import api from "@/api/api";

export default function List() {
  const { t } = useTranslation();

  const [urlParams, setUrlParams] = useSearchParams();

  const [filter, setFilter] = useState<SearchFilters>({
    search: urlParams.get("search") || "",
    gender: urlParams.get("gender") || "",
    soloProjectTier: urlParams.get("soloProjectTier") || "",
    goal: urlParams.get("goal") || "",
    source: urlParams.get("source") || "",
    voyageRole: urlParams.get("voyageRole") || "",
    roleType: urlParams.get("roleType") || "",
  });

  const page = parseInt(urlParams.get("page") || "1", 10);
  const setPage = (newPage: number) => {
    setUrlParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const [voyagerId, setVoyagerId] = useState<string | null>(null);
  const [showVoyagerModal, setShowVoyagerModal] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState(false);

  const {
    data: voyagerData,
    isLoading: voyagerLoading,
    isError,
    error,
  } = useVoyagerDetails(voyagerId);

  const {
    data,
    refetch,
    isLoading: isVoyagerLoading,
    isError: isVoyagerError,
    error: voyagerError,
    isRefetching,
  } = useVoyagers(filter, page);

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

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await api.get("/export", {
        params: filter,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "voyagers_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Export downloaded successfully");
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const Voyagers = data?.data.docs ?? [];
  const totalPages = data?.data.totalPages ?? 1;

  return isVoyagerLoading || isRefetching ? (
    <Loading fullscreen size="lg" text={t("loading")} />
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
            w={{ base: "full", md: 550, lg: 600 }}
            flexDirection={{ base: "column", md: "row" }}
            gap={2}
          >
            <Search
              disableUrlUpdate
              onSearch={(filter) => {
                setFilter(filter);

                setUrlParams((prev) => {
                  const newParams = new URLSearchParams();

                  if (filter.search) newParams.set("search", filter.search);
                  if (filter.gender) newParams.set("gender", filter.gender);
                  if (filter.soloProjectTier)
                    newParams.set("soloProjectTier", filter.soloProjectTier);
                  if (filter.goal) newParams.set("goal", filter.goal);
                  if (filter.source) newParams.set("source", filter.source);
                  if (filter.voyageRole)
                    newParams.set("voyageRole", filter.voyageRole);
                  if (filter.roleType)
                    newParams.set("roleType", filter.roleType);

                  newParams.set("page", "1");

                  return newParams;
                });
              }}
            />
            <Button borderRadius={10} onClick={onAddVoyagerOpen}>
              {t("addVoyager")}
            </Button>
            <Button borderRadius={10} onClick={() => refetch()}>
              {t("refresh")}
            </Button>
            <Button
              borderRadius={10}
              onClick={handleExport}
              loading={isExporting}
            >
              <Download size={16} />
              Export
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
              {Voyagers.map((voyager: Voyager) => (
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

            <Flex justify="center" mt={8} align="center" gap={2} wrap="wrap">
              <IconButton
                aria-label="Previous page"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                variant="outline"
                size="sm"
              >
                <ChevronLeft />
              </IconButton>

              {getPaginationRange(page, totalPages).map((pageNumber, index) =>
                pageNumber === "..." ? (
                  <Text key={index}>...</Text>
                ) : (
                  <Button
                    key={index}
                    size="sm"
                    variant={pageNumber === page ? "solid" : "outline"}
                    colorScheme={pageNumber === page ? "blue" : "gray"}
                    onClick={() => setPage(pageNumber as number)}
                  >
                    {pageNumber}
                  </Button>
                )
              )}

              <IconButton
                aria-label="Next page"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                variant="outline"
                size="sm"
              >
                <ChevronRight />
              </IconButton>
            </Flex>
          </>
        ) : (
          <Box p={{ base: 4, md: 10 }} pt={5}>
            <EmptyState
              title={t("noVoyagersFound")}
              description={t("noVoyagerDescription")}
            />
          </Box>
        )}
        {urlParams.size > 0 && <FloatingCopyButton />}
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
