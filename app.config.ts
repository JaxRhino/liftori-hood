/**
 * Liftori-Hood — Expo app config (CSC Field white-label).
 *
 * Plain JS body (TS filename for zero-config resolution) so @expo/config can
 * parse it under raw Node in CI without a ts-node step.
 *
 * EAS projectId / updates.url are placeholders until `eas init` is run on the
 * new repo (it writes the real ids). See LIFTORI-HOOD-SETUP.md.
 */
module.exports = ({ config }: { config: any }) => ({
  ...config,
  name: 'CSC Field',
  slug: 'liftori-hood',
  scheme: 'liftorihood',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  newArchEnabled: false,
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A0E1A',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'ai.liftori.hood',
    config: { usesNonExemptEncryption: false },
  },
  android: {
    package: 'ai.liftori.hood',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0A0E1A',
    },
    permissions: ['INTERNET', 'VIBRATE'],
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      // Placeholder — `eas init` overwrites this with the real project id.
      projectId: '00000000-0000-0000-0000-000000000000',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  updates: {
    // Placeholder — `eas update:configure` writes the real URL.
    url: 'https://u.expo.dev/00000000-0000-0000-0000-000000000000',
  },
});
