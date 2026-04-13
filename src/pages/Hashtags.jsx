import React, { useState } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const Hashtags = () => {
  const [openSelect, setOpenSelect] = useState(null);
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(25);
  const [platform, setPlatform] = useState('Instagram');
  const [audience, setAudience] = useState('Global');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [copied, setCopied] = useState(false);

  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn'];
  const audiences = ['Global', 'Niche-Specific', 'Professional', 'Gen-Z', 'Business'];

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await api.post('/hashtags', { topic, count, platform, audience });
      setResults(response.data.hashtags);
      setCopied(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 px-2 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-primary mb-2">Signal Discovery</h2>
          <p className="text-xs text-secondary font-medium uppercase tracking-[0.2em] opacity-50">AI-Powered Trend Engine</p>
        </div>

        <div className="bg-card border border-secondary/20 rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-widest block ml-1 opacity-50">Focus Keyword</label>
            <input
              type="text"
              placeholder="e.g. Minimalist Interior Design"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="ig-input w-full h-11 text-sm border-secondary/20 focus:border-accent-blue/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              label="Platform"
              value={platform}
              options={platforms}
              onChange={setPlatform}
              isOpen={openSelect === 'platform'}
              onToggle={() => setOpenSelect(openSelect === 'platform' ? null : 'platform')}
            />
            <CustomSelect
              label="Audience"
              value={audience}
              options={audiences}
              onChange={setAudience}
              isOpen={openSelect === 'audience'}
              onToggle={() => setOpenSelect(openSelect === 'audience' ? null : 'audience')}
            />
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-center mb-3 text-[10px] font-bold text-secondary uppercase tracking-widest opacity-50">
              <label className="ml-1">Signal Density</label>
              <span className="font-bold mr-1">{count} Tags</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-accent-blue h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic || loading}
            className="w-full h-12 bg-accent-blue text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-lg shadow-accent-blue/10 border-none"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <span className="text-white">ANALYZE SIGNALS</span>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-card border border-primary rounded-2xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2 text-primary opacity-60">
                  Signal Cluster
                </h3>
                <button
                  onClick={copyAll}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-semibold transition-all border ${copied ? 'bg-green-500 text-white border-green-500' : 'bg-secondary text-primary border-primary hover:border-accent-blue'
                    }`}
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'COPIED' : 'COPY ALL'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {results.map((tag, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.005 }}
                    key={i}
                    className="px-3 py-1.5 bg-secondary border border-primary/50 rounded-lg text-xs font-medium text-accent-blue transition-all cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-card border border-dashed border-primary rounded-2xl text-center">
              <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] leading-relaxed">
                Optimal strategy: Mix these high-density signals with 2 unique niche tags for maximum algorithmic reach.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hashtags;
