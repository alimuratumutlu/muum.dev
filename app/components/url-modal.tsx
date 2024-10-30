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
        {/* Header */}
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-zinc-100"
          >
            <X size={24} />
          </button>
        </div>

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