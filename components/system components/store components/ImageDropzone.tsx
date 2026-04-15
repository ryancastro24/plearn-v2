"use client";

import { useRef, useState } from "react";
import { Upload, ImageIcon } from "lucide-react";

type ImageDropZoneProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const ImageDropZone = ({ setFile }: ImageDropZoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file only.");
      return;
    }

    // ✅ send file to parent (IMPORTANT)
    setFile(file);

    // ✅ preview
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="w-full col-span-2 h-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`w-full h-full rounded-lg border-2 border-dashed transition flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 bg-muted/40 hover:bg-muted"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-52 object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-6">
            <div className="p-3 rounded-full bg-background shadow">
              {isDragging ? (
                <ImageIcon className="w-6 h-6" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Drag and drop an image here</p>
              <p className="text-xs text-muted-foreground">
                or click to choose a file
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDropZone;
