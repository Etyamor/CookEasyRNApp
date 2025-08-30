import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';

type SafeAreaLayoutProps = {
  children: ReactNode;
  verticalPadding?: number;
};

const NoSafeAreaLayout = ({ children, verticalPadding = Spacing.md }: SafeAreaLayoutProps) => {
  return <View style={[styles.container, { paddingVertical: verticalPadding }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    backgroundColor: Colors.light["100"],
  },
});

export default NoSafeAreaLayout;