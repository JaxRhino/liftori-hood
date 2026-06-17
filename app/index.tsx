/**
 * Root index — redirect by auth state. Splash stays up (via SplashGate) until
 * the session resolves, so the redirect target is known with certainty here.
 */
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/lib/AuthContext';

export default function Index() {
  const { session } = useAuth();
  return <Redirect href={session ? '/(tabs)/today' : '/login'} />;
}
