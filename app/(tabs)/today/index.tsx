import React from 'react';
import { ClipboardList } from 'lucide-react-native';
import { WaveScreen } from '@/components/WaveScreen';
import { colors } from '@/lib/theme';

export default function TodayScreen() {
  return (
    <WaveScreen
      title="Today"
      wave="Wave 1"
      icon={<ClipboardList size={32} color={colors.sky} />}
      description="Your jobs for today"
    />
  );
}
