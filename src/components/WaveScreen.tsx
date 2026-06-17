/**
 * WaveScreen — on-brand "coming in Wave N" placeholder for tabs not yet built.
 *
 * Wave 0 ships the shell; each tab lands a clean empty state instead of a blank
 * screen so the App Viewer preview reads like a real product, not a skeleton.
 */
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeScreen } from './SafeScreen';
import { EmptyState } from './EmptyState';
import { colors, radii, spacing, typography } from '@/lib/theme';

export interface WaveScreenProps {
  title: string;
  wave: string; // e.g. "Wave 1"
  icon: ReactNode;
  description: string;
}

export function WaveScreen({ title, wave, icon, description }: WaveScreenProps) {
  return (
    <SafeScreen>
      <View style={styles.header}>
        <Text style={styles.brand}>CSC Field</Text>
        <Text style={styles.screenTitle}>{title}</Text>
      </View>
      <View style={styles.body}>
        <EmptyState
          icon={icon}
          title={description}
          description={`Landing in ${wave}. The shell is live — the data and on-site workflow plug in here next.`}
          action={
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wave}</Text>
            </View>
          }
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  brand: { ...typography.micro, color: colors.sky, textTransform: 'uppercase' },
  screenTitle: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.xxs },
  body: { flex: 1, justifyContent: 'center' },
  badge: {
    backgroundColor: 'rgba(56,189,248,0.12)',
    borderWidth: 1,
    borderColor: colors.sky,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  badgeText: { ...typography.caption, color: colors.sky, fontWeight: '700' },
});
