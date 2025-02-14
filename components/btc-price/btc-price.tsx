'use client';

import { useEffect, useState } from 'react';
import { IconCoinBitcoin, IconX } from '@tabler/icons-react';
import { Box, Card, Flex, Grid, Group, Stack, Text } from '@mantine/core';
import wsService from '@/service/websocket';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

const MAX_ORDERS = 8;

interface BtcPriceProps {
  onClose: () => void;
}

const BtcPrice = ({ onClose }: BtcPriceProps) => {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState<number>(0);

  const processOrders = (orders: string[][], isAsk: boolean) => {
    return orders
      .slice(0, MAX_ORDERS)
      .map((order, index, array) => {
        const price = parseFloat(order[0]);
        const amount = parseFloat(order[1]);
        const total = array.slice(0, index + 1).reduce((sum, item) => sum + parseFloat(item[1]), 0);

        return { price, amount, total };
      })
      .sort((a, b) => (isAsk ? b.price - a.price : b.price - a.price));
  };

  const calculateDepthPercentage = (orders: OrderBookEntry[], currentIndex: number) => {
    const maxAmount = Math.max(...orders.map((order) => order.amount));
    const currentAmount = orders[currentIndex].amount;
    return (currentAmount / maxAmount) * 100;
  };

  useEffect(() => {
    wsService.connect();

    wsService.subscribeToOrderbook('btc-usdt', (data) => {
      if (data.topic === 'orderbook' && data.symbol === 'btc-usdt') {
        if (data.data?.asks) {
          const processedAsks = processOrders(data.data.asks, true);
          setAsks(processedAsks);
        }

        if (data.data?.bids) {
          const processedBids = processOrders(data.data.bids, false);
          setBids(processedBids);
        }

        if (data.data?.asks?.[0] && data.data?.bids?.[0]) {
          const lowestAsk = parseFloat(data.data.asks[0][0]);
          const highestBid = parseFloat(data.data.bids[0][0]);
          setSpread(Math.abs(lowestAsk - highestBid));
        }
      }
    });

    return () => {
      wsService.close();
    };
  }, []);

  return (
    <Card p="md" radius="md" w={448}>
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <Flex
            justify="center"
            align="center"
            bg="yellow.5"
            w={24}
            h={24}
            style={{ borderRadius: '50%' }}
          >
            <IconCoinBitcoin size={26} stroke={1} color="var(--mantine-color-white)" />
          </Flex>
          <Text fw={700}>ORDERBOOK</Text>
        </Group>
        <IconX
          style={{ cursor: 'pointer' }}
          onClick={onClose}
          color="var(--mantine-color-dimmed)"
          size={20}
          stroke={1.5}
        />
      </Group>

      <Grid columns={3} mb="xs">
        <Grid.Col span={1}>
          <Text size="sm" c="dimmed">
            Price (USDT)
          </Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text size="sm" c="dimmed" ta="center">
            Amount (BTC)
          </Text>
        </Grid.Col>
        <Grid.Col span={1}>
          <Text size="sm" c="dimmed" ta="right">
            Total
          </Text>
        </Grid.Col>
      </Grid>

      <Stack gap="xs" mb="md">
        {asks.map((ask, i) => (
          <Box key={i} pos="relative">
            <Box
              pos="absolute"
              right={0}
              h="100%"
              bg="red.1"
              opacity={0.2}
              w={`${calculateDepthPercentage(asks, i)}%`}
            />
            <Grid columns={3} style={{ position: 'relative' }}>
              <Grid.Col span={1}>
                <Text size="sm" c="red.6">
                  {ask.price.toFixed(2)}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm" ta="center">
                  {ask.amount.toFixed(5)}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm" ta="right">
                  {ask.total.toFixed(5)}
                </Text>
              </Grid.Col>
            </Grid>
          </Box>
        ))}
      </Stack>

      <Box
        py="xs"
        style={{
          borderTop: '1px solid var(--mantine-color-gray-3)',
          borderBottom: '1px solid var(--mantine-color-gray-3)',
        }}
      >
        <Text ta="center" c="dimmed" size="sm">
          Spread {spread.toFixed(2)}
        </Text>
      </Box>

      <Stack gap="xs" mt="md">
        {bids.map((bid, i) => (
          <Box key={i} pos="relative">
            <Box
              pos="absolute"
              right={0}
              h="100%"
              bg="green.1"
              opacity={0.2}
              w={`${calculateDepthPercentage(bids, i)}%`}
            />
            <Grid columns={3} style={{ position: 'relative' }}>
              <Grid.Col span={1}>
                <Text size="sm" c="green.6">
                  {bid.price.toFixed(2)}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm" ta="center">
                  {bid.amount.toFixed(5)}
                </Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text size="sm" ta="right">
                  {bid.total.toFixed(5)}
                </Text>
              </Grid.Col>
            </Grid>
          </Box>
        ))}
      </Stack>
    </Card>
  );
};

export default BtcPrice;
