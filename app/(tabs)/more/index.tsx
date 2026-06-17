import React from 'react';
import { LayoutGrid } from 'lucide-react-native';
import { WaveScreen } from '@/components/WaveScreen';
import { colors } from '@/lib/theme';

export default function MoreScreen() {
  return (
    <WaveScreen
      title="More"
      wave="Wave 4"
      icon={<LayoutGrid size={32} color={colors.sky} />}
      description="Estimates, Sales, Ops, Settings"
    />
  );
}
