/**
 * (more) tab stack. initialRouteName pinned to 'index' so deep links and tab
 * re-selection always resolve to the tab root (expo-router SDK51 requirement).
 */
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/lib/theme';

export const unstable_settings = { initialRouteName: 'index' };

export default function MoreStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    />
  );
}
