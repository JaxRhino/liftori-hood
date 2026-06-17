/**
 * Root layout — Liftori-Hood (CSC Field).
 *
 *   ErrorBoundary
 *     └ GestureHandlerRootView
 *         └ SafeAreaProvider
 *             └ ThemeProvider (Field Mode tokens)
 *                 └ QueryClientProvider (react-query)
 *                     └ UpdatesListener  ← OTA poller mounts ABOVE the auth gate
 *                     └ AuthProvider
 *                         └ SplashGate
 *                             └ <Slot />
 *
 * The silent OTA updater sits above the auth gate on purpose: a tech with an
 * expired/blocked session must still pull the newest JS bundle on the next
 * cold start. Splash stays up until the persisted session resolves.
 */
import '../global.css';

import React, { useEffect } from 'react';
import { AppState, AppStateStatus, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { colors } from '@/lib/theme';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { checkForUpdatesSilently } from '@/lib/updates';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* noop — already hidden */
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

function SplashGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loading]);
  if (loading) return <View style={styles.splashBg} />;
  return <>{children}</>;
}

/**
 * Silent OTA updater — boot + AppState=active. Stages the newest bundle;
 * applies on next cold start (never mid-job). No-op in __DEV__ / Expo Go.
 */
function UpdatesListener() {
  useEffect(() => {
    void checkForUpdatesSilently();
    const handler = (state: AppStateStatus) => {
      if (state === 'active') void checkForUpdatesSilently();
    };
    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, []);
  return null;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.flex}>
        <SafeAreaProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              {/* OTA poller above the auth gate. */}
              <UpdatesListener />
              <AuthProvider>
                <StatusBar style="light" />
                <SplashGate>
                  <Slot />
                </SplashGate>
              </AuthProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  splashBg: { flex: 1, backgroundColor: colors.bg },
});
