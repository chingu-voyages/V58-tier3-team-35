import { useVoyagers } from "@/api/hooks/useVoyagers";
import Loading from "@/components/Loading";
import ProfileCard from "@/components/ProfileCard";
import Search, { type SearchFilters } from "@/components/Search";
import type Voyager from "@/types/voyager";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

export default function List() {
  const [filter, setFilter] = useState<SearchFilters>({
    query: "",
    gender: "",
    soloProjectTier: "",
    goal: "",
    source: "",
    voyageRole: "",
    roleType: "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVoyagers(filter);

  const loadMoreRef = useRef(null);

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
  return (
    <Flex flexDirection={"column"} gap={5} p={{ base: 4, md: 10 }} pt={5}>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap={5}
        justify={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Text fontWeight={"bold"} fontSize={20}>
            Our Voyagers
          </Text>
        </Box>
        <Box w={{ base: "full", md: 250, lg: 400 }}>
          <Search onSearch={(filter) => setFilter(filter)} />
        </Box>
      </Flex>
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
            <ProfileCard key={voyager.timestamp} data={voyager} />
          ))}
      </Grid>

      <div ref={loadMoreRef} style={{ height: 40 }}></div>
      {isFetchingNextPage && <Loading />}
    </Flex>
  );
}
