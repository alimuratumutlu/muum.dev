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
        <div className="h-9 bg-zinc-800 rounded-t-lg relative">
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