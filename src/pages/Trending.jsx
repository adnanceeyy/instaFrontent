import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Copy, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';

const Trending = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const categories = ['All', 'Love', 'Attitude', 'Travel', 'Funny', 'Motivation', 'Bike', 'Fitness', 'Tech', 'Food', 'Fashion'];

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const response = await api.get('/trending');
      setTrendingData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const currentCaptions = activeCategory === 'All' 
    ? trendingData.flatMap(cat => cat.captions)
    : trendingData.find(cat => cat.category === activeCategory)?.captions || [];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="px-2">
        <h2 className="text-xl font-semibold text-primary">Discover Trends</h2>
        <p className="text-secondary text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">Real-time Viral Insights</p>
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-[10px] uppercase font-semibold tracking-widest transition-all border ${
              activeCategory === cat 
                ? 'bg-primary text-card border-primary' 
                : 'bg-secondary/50 border-primary/50 text-secondary hover:text-primary hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 skeleton opacity-10" />)}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2"
        >
          {currentCaptions.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={i} 
              className="ig-card p-6 flex flex-col justify-between group hover:bg-secondary transition-colors"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-blue opacity-80">
                    {activeCategory === 'All' ? 'Viral Trend' : activeCategory}
                  </span>
                   <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-[10px] font-bold text-secondary">{item.viralScore}%</span>
                   </div>
                </div>
                <p className="text-sm text-primary leading-relaxed font-normal">
                  {item.text}
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => handleCopy(item.text, i)} 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all border ${
                    copiedIndex === i ? 'bg-green-500 text-white border-green-500' : 'bg-secondary text-secondary border-primary/50 hover:text-primary hover:border-accent-blue'
                  }`}
                >
                  {copiedIndex === i ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedIndex === i ? 'Copied' : 'Copy'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Trending;
