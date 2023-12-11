import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";

export const useTimeRange = () => {
  const [initialTime, setInitialTime] = useState(0);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const hours = Array.from(
    { length: 24 - initialTime },
    (_, index) =>
      `${index + initialTime < 10 ? "0" : ""}${index + initialTime}:00`
  );

  const handleStartHourChange = (event) => {
    const selectedHour = event.target.value;
    setStartHour(selectedHour);
    updateTimeRange(selectedHour, endHour);
  };

  const handleEndHourChange = (event) => {
    const selectedHour = event.target.value;
    setEndHour(selectedHour);
    updateTimeRange(startHour, selectedHour);
  };

  const updateTimeRange = (start, end) => {
    if (start && end) {
      setTimeRange(`${start} - ${end}`);
    } else {
      setTimeRange("");
    }
  };

  const renderTimeRange = () => {
    return (
      <Box>
        <Flex gap="10px" w="full" alignItems="center">
          <Select value={startHour} onChange={handleStartHourChange}>
            <option value="">Select an hour</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </Select>
          <Box>-</Box>

          <Select value={endHour} onChange={handleEndHourChange}>
            <option value="">Select an hour</option>
            {hours
              .filter((hour) => hour > startHour)
              .map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
          </Select>
        </Flex>
      </Box>
    );
  };

  return { renderTimeRange, timeRange, setInitialTime };
};
