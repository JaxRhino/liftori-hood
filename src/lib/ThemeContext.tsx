/**
 * ThemeContext — exposes the Field Mode token set to the tree.
 *
 * v1 ships a single dark Field Mode theme (built for roof + glare). The
 * provider exists so Wave 4 can add a brightness/contrast toggle in Settings
 * without rewiring screens.
 */
import React, { createContext, useContext, useMemo } from 'react';
import { colors, radii, shadows, spacing, touchTarget, typography } from './theme';

const theme = { colors, radii, shadows, spacing, touchTarget, typography };
export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => theme, []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
