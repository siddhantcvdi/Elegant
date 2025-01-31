import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ImageDisplayProps {
  images: string[];
}

export function ImageDisplay(props: ImageDisplayProps) {
  const { images } = props;
  const [mainImage, setMainImage] = useState(0);
  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative aspect-square bg-white mb-4 flex justify-center items-center cursor-pointer">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center bg-neutral-100 p-3 rounded-lg"
          onClick={() => {
            if (mainImage === 0) return;
            setMainImage(mainImage - 1);
          }}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <AnimatePresence mode="wait">
          <motion.img
            key={images[mainImage]}
            src={images[mainImage]}
            alt="Tray Table"
            width={400}
            height={400}
            className="object-contain max-h-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        </AnimatePresence>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center bg-neutral-100 p-3 rounded-lg"
          onClick={() => {
            if (mainImage === images.length - 1) return;
            setMainImage(mainImage + 1);
          }}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((i) => (
          <div
            key={i}
            className={`aspect-square bg-neutral-50 cursor-pointer relative flex justify-center items-center ${
              mainImage === images.indexOf(i)
                ? "border-2 border-neutral-500"
                : ""
            }`}
            onClick={() => {
              setMainImage(images.indexOf(i));
            }}>
            <img
              src={i}
              alt={`Tray Table view ${i}`}
              width={80}
              height={80}
              className="object-contain max-h-[80px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
