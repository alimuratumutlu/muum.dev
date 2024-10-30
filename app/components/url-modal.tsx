"use client";

import { X } from "lucide-react";

interface UrlModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export function UrlModal({ url, isOpen, onClose }: UrlModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[95vw] h-[90vh] bg-zinc-900 rounded-lg shadow-xl">
        {/* Close Button - With Glow Effect */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-1.5 bg-zinc-900 hover:bg-zinc-800 
            rounded-full text-zinc-400 hover:text-zinc-100 border border-zinc-800
            transition-all duration-300 ease-in-out
            shadow-[0_0_10px_1px_rgba(39,39,42,0.4)] 
            hover:shadow-[0_0_15px_3px_rgba(39,39,42,0.6)]
            dark:shadow-[0_0_10px_1px_rgba(244,244,245,0.1)]
            dark:hover:shadow-[0_0_15px_3px_rgba(244,244,245,0.2)]"
        >
          <X size={20} />
        </button>

        {/* IFrame */}
        <iframe
          src={url}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
} 