import React from 'react';
import { Building2 } from 'lucide-react-native';
import { WaveScreen } from '@/components/WaveScreen';
import { colors } from '@/lib/theme';

export default function CustomersScreen() {
  return (
    <WaveScreen
      title="Customers"
      wave="Wave 2"
      icon={<Building2 size={32} color={colors.sky} />}
      description="Restaurant accounts & asset history"
    />
  );
}
