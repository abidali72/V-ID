import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      id="toast-container"
      className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      id={`toast-${toast.id}`}
      className="pointer-events-auto bg-black text-white px-4 py-3 shadow-2xl flex items-center gap-3 border border-gray-800 text-xs font-jakarta tracking-wide animate-slide-in-down"
    >
      <Check size={16} className="text-emerald-400 shrink-0" strokeWidth={2.5} />
      <span>{toast.message}</span>
    </div>
  );
};
