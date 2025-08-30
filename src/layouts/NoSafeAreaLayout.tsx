import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

type SafeAreaLayoutProps = {
  children: ReactNode;
};

const NoSafeAreaLayout = ({ children }: SafeAreaLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    backgroundColor: Colors.light["100"],
  },
});

export default NoSafeAreaLayout;
