/**
 * Supabase client — Liftori-Hood (CSC Field).
 *
 * Targets the CSC tenant project (spgainjpxualjtbatfmk, industry `kec`).
 *
 * Credentials resolve as: EXPO_PUBLIC env → hardcoded FALLBACK. The fallback is
 * load-bearing on mobile — env inlining fails silently inside OTA bundles, so a
 * shipped build must always have a working URL + anon key baked in.
 *
 * Auth is AsyncStorage-backed with session persistence + auto-refresh so a tech
 * stays signed in across cold starts on the roof.
 */
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Hardcoded fallbacks — CSC tenant. anon key fetched fresh via Supabase MCP
// (verified iat 2026-06-11 / exp 2036-06-11, ref spgainjpxualjtbatfmk).
// ---------------------------------------------------------------------------
const FALLBACK_URL = 'https://spgainjpxualjtbatfmk.supabase.co';
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZ2FpbmpweHVhbGp0YmF0Zm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTMzODYsImV4cCI6MjA5Njc4OTM4Nn0.bQckTNILfG8nz4_TChbiPc7ni78Ity6qx9tJr1AVFcs';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
