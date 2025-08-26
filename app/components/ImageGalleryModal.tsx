"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageGalleryModalProps {
  images: Array<{
    key: string;
    link: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageGalleryModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageGalleryModalProps) {
  const [scale, setScale] = useState(1);

  const resetZoom = useCallback(() => {
    setScale(1);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
    resetZoom();
  }, [currentIndex, images.length, onNavigate, resetZoom]);

  const handlePrevious = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(prevIndex);
    resetZoom();
  }, [currentIndex, images.length, onNavigate, resetZoom]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrevious, handleZoomIn, handleZoomOut, onClose]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 cursor-pointer hover:scale-105 duration-100 right-4 z-50 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all"
        aria-label="Close gallery"
      >
        <X className="w-6 h-6 text-black" />
      </button>

      <div className="absolute top-4 left-4 z-50 px-3 py-1 bg-white bg-opacity-20 rounded-full text-black">
        {currentIndex + 1} / {images.length}
      </div>

      <div className="absolute bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white cursor-pointer hover:scale-105 duration-100 bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white cursor-pointer hover:scale-105 duration-100 bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={resetZoom}
          className="p-2 bg-white cursor-pointer hover:scale-105 duration-100 bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all text-black text-sm px-3"
        >
          Reset
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 hover:scale-105 transition-all duration-100 top-1/2 cursor-pointer -translate-y-1/2 z-50 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 hover:scale-105 top-1/2 cursor-pointer -translate-y-1/2 z-50 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </>
      )}

      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.2s ease-out",
          }}
          className="flex items-center justify-center w-full h-full"
        >
          <Image
            src={images[currentIndex].link}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            style={{
              width: "auto",
              height: "auto",
            }}
            unoptimized
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white bg-opacity-20 rounded-full p-2 max-w-[80vw] overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img.key}
              onClick={() => {
                onNavigate(index);
                resetZoom();
              }}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-white"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={img.link}
                alt={`Thumbnail ${index + 1}`}
                width={48}
                height={48}
                className="w-full h-full object-cover cursor-pointer"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
