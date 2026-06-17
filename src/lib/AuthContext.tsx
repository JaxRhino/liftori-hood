/**
 * AuthContext — session + profile state for Liftori-Hood (CSC Field).
 *
 * Bootstraps from the persisted Supabase session, keeps the CSC `profiles` row
 * in sync, and gates app access on an allowed field role.
 *
 * IMPORTANT: loading stays true until getSession() resolves so the gate never
 * flashes the wrong screen on cold start (auth-loading-race playbook).
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/** Roles allowed to use the field app. Includes super_admin (Liftori top role). */
export const ALLOWED_ROLES = [
  'tech',
  'crew_lead',
  'supervisor',
  'admin',
  'super_admin',
] as const;

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  avatar_url: string | null;
  title: string | null;
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /** True once the profile loads with a role in ALLOWED_ROLES. */
  roleAllowed: boolean;
  loading: boolean;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, avatar_url, title')
        .eq('id', userId)
        .maybeSingle();
      if (error) throw error;
      if (mounted.current) setProfile((data as Profile) ?? null);
    } catch (err) {
      console.warn('[auth] fetchProfile failed:', err);
      if (mounted.current) setProfile(null);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user.id) await fetchProfile(session.user.id);
  }, [fetchProfile, session?.user.id]);

  useEffect(() => {
    mounted.current = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted.current) return;
        setSession(data.session ?? null);
        if (data.session?.user.id) await fetchProfile(data.session.user.id);
      } catch (err) {
        console.warn('[auth] initial getSession failed:', err);
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted.current) return;
        setSession(newSession);
        if (newSession?.user.id) {
          fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted.current = false;
      listener.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // App foreground → keep token fresh.
  useEffect(() => {
    const handler = (state: AppStateStatus) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };
    const sub = AppState.addEventListener('change', handler);
    return () => sub.remove();
  }, []);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (error) return { error: error.message };
        return { error: null };
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Sign-in failed';
        return { error: msg };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[auth] signOut failed:', err);
    } finally {
      setSession(null);
      setProfile(null);
    }
  }, []);

  const roleAllowed =
    !!profile && !!profile.role && (ALLOWED_ROLES as readonly string[]).includes(profile.role);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      roleAllowed,
      loading,
      signInWithPassword,
      signOut,
      refreshProfile,
    }),
    [session, profile, roleAllowed, loading, signInWithPassword, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
