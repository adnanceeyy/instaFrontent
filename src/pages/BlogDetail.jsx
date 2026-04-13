import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
const BlogDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  const fetchDetail = async () => {
    try {
      const response = await api.get(`/blog/${slug}`);
      setData(response.data);
    } catch (error) {
       console.error(error);
    } finally {
       setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) return (
    <div className="max-w-3xl mx-auto py-20">
       <div className="h-96 glass animate-pulse rounded-[3rem]"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <Link to="/blog" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Exit Academy
      </Link>
      
      <motion.article 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="ig-card p-8 md:p-12 border border-primary"
      >
        <header className="mb-10 pb-10 border-b border-primary">
           <div className="flex justify-between items-start mb-6">
              <span className="text-accent-blue font-black text-[10px] uppercase tracking-[0.3em]">Viral Dossier</span>
              <span className="text-[10px] font-bold text-secondary">CONFIDENTIAL • 2026_V1</span>
           </div>
           <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary leading-tight">{data.title}</h1>
           <div className="flex items-center gap-4 text-secondary text-[10px] font-bold uppercase tracking-widest">
              <span>CaptionCraft Intelligence</span>
              <span>•</span>
              <span>Ref: {slug?.toUpperCase()}</span>
           </div>
        </header>

        <div 
           className="prose prose-xs max-w-none mb-12 text-secondary leading-relaxed
            prose-h2:text-xl prose-h2:font-bold prose-h2:text-primary prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-sm prose-h3:font-bold prose-h3:text-accent-blue prose-h3:mt-8
            prose-strong:text-primary prose-ul:list-disc prose-ul:pl-4"
           dangerouslySetInnerHTML={{ __html: data.content }}
        />
        
        {data.captions && data.captions.length > 0 && (
          <div className="mt-12 pt-10 border-t border-primary space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
               <div className="w-1 h-3 bg-accent-blue"></div> Deployable Assets
            </h2>
            <div className="grid gap-3">
              {data.captions.map((cap, i) => (
                 <div key={i} className="bg-secondary border border-primary p-4 rounded-lg flex justify-between items-center group transition-all hover:border-accent-blue">
                   <p className="text-secondary text-sm italic font-medium">"{cap}"</p>
                   <button 
                    onClick={() => handleCopy(cap, i)} 
                    className="ml-4 text-secondary hover:text-primary transition-colors"
                   >
                     {copiedIndex === i ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                   </button>
                 </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Hashtag Cluster */}
        <div className="mt-8 p-5 bg-secondary border border-primary rounded-lg">
           <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary mb-2">Recommended Discovery Cluster</h4>
           <div className="flex flex-wrap gap-2">
              {data.hashtags?.map((tag, i) => (
                 <span key={i} className="text-accent-blue text-xs font-bold hover:text-primary transition-colors cursor-default">{tag}</span>
              ))}
           </div>
        </div>
      </motion.article>

      {/* Discovery Footer */}
      <div className="pt-10 space-y-6">
         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary text-center">Related Intelligence</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/trending" className="ig-card p-6 border border-primary hover:border-accent-blue transition-all group">
               <span className="text-[9px] font-bold text-secondary uppercase mb-2 block">Live Feed</span>
               <h4 className="text-sm font-bold text-primary group-hover:text-accent-blue transition-colors">Analyze Real-time Viral Trends</h4>
            </Link>
            <Link to="/hashtags" className="ig-card p-6 border border-primary hover:border-accent-blue transition-all group">
               <span className="text-[9px] font-bold text-secondary uppercase mb-2 block">Discovery Tool</span>
               <h4 className="text-sm font-bold text-primary group-hover:text-accent-blue transition-colors">Optimize Global Success Reach</h4>
            </Link>
         </div>
      </div>
    </div>
  );
};

export default BlogDetail;
