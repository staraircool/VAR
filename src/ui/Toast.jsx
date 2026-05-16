import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = React.createContext(null);

export const useToast = () => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const dismiss = React.useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = React.useCallback(({ title, description, variant = 'success', duration = 4000 }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, description, variant }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  const icons = {
    success: <CheckCircle2 size={18} className="tw-text-emerald-400" />,
    error: <AlertCircle size={18} className="tw-text-red-400" />,
    info: <Info size={18} className="tw-text-[#ff8a18]" />,
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="tw-fixed tw-bottom-5 tw-right-5 tw-z-[200] tw-flex tw-flex-col tw-gap-2 tw-pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              className={cn(
                'tw-pointer-events-auto tw-flex tw-min-w-[280px] tw-items-start tw-gap-3 tw-rounded-xl tw-border tw-border-white/10 tw-bg-gradient-to-b tw-from-[#1a1a1a] tw-to-[#0a0a0a] tw-p-4 tw-shadow-[0_20px_50px_rgba(0,0,0,0.6)] tw-backdrop-blur-md'
              )}
            >
              <span className="tw-mt-0.5">{icons[t.variant]}</span>
              <div className="tw-flex-1">
                {t.title && <div className="tw-text-sm tw-font-semibold tw-text-white">{t.title}</div>}
                {t.description && <div className="tw-text-xs tw-text-white/65 tw-mt-0.5">{t.description}</div>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="tw-text-white/40 hover:tw-text-white tw-transition"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
