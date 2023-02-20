import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h="100vh" justifyContent={"center"}>
      <Box transform={"scale(20)"}>
        <Spinner size={"xs"} />
      </Box>
    </VStack>
  );
};

export default Loader;
