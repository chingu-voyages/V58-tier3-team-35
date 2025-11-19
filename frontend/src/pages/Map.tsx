import LeafletMap from "@/components/maps/LeafletMap";
import Search from "@/components/Search";
import { Box, Flex } from "@chakra-ui/react";

export default function Map() {
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
              <Search onSearch={(filter) => console.log(filter)} />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box height="lvh">
        <LeafletMap />
      </Box>
    </>
  );
}
