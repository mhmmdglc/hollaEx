import { Text, Title } from '@mantine/core';
import classes from './order-book-info.module.css';

export function OrderBookHeader() {
  return (
    <Title className={classes.title} ta="center" mt={50}>
      HollaEx{' '}
      <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'cyan' }}>
        Frontend Challenge
      </Text>
    </Title>
  );
}
