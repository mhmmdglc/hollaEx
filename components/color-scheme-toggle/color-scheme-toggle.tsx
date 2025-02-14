'use client';

import { useEffect, useState } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Group, Switch, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Group justify="center" mt="xl">
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="md"
        color="dark.4"
        onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
        offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
        thumbIcon={
          colorScheme === 'dark' ? (
            <IconMoonStars size={12} stroke={3} color="var(--mantine-color-blue-6)" />
          ) : (
            <IconSun size={12} stroke={3} color="var(--mantine-color-yellow-4)" />
          )
        }
      />
    </Group>
  );
}
