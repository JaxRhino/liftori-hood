/**
 * (tabs) — authenticated tab shell for Liftori-Hood.
 *
 * Four tabs: Today · Customers · Chat · More.
 *
 * Gate order:
 *   1. no session            → /login
 *   2. profile still loading → render nothing (splash already covered cold start)
 *   3. role not allowed      → sign out + bounce to /login (handled in NoAccess)
 */
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Redirect, Tabs } from 'expo-router';
import { CalendarCheck, Building2, MessageSquare, Menu } from 'lucide-react-native';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/Button';
import { colors, spacing, touchTarget, typography } from '@/lib/theme';

export default function TabsLayout() {
  const { session, profile, roleAllowed, loading, signOut } = useAuth();

  if (loading) return null;
  if (!session) return <Redirect href="/login" />;
  // Wait for the profile fetch to settle before judging the role.
  if (profile === null) return null;
  if (!roleAllowed) return <NoAccess onSignOut={signOut} role={profile.role} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.sky,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginBottom: Platform.OS === 'ios' ? 0 : 6,
        },
        tabBarStyle: {
          backgroundColor: colors.surface800,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === 'ios' ? 88 : touchTarget.comfortable + 16,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <CalendarCheck size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, size }) => (
            <Building2 size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Menu size={size ?? 24} color={color} />,
        }}
      />
    </Tabs>
  );
}

function NoAccess({
  onSignOut,
  role,
}: {
  onSignOut: () => void;
  role: string | null;
}) {
  // Sign the user out automatically so a stale session doesn't loop.
  useEffect(() => {
    const t = setTimeout(() => onSignOut(), 50);
    return () => clearTimeout(t);
  }, [onSignOut]);

  return (
    <View style={styles.gate}>
      <Text style={styles.gateTitle}>No field access</Text>
      <Text style={styles.gateBody}>
        This account{role ? ` (role: ${role})` : ''} isn't set up for the CSC
        Field app. Ask your supervisor to grant a field role.
      </Text>
      <View style={{ height: spacing.xl }} />
      <Button label="Back to sign in" variant="secondary" onPress={onSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  gate: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  gateTitle: { ...typography.h1, color: colors.textPrimary, textAlign: 'center' },
  gateBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 22,
    maxWidth: 320,
  },
});
