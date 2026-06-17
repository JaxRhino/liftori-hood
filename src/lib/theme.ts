/**
 * Design tokens — Field Mode dark theme for Liftori-Hood (CSC Field).
 *
 * Tuned for the roof at 2 AM and for sunlight glare: deep near-black surfaces,
 * a high-contrast sky-blue accent, and big thumb-zone touch targets. Keeps the
 * same key names as the liftori-mobile scaffold so shared components carry over.
 */

export const colors = {
  // Brand accents — sky is the Field Mode primary accent.
  sky: '#38BDF8',
  skyDark: '#0EA5E9',
  skyLight: '#7DD3FC',
  // Legacy emerald keys kept so scaffold components keep compiling; repointed
  // to the Field Mode accent so nothing renders off-palette.
  emerald: '#38BDF8',
  emeraldDark: '#0EA5E9',
  emeraldLight: '#7DD3FC',
  purple: '#a855f7',
  purpleDark: '#7c3aed',
  amber: '#FBBF24',
  rose: '#FB7185',
  indigo: '#6366f1',

  // Surfaces — Field Mode deep dark.
  bg: '#0A0E1A',          // app base
  surface900: '#0A0E1A',  // primary background (alias of bg)
  surface800: '#060B18',  // card / panel surface (darker, recedes)
  surface700: '#16213A',  // raised elements
  surface600: '#22304D',  // borders / dividers

  // Text — high contrast for glare + low light.
  textPrimary: '#EEF2F9',
  textSecondary: '#9FB0CC',
  textMuted: '#64748B',
  textOnAccent: '#04111F',

  // Semantic
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#FB7185',
  error: '#FB7185',
  info: '#38BDF8',

  // Borders
  border: 'rgba(159, 176, 204, 0.15)',
  borderStrong: 'rgba(159, 176, 204, 0.3)',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};

/**
 * Touch-target baseline. Field Mode follows a 56px+ minimum for any primary
 * action (gloves-on, moving truck, bad light). Use `touchTarget.min` as the
 * floor for buttons, list rows, and tab hit areas.
 */
export const touchTarget = {
  min: 56,
  comfortable: 64,
};

export const typography = {
  display: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  h1: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.3 },
  h2: { fontSize: 20, fontWeight: '700' as const },
  h3: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyMedium: { fontSize: 15, fontWeight: '500' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  micro: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 0.3 },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
};
