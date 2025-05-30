'use client';

import { motion, AnimatePresence } from 'motion/react';
import { LuDownload, LuX, LuFile } from 'react-icons/lu';
import { useEffect } from 'react';

interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt?: string;
}

export function ImagePopup({ isOpen, onClose, imageUrl, imageAlt = 'Image' }: ImagePopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageAlt.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
      window.open(imageUrl, '_blank');
    }
  };

  const handleOpen = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="relative bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 z-10 h-8 w-8 bg-background/80 hover:bg-background rounded-md border border-border/20 hover:border-border transition-all duration-200 flex items-center justify-center cursor-pointer"
                onClick={onClose}
              >
                <LuX className="h-4 w-4 text-foreground" />
              </button>

              <div className="p-6 pb-4">
                <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="px-6 pb-4 flex gap-3 justify-end">
                <button 
                  onClick={handleDownload} 
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-primary/5 hover:border-primary/10 rounded bg-background hover:bg-muted text-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                >
                  <LuDownload className="h-4 w-4" />
                  Download
                </button>
                <button 
                  onClick={handleOpen} 
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/70 text-primary-foreground rounded transition-all duration-200 cursor-pointer"
                >
                  <LuFile className="h-4 w-4" />
                  Open
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
