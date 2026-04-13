import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
       console.error(error);
    } finally {
       setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="px-2">
        <h2 className="text-xl font-bold">Creator Academy</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Advanced Success Blueprints</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {[1,2,3].map(i => <div key={i} className="aspect-[4/3] skeleton opacity-10" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <Link to={`/blog/${blog.slug}`} className="block h-full group">
                <div className="ig-card p-8 h-full flex flex-col justify-between hover:bg-secondary/50 transition-all border-primary hover:border-accent-blue/30 shadow-sm hover:shadow-xl hover:shadow-accent-blue/5">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                       <span className="px-3 py-1 bg-accent-blue/5 text-[9px] font-bold uppercase text-accent-blue tracking-widest rounded-lg border border-accent-blue/10">
                         {blog.category}
                       </span>
                       <div className="text-right">
                          <p className="text-[10px] font-semibold text-secondary uppercase tracking-tight">{blog.date}</p>
                          <p className="text-[9px] font-bold text-accent-blue uppercase tracking-widest mt-1 opacity-80">{blog.readTime} read</p>
                       </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 leading-tight tracking-tight group-hover:text-accent-blue transition-colors">{blog.title}</h3>
                    <p className="text-secondary text-xs leading-relaxed opacity-70 line-clamp-3">
                      {blog.desc}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-primary pt-6">
                    <div className="flex items-center gap-2.5">
                       <div className="w-6 h-6 rounded-full bg-secondary border border-primary flex items-center justify-center text-[8px] font-bold text-secondary">
                          {blog.author?.[0]}
                       </div>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-secondary">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-accent-blue transition-colors">
                      Open <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
