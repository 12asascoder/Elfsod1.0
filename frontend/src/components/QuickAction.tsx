import React from 'react';
import { colors } from '../styles/colors';

interface QuickActionProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${colors.background.primary} border ${colors.neutral.border} hover:${colors.primary.borderHover} hover:${colors.primary[50]} transition-all text-left group shadow-sm hover:shadow-md cursor-pointer`}
    >
      <Icon className={`w-4 h-4 ${colors.neutral.textLight} group-hover:${colors.primary.text} transition-colors`} />
      <span className={`text-sm ${colors.neutral.text} group-hover:${colors.neutral.textDark}`}>{label}</span>
    </button>
  );
};

export default QuickAction;