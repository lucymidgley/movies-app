import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';

import cx from 'clsx';
import classes from './ColorSchemeToggle.module.css';
import { FC } from 'react';

export const ColorSchemeToggle: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="36px"
      aria-label="Toggle color scheme"
    >
      <FaSun className={cx(classes.icon, classes.light)} />
      <FaMoon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}