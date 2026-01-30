import React, { useState, useRef, useEffect } from 'react';
import {
  Zap, Target, Eye, Sparkles, Loader2,
  MessageSquare, BarChart3, Plus, Mic, Send,
  Layout, Activity, PlusCircle, History,
  BrainCircuit, ShieldCheck, PieChart, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import MessageBubble from '../components/MessageBubble';
import QuickAction from '../components/QuickAction';
import ChatInput from '../components/ChatInput';
import { colors } from '../styles/colors';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  avatar?: string;
}

const CommandCenter: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Welcome Back, Ravi!\nHow may I help you, Today?\nWhat kind of Advertisement are you looking for?',
      timestamp: '9:00 AM'
    }
  ]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: 'Analyze Audience Insights', icon: BrainCircuit, action: 'analyze_audience' },
    { label: 'Review Competitor Positioning', icon: ShieldCheck, action: 'review_competitors' },
    { label: 'Generate Creative Concepts for my next Advertisement', icon: Sparkles, action: 'generate_creatives' }
  ];

  const handleSend = async (textOverride?: string, actionOverride: string = 'chat') => {
    const textToSend = textOverride || message;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textOverride) setMessage('');

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5002/genai_call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          action: actionOverride,
          locale: 'US (en-US), currency $',
          context: {}
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.reply || 'I apologize, but I couldn\'t generate a response.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I encountered an error connecting to the server. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${active ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
      <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );

  const AnalysisCard = ({ label, icon: Icon, value }: { label: string, icon: any, value?: string }) => (
    <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-[20px] p-3 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-white">{label}</span>
      </div>
      <div className="h-6 flex items-end">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            className="h-full bg-cyan-500/50"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#0a0a0a] text-white font-mulish selection:bg-cyan-500/30 overflow-hidden flex flex-col">
      <Navigation />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 flex-1 flex flex-col min-h-0">
        {/* Page Header - Moved inside to ensure it doesn't push chat too far down */}
        <div className="mb-4 pl-4 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Command Center</h1>
          <p className="text-slate-400 text-xs opacity-70">Chat with your autonomous advertising agent</p>
        </div>

        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-72 flex flex-col gap-4"
          >
            <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-5 flex flex-col gap-1 shadow-2xl backdrop-blur-xl">
              <SidebarItem icon={Zap} label="AI - powered" />
              <SidebarItem icon={Activity} label="Active" active />
              <SidebarItem icon={BarChart3} label="Analysis" />
              <SidebarItem icon={PlusCircle} label="New Project" />

              <button className="mt-3 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-[16px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center justify-center gap-2 w-full bg-[#121212] border border-white/10 text-white rounded-[16px] py-3 font-bold text-xs transition-all hover:border-white/20">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  Generate Advertisement
                </div>
              </button>

              <div className="mt-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-3 mb-3">Chat history</h3>
                <div className="space-y-1">
                  <div className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/5 cursor-pointer line-clamp-1">Engaging Advertisement for my company</div>
                  <div className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/5 cursor-pointer line-clamp-1">Funny Advertisement for Elfsod</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-3 mb-3">Analysis</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <AnalysisCard label="Messages" icon={MessageSquare} />
                  </div>
                  <div className="col-span-1 row-span-2">
                    <div className="bg-[#1a1a1a]/40 border border-white/5 rounded-[20px] p-3 h-full flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold text-white">Performance</span>
                      <div className="flex-1 flex items-end justify-center pb-1">
                        <div className="w-1 h-3/4 bg-purple-500/50 rounded-full mx-0.5" />
                        <div className="w-1 h-1/2 bg-purple-500/50 rounded-full mx-0.5" />
                        <div className="w-1 h-full bg-cyan-500 rounded-full mx-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <AnalysisCard label="Campaigns" icon={TrendingUp} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] overflow-hidden flex flex-col h-full shadow-2xl backdrop-blur-xl relative">

              {/* Messages Area - Using direct ref for more stable scrolling */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pt-8"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-50 blur-sm animate-pulse" />
                    </div>
                    <div className="bg-[#242424] px-6 py-4 rounded-[24px] border border-white/5 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Interactive Area */}
              <div className="px-6 pb-5 pt-1 bg-gradient-to-t from-[#1a1a1a] to-transparent shrink-0">
                {/* Quick Actions */}
                <div className="mb-3 flex flex-wrap gap-2">
                  <p className="w-full text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 ml-2">Quick Actions</p>
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.label, action.action)}
                      className="px-2.5 py-1.5 rounded-[12px] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all text-[12px] text-slate-400 flex items-center gap-1.5 group"
                    >
                      <action.icon className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      {action.label}
                    </button>
                  ))}
                </div>

                {/* Input Container */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[30px] blur-md group-focus-within:opacity-100 transition duration-500 opacity-0"></div>
                  <div className="relative bg-[#242424] border border-white/5 rounded-[30px] p-1.5 flex items-center gap-2 shadow-2xl">
                    <button className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type something here..."
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-xs py-2 px-1"
                    />
                    <div className="flex items-center gap-0.5 pr-1">
                      <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors">
                        <Mic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSend()}
                        disabled={!message.trim() || isLoading}
                        className="w-9 h-9 flex items-center justify-center bg-cyan-500 text-black rounded-[16px] hover:bg-cyan-400 transition-all disabled:bg-slate-800 disabled:text-slate-600 shadow-lg shadow-cyan-500/20"
                      >
                        {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CommandCenter;