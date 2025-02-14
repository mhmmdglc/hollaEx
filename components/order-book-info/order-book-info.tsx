'use client';

import { Box, Code, Flex, Stack, Text } from '@mantine/core';

export function OrderBookInfo() {
  return (
    <Flex justify="center" align="center" w="100%" p="xl" direction="column">
      <Text c="dimmed" ta="center" size="lg" maw={720} mx="auto">
        Real-time cryptocurrency orderbook implementation using WebSocket connection to HollaEx API
      </Text>

      <Stack maw={580} mx="auto" mt="xl">
        <Box c="dimmed">• Live BTC/USDT orderbook visualization with depth chart</Box>
        <Box c="dimmed">• Real-time price updates and spread calculations</Box>
        <Box c="dimmed">• WebSocket integration with HollaEx streaming API</Box>
        <Box c="dimmed">• Dark/Light theme support with Mantine UI components</Box>
        <Box c="dimmed">• Responsive design and smooth animations</Box>
      </Stack>

      <Stack maw={720} mx="auto" mt={40}>
        <Text ta="center" fw={500} size="lg">
          Key Calculations
        </Text>

        <Box>
          <Text fw={500}>Spread Calculation:</Text>
          <Code block>spread = |lowestAsk - highestBid|</Code>
        </Box>

        <Box>
          <Text fw={500}>Depth Visualization:</Text>
          <Code block>depthPercentage = (currentAmount / maxAmount) * 100</Code>
        </Box>

        <Box>
          <Text fw={500}>Cumulative Total:</Text>
          <Code block>total = Σ(amount[0...currentIndex])</Code>
        </Box>
      </Stack>
    </Flex>
  );
}
