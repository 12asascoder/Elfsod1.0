import React, { useState } from 'react';
import {
  RefreshCw, Download, BrainCircuit, Download as DownloadIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

const TargetingIntelPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Primary Age', value: '25-34', sub: 'Age', color: 'text-cyan-400' },
    { label: 'Purchase Intent', value: 'High', sub: 'Level Confidence', color: 'text-emerald-400' },
    { label: 'Mobile Share', value: '78.0%', sub: 'IOS & ADK', color: 'text-purple-400' },
    { label: 'Peak CPM', value: '$15.60', sub: '8AM - 11PM', color: 'text-cyan-400' }
  ];

  const recommendations = [
    {
      title: 'Focus Audience',
      desc: 'Prioritize 25-34 age group with mobile-first approach. Ads seen show 120% higher engagement.'
    },
    {
      title: 'Optimal Timing',
      desc: 'Schedule ads during 8 am - 11 pm window for 40% lower CPC. Avoid peak evening hours for cost efficiency.'
    },
    {
      title: 'Interest Targeting',
      desc: 'Allocate 65% of budget to "Fitness & Running" and "Health & Wellness". Interest overlap shows 90%+ affinity.'
    },
    {
      title: 'AI Insights',
      desc: 'Focus 40% of budget on awareness in mid-top funnel. Strong retargeting opportunity observed.'
    }
  ];

  const ageDist = [
    { label: '18 - 24', value: 15, color: 'bg-cyan-500' },
    { label: '25 - 34', value: 58, color: 'bg-cyan-400' },
    { label: '35 - 44', value: 18.2, color: 'bg-slate-400' },
    { label: '45 - 54', value: 13.8, color: 'bg-red-400' },
    { label: '55+', value: 5.6, color: 'bg-pink-400' }
  ];

  const interests = [
    { label: 'Fitness & Running', sub: 'High Affinity (92%)', value: 92, color: 'bg-cyan-400' },
    { label: 'Athletic Apparel', sub: 'Moderate Affinity (78%)', value: 78, color: 'bg-blue-400' },
    { label: 'Health & Wellness', sub: 'Medium Affinity (65%)', value: 65, color: 'bg-purple-400' },
    { label: 'Sports Equipment', sub: 'Niche Affinity (45%)', value: 45, color: 'bg-red-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-mulish selection:bg-cyan-500/30">
      <Navigation />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Targeting Intelligence</h1>
            <p className="text-slate-400 text-lg">AI-powered audience insights and targeting strategies</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-[15px] bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-[15px] bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
              <DownloadIcon className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Ravi kumar <span className="opacity-60 font-medium">Authenticated</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Live Data <span className="text-white">AI MODELED</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            AI Confidence: <span className="text-white">98%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/5 mb-8">
          {['Overview', 'Demographics', 'Interests', 'Strategy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Main Brand Card */}
          <div className="lg:col-span-5 bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Nike</h2>
              <p className="text-slate-500 text-sm font-medium">Targeting Intelligence Analysis</p>
            </div>

            <div className="space-y-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-6 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{stat.label}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.sub}</p>
                  </div>
                  <div className={`text-4xl font-bold tracking-tighter ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="lg:col-span-7 bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">AI Recommendations</h2>
              <p className="text-slate-500 text-sm font-medium">Optimized targeting strategies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-80px)]">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-[#0a0a0a]/40 border border-white/5 rounded-[24px] p-6 flex flex-col justify-center gap-3 hover:border-white/10 transition-all group">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{rec.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">Audience Demographics</h2>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            Updated Today
          </div>
        </div>

        {/* Content Section 2 - Grid Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
          {/* Age Distribution */}
          <div className="lg:col-span-7 bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Age Distributions</h3>
              <span className="text-[10px] font-bold text-slate-600 uppercase">Percentage</span>
            </div>

            <div className="space-y-6">
              {ageDist.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex-1 bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Gender Distribution</h3>
                <span className="text-[10px] font-bold text-slate-600 uppercase">Percentage</span>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-4 flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-bold">Male</span>
                  <span className="text-3xl font-bold text-cyan-400 tracking-tighter">58%</span>
                </div>
                <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-4 flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-bold">Female</span>
                  <span className="text-3xl font-bold text-purple-400 tracking-tighter">40%</span>
                </div>
                <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-4 flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-bold">Others</span>
                  <span className="text-3xl font-bold text-blue-400 tracking-tighter">2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interest Clusters */}
          <div className="lg:col-span-8 bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Interest Clusters & Analysis</h3>
              <div className="px-2 py-1 rounded-[8px] bg-white/5 text-[9px] font-bold text-slate-300 uppercase">Top 4 Clusters</div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {interests.map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-1/3">
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.sub}</p>
                  </div>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overlap & Meta */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#1a1a1a]/60 border border-white/5 rounded-[32px] p-8 shadow-2xl backdrop-blur-xl text-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Competitor Overlap</h3>
              <div className="text-6xl font-black text-white tracking-tighter mb-2">58%</div>
              <p className="text-xs font-bold text-slate-500 uppercase mb-6">Distinct Overlapping</p>
              <p className="text-xs text-slate-400 mb-6 font-medium px-4">Audience overlap with similar athletic brands</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-4">
                  <div className="text-2xl font-bold text-cyan-400">42%</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Audience Shared</div>
                </div>
                <div className="bg-[#0a0a0a]/60 border border-white/5 rounded-[24px] p-4">
                  <div className="text-2xl font-bold text-purple-400">3.2x</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Engagement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Footer (Metadata) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-white/5 py-3 px-8 z-50">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span>Targeting Intelligence for Nike — Last Analysis: 5/01/2026, 5:25:41 PM</span>
            <span>Personalized insights for Ravikumar ・ 1 competitor tracked</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <RefreshCw className="w-3 h-3" />
              Recalculate
            </button>
            <div className="px-3 py-1 rounded-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              V1 - AI Processed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetingIntelPage;