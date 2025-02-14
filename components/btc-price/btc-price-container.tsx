'use client';

import { useState } from 'react';
import { Container, Flex } from '@mantine/core';
import BtcPrice from './btc-price';
import styles from './btc-price.module.css';

const BtcPriceContainer = () => {
  const [showOrderbook, setShowOrderbook] = useState(true);

  return (
    <Container size="xl" w="100%" mt="xl">
      <Flex w="100%" justify="center" align="center">
        {showOrderbook ? (
          <BtcPrice onClose={() => setShowOrderbook(false)} />
        ) : (
          <button type="button" onClick={() => setShowOrderbook(true)} className={styles.newButton}>
            + New Orderbook
          </button>
        )}
      </Flex>
    </Container>
  );
};

export default BtcPriceContainer;
