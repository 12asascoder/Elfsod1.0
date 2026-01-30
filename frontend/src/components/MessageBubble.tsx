import React from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  const formatContent = (content: string) => {
    // Preserve line breaks for simpler messages
    return content.split('\n').map((line, i) => (
      <span key={i} className="block mb-0.5 last:mb-0">
        {line}
      </span>
    ));
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} gap-3 mb-1.5`}>
      {isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center overflow-hidden shadow-lg mt-1">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Bot&backgroundColor=1a1a1a`}
            alt="AI"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[85%]`}>
        <div className={`relative px-4 py-2.5 rounded-[22px] ${isBot
            ? 'bg-[#1a1a1a]/80 border border-white/10 text-slate-300 rounded-tl-none ring-1 ring-white/5'
            : 'bg-white text-[#0a0a0a] rounded-tr-none font-medium shadow-xl shadow-white/5'
          }`}>
          {isBot && (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-[22px] pointer-events-none" />
          )}
          <div className="relative text-[13px] leading-relaxed">
            {formatContent(message.content)}
          </div>
        </div>
        <span className="text-[10px] font-bold text-slate-500 mt-1 px-2 uppercase tracking-tight opacity-70">
          {message.timestamp}
        </span>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg mt-1">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=ffffff10`}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;