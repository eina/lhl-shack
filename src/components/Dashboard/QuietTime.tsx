import React from "react";
import { Box, Text } from "@chakra-ui/core";

import Clock from "react-live-clock";
const QuietTime = ({ active, startTime, endTime }: { active: boolean; startTime: string; endTime: string }) => {
  // change block color from blue to orange depending
  return (
    <Box
      bg={active ? "blue.100" : "orange.100"}
      className="dashboard-box"
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // mr={[0, 0, "1em"]}
    >
      <Text
        fontFamily="montserrat"
        fontWeight="bold"
        fontSize="6xl"
        color={active ? "blue.900" : "orange.900"}
        lineHeight="shorter"
        className="dashboard-clock"
      >
        <Clock format={"h:mm A"} ticking={true} timezone={"US/Pacific"} />
      </Text>
      {active ? <Text>Quiet time has started. It will end at {endTime} AM.</Text> : <Text>Quiet time will start at {startTime} PM. </Text>}
    </Box>
  );
};

export default QuietTime;