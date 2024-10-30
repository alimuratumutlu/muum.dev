"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface UrlModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export function UrlModal({ url, isOpen, onClose }: UrlModalProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-zinc-900 rounded-lg shadow-xl transition-all duration-300 flex flex-col ${
        isMaximized ? 'w-screen h-screen' : 'w-[95vw] h-[90vh]'
      }`}>
        {/* Title Bar */}
        <div className="h-9 bg-zinc-800 rounded-t-lg relative flex items-center justify-center">
          {/* Traffic Light Buttons Container */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-50">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-3 h-3 bg-[#ff5f56] rounded-full hover:brightness-110
                transition-all group relative flex items-center justify-center"
            >
              <X className="w-2 h-2 text-[#4c0002] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            {/* Minimize Button */}
            <button
              onClick={() => {/* Add minimize logic if needed */}}
              className="w-3 h-3 bg-[#ffbd2e] rounded-full hover:brightness-110
                transition-all group relative flex items-center justify-center"
            >
              <div className="w-1.5 h-0.5 bg-[#4c3c00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            {/* Maximize Button */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 bg-[#27c93f] rounded-full hover:brightness-110
                transition-all group relative flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 border border-[#1b6b32] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* URL Bar */}
          <div className="max-w-[60%] px-3 py-0.5 bg-zinc-700/50 rounded-md flex items-center gap-2 group">
            <div className="w-3 h-3">
              <svg viewBox="0 0 24 24" className="w-full h-full text-gray-400">
                <path 
                  fill="currentColor" 
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-300 truncate">{url}</span>
          </div>
        </div>

        {/* IFrame Container */}
        <div className="flex-1 relative">
          <iframe
            src={url}
            className="w-full h-full rounded-b-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
} 