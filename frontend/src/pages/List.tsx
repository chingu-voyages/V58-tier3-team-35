import ProfileCard from "@/components/ProfileCard";
import Search from "@/components/Search";
import Voyagers from "@/data/voyagers.json";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";

export default function List() {
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
          <Search onSearch={(filter) => console.log(filter)} />
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
        {Voyagers.length > 0 &&
          Voyagers.map((voyager) => (
            <ProfileCard key={voyager.timestamp} data={voyager} />
          ))}
      </Grid>
    </Flex>
  );
}
