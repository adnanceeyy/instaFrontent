import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bookmark, RefreshCw, CheckCircle2, ChevronDown, Flame, Hash } from 'lucide-react';
import api from '../api/axios';
import CustomSelect from '../components/CustomSelect';

const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'LinkedIn'];
const tones = ['Viral', 'Motivational', 'Funny', 'Emotional', 'Professional', 'Savage', 'Minimalist'];
const languages = ['English', 'Malayalam', 'Hinglish', 'Spanish', 'Hindi', 'German'];
const audiences = ['General', 'Entrepreneurs', 'Creators', 'Students', 'Luxury Lovers', 'Techies'];
const goals = ['Engagement', 'Sales', 'Awareness', 'Educational', 'Personal Brand'];

// Shared CustomSelect imported from components

const Home = () => {
  const [openSelect, setOpenSelect] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'Instagram',
    tone: 'Viral',
    language: 'English',
    audience: 'General',
    goal: 'Engagement',
    keywords: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await api.post('/generate', formData);
      setResult(response.data);

      // Auto-save to Archive for better UX
      await api.post('/save', {
        ...formData,
        ...response.data,
        userId: '65a7f9b8c2d1e4a5b6c7d8e9' // Current Session ID
      });
      setIsSaved(true);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToDb = async () => {
    if (!result || isSaved) return;
    try {
      await api.post('/save', {
        ...formData,
        ...result,
        userId: '65a7f9b8c2d1e4a5b6c7d8e9'
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 px-4">
      {/* Studio Banner */}
      <div className="pt-6">
        <div className="bg-secondary/50 border border-primary/40 rounded-3xl p-6 text-center">
          <p className="text-xs font-medium text-secondary leading-relaxed max-w-lg mx-auto opacity-70">
            Your minimalist studio for professional social media strategy. Generate, archive, and master your reach.
          </p>
        </div>
      </div>

      {/* Content Studio Section */}
      <div className="ig-card p-6 md:p-10 space-y-8 max-w-4xl mx-auto shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-1 pb-1">
            <h1 className="text-2xl font-bold tracking-tight text-primary">Content Studio</h1>
            <p className="text-xs font-medium text-secondary uppercase tracking-widest opacity-60">AI Generator Engine</p>
          </div>
          <div className="flex-1 w-full md:max-w-xs">
            <label className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1.5 block opacity-50 ml-1">Foundation Topic</label>
            <input
              type="text"
              placeholder="e.g. Design Trends"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="ig-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CustomSelect
            label="Audience"
            value={formData.audience}
            options={audiences}
            onChange={(v) => setFormData({ ...formData, audience: v })}
            isOpen={openSelect === 'audience'}
            onToggle={() => setOpenSelect(openSelect === 'audience' ? null : 'audience')}
          />
          <CustomSelect
            label="Goal"
            value={formData.goal}
            options={goals}
            onChange={(v) => setFormData({ ...formData, goal: v })}
            isOpen={openSelect === 'goal'}
            onToggle={() => setOpenSelect(openSelect === 'goal' ? null : 'goal')}
          />
          <CustomSelect
            label="Tone"
            value={formData.tone}
            options={tones}
            onChange={(v) => setFormData({ ...formData, tone: v })}
            isOpen={openSelect === 'tone'}
            onToggle={() => setOpenSelect(openSelect === 'tone' ? null : 'tone')}
          />
          <CustomSelect
            label="Platform"
            value={formData.platform}
            options={platforms}
            onChange={(v) => setFormData({ ...formData, platform: v })}
            isOpen={openSelect === 'platform'}
            onToggle={() => setOpenSelect(openSelect === 'platform' ? null : 'platform')}
          />
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4 pt-2">
          <div className="flex-[2] w-full">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5 block opacity-50 ml-1">Context Keywords</label>
            <input
              type="text"
              placeholder="e.g. Aesthetic, Cinematic, Fast-paced"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="ig-input"
            />
          </div>
          <div className="flex-1 w-full">
            <CustomSelect
              label="Language"
              value={formData.language}
              options={languages}
              onChange={(v) => setFormData({ ...formData, language: v })}
              isOpen={openSelect === 'language'}
              onToggle={() => setOpenSelect(openSelect === 'language' ? null : 'language')}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !formData.topic}
            className="flex-1 bg-accent-blue text-white h-11 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-sm"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>GENERATE CONTENT</span>}
          </button>
        </div>
      </div>

      {/* Optimized Results Section */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between px-2 pt-6 border-t border-primary">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl skeleton" />
                <div className="space-y-2">
                  <div className="h-4 w-32 skeleton" />
                  <div className="h-3 w-48 skeleton" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="ig-card p-10 h-40 skeleton opacity-10" />
              ))}
            </div>
          </motion.div>
        ) : result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            <div className="flex items-center justify-between px-2 pt-6 border-t border-primary">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-blue/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <span className="text-base font-semibold text-primary block leading-none">{formData.topic}</span>
                  <span className="text-[9px] font-medium uppercase tracking-widest mt-1.5 block text-secondary opacity-60">AI Drafts Ready</span>
                </div>
              </div>
              <button
                onClick={saveToDb}
                className="flex items-center gap-2 text-secondary hover:text-accent-blue transition-all"
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Bookmark className="w-4 h-4 opacity-50" />}
                <span className="text-[10px] font-bold uppercase tracking-widest">{isSaved ? 'Stored' : 'Store'}</span>
              </button>
            </div>

            <div className="space-y-10">
              {/* Hooks & Titles Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Hooks</h3>
                  <div className="space-y-2">
                    {result.hooks.map((hook, i) => (
                      <div key={i} className="p-4 bg-secondary border border-primary rounded-xl text-sm font-medium text-primary flex justify-between items-center group/hook">
                        <span>{hook}</span>
                        <button onClick={() => handleCopy(hook, `hook-${i}`)} className="text-[9px] opacity-0 group-hover/hook:opacity-100 text-accent-blue font-bold uppercase tracking-widest">
                          {copiedIndex === `hook-${i}` ? 'Saved' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Titles</h3>
                  <div className="space-y-2">
                    {result.titles.map((title, i) => (
                      <div key={i} className="p-4 bg-secondary border border-primary rounded-xl text-sm font-medium text-primary flex justify-between items-center group/title">
                        <span>{title}</span>
                        <button onClick={() => handleCopy(title, `title-${i}`)} className="text-[9px] opacity-0 group-hover/title:opacity-100 text-accent-blue font-bold uppercase tracking-widest">
                          {copiedIndex === `title-${i}` ? 'Saved' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Captions Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Captions</h3>
                {result.captions.map((caption, i) => (
                  <div key={i} className="bg-card border border-primary rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start gap-6 transition-all hover:border-accent-blue">
                    <div className="space-y-3 flex-1">
                      <p className="text-base leading-relaxed text-primary font-medium">
                        {caption}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(caption, i)}
                      className={`text-[11px] font-bold uppercase tracking-widest transition-all px-6 py-3 border rounded-xl flex-shrink-0 ${copiedIndex === i ? 'bg-green-500 text-white border-green-500' : 'text-primary border-primary hover:bg-primary hover:text-card'
                        }`}
                    >
                      {copiedIndex === i ? 'Done' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 px-2 space-y-6 border-t border-primary mt-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">AI Tag Clusters</span>
                </div>
                <button
                  onClick={() => handleCopy(result.hashtags.join(' '), 'hash')}
                  className="text-[10px] font-bold text-accent-blue hover:underline uppercase tracking-widest flex items-center gap-2"
                >
                  <Hash className="w-3 h-3" />
                  {copiedIndex === 'hash' ? 'Copied' : 'Copy All Tags'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.hashtags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-secondary text-xs font-medium text-secondary rounded-lg border border-primary/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
