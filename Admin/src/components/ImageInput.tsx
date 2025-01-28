import { PlusCircle, Trash } from "lucide-react";
import React, { ChangeEvent } from "react";

interface ImageInputProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageInput = (props: ImageInputProps) => {
  const { selectedFiles, setSelectedFiles } = props;
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedFiles(imageFiles);
    }
  };
  return (
    <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium ">
      <label>Add Images</label>
      <div className="flex w-[70%] max-sm:w-full">
        <label
          htmlFor="img_selector"
          className="w-[70%] max-sm:w-full text-sm flex flex-1 items-center justify-center border border-gray-300 rounded-md h-9 bg-white cursor-pointer hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
        >
          {
            selectedFiles.length === 0 ?  <PlusCircle className="w-4" color="#555" /> :  selectedFiles.length  === 1 ? `${selectedFiles.length} image selected` : `${selectedFiles.length} images selected`
          }
        </label>
        <button
          className="rounded-lg bg-red-500 active:bg-red-600 w-9 flex justify-center items-center ml-2"
          onClick={() => setSelectedFiles([])}
        >
          <Trash className="w-4" color="#fff" />
        </button>
      </div>
      <input
        type="file"
        id="img_selector"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
      />
      {/* {selectedFiles.length > 0 && (
        <div className="max-sm:w-full w-[70%]">
          <div className="grid grid-cols-3 gap-2 mt-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative w-full h-24 rounded-md overflow-hidden border border-gray-300"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ImageInput;
