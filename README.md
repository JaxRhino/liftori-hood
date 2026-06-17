# Liftori-Hood (CSC Field)

Liftori KEC field-technician mobile app. First tenant: **CSC Services** (white-labeled "CSC Field"). Expo SDK 51 + React Native 0.74.5 + expo-router + NativeWind + TanStack Query + Supabase. Android-first.

Backend: CSC tenant Supabase `spgainjpxualjtbatfmk` (industry `kec`).

## Status: Wave 0 — Scaffold

Shell only. 4-tab nav (Today / Customers / Chat / More), auth + field-role gate, Field Mode dark theme, offline-first SQLite + sync-queue foundation, web export for the App Viewer preview. Feature logic lands in Waves 1-5 (see the build blueprint).

## Develop

```bash
npm install --legacy-peer-deps
npx expo start          # dev
npx expo export --platform web   # web bundle -> dist/
```

Credentials resolve `EXPO_PUBLIC_SUPABASE_*` env -> hardcoded FALLBACK in `src/lib/supabase.ts`.

## Layout

- `app/_layout.tsx` — OTA updater (above auth gate) + QueryClient + ThemeProvider + auth bootstrap
- `app/(tabs)/` — 4-tab shell; each tab is `<tab>/_layout.tsx` (initialRouteName 'index') + `index.tsx`
- `app/login.tsx` — CSC Field sign-in; role gate in `app/(tabs)/_layout.tsx`
- `src/lib/` — supabase, AuthContext, theme (Field Mode tokens), updates, haptics
- `lib/offline/` — SQLite `sync_queue` + enqueue/flush scaffold (Wave 1 wires it in)
