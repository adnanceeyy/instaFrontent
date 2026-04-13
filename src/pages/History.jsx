import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, RefreshCcw, Copy, CheckCircle2, ChevronRight, Hash, Quote, Type } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/history');
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) return (
     <div className="max-w-2xl mx-auto py-10 space-y-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="flex items-center gap-4 py-4 px-2">
             <div className="w-10 h-10 rounded-full skeleton opacity-10" />
             <div className="space-y-2 flex-grow">
                <div className="h-4 w-1/3 skeleton opacity-10" />
                <div className="h-3 w-1/4 skeleton opacity-10" />
             </div>
          </div>
        ))}
     </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-20">
      <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl font-bold text-primary">Past Generations</h2>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest">{history.length} ITEMS</span>
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <div className="text-center py-24 bg-secondary/30 rounded-3xl border border-primary">
             <Clock className="w-12 h-12 mx-auto text-secondary/40 mb-3" />
             <p className="text-secondary text-sm font-medium">No items in your archive yet.</p>
             <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/50 mt-1">Start generating to see them here</p>
          </div>
        ) : history.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={item._id} 
            className="p-5 bg-card border border-primary rounded-2xl flex justify-between items-center group hover:bg-secondary/50 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-secondary border border-primary/50 flex items-center justify-center text-accent-blue text-xs font-semibold">
                  {item.platform?.[0]}
               </div>
               <div>
                  <h3 className="text-sm font-semibold text-primary tracking-tight leading-tight">{item.topic || 'New Generation'}</h3>
                  <div className="flex items-center gap-2 mt-1 opacity-60">
                    <p className="text-[10px] text-secondary font-semibold uppercase tracking-tight">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                    <span className="w-0.5 h-0.5 rounded-full bg-secondary" />
                    <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-tight">{item.tone}</p>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-primary">{item.viralScore}%</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-secondary opacity-40">Score</p>
               </div>
               <button 
                  onClick={() => handleCopy(item.captions?.[0], item._id)}
                  className="w-9 h-9 rounded-lg bg-secondary border border-primary/50 flex items-center justify-center text-secondary hover:text-accent-blue transition-all"
                >
                  {copiedIndex === item._id ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
