import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { colors } from '../styles/colors';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text?: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = 'Describe your campaign goals...',
  isLoading = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className={`p-6 border-t ${colors.neutral.border}`}>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className={`flex-1 px-5 py-3.5 rounded-xl border ${colors.neutral.border} focus:${colors.primary.border} focus:ring-4 focus:ring-cyan-50 outline-none transition-all text-sm placeholder:${colors.neutral.textLight} disabled:opacity-50 disabled:cursor-not-allowed ${colors.background.primary}`}
        />
        <button
          onClick={() => onSend()}
          disabled={!value.trim() || isLoading}
          className={`px-6 py-3.5 rounded-xl bg-gradient-to-r ${colors.primary.gradient} hover:opacity-90 disabled:bg-slate-200 disabled:from-slate-200 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-medium transition-all flex items-center gap-2 shadow-sm hover:shadow-md cursor-pointer`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="text-sm">Send</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;