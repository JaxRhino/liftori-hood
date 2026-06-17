import React from 'react';
import { MessageSquare } from 'lucide-react-native';
import { WaveScreen } from '@/components/WaveScreen';
import { colors } from '@/lib/theme';

export default function ChatScreen() {
  return (
    <WaveScreen
      title="Chat"
      wave="Wave 3"
      icon={<MessageSquare size={32} color={colors.sky} />}
      description="Crew & dispatch messaging"
    />
  );
}
