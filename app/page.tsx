import { Container, Flex } from '@mantine/core';
import BtcPriceContainer from '@/components/btc-price/btc-price-container';
import { ColorSchemeToggle } from '@/components/color-scheme-toggle/color-scheme-toggle';
import { OrderBookHeader } from '@/components/order-book-info/order-book-header';
import { OrderBookInfo } from '@/components/order-book-info/order-book-info';

export default function HomePage() {
  return (
    <main>
      <ColorSchemeToggle />
      <OrderBookHeader />
      <Container size="xl">
        <Flex
          justify="center"
          align="flex-start"
          gap="xl"
          direction={{ base: 'column', md: 'row' }}
          p="xl"
        >
          <OrderBookInfo />
          <BtcPriceContainer />
        </Flex>
      </Container>
    </main>
  );
}
