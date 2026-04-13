import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, value, options, onChange, isOpen, onToggle }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative flex-grow" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/60 mb-2 block ml-4">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={(e) => {
          onToggle();
        }}
        className={`w-full h-11 bg-secondary/50 border border-secondary/20 rounded-xl px-4 text-xs font-semibold text-primary flex items-center justify-between transition-all text-left outline-none ${
          isOpen ? 'border-accent-blue/30 bg-card shadow-sm' : 'hover:border-accent-blue/20'
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-accent-blue transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="absolute z-[100] w-full mt-1.5 bg-card border border-primary shadow-xl overflow-hidden py-1 rounded-xl"
            style={{ minWidth: '100%' }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                   onToggle();
                }}
                className={`w-full px-5 py-2.5 text-left text-xs font-medium transition-colors ${
                  value === opt 
                    ? 'bg-accent-blue/10 text-accent-blue' 
                    : 'text-secondary hover:bg-secondary/50 hover:text-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
