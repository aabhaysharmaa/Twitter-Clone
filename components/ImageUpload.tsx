"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone" ; 
interface ImageUploadProps {
  value?: string;
  disabled?: boolean;
  onChange: (image: string) => void;
  label?: string;
}

const ImageUpload = ({
  value,
  disabled,
  onChange,
  label
}: ImageUploadProps) => {
  const [base64, setBase64] = useState<string | undefined>(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": []
    }
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white border-2 border-dotted rounded-md border-neutral-500 cursor-pointer"
      })}
    >
      {/* Dropzone input */}
      <input {...getInputProps()} />

      {/* Preview or label */}
      {base64 ? (
        <div className="flex items-center justify-center" key={base64}>
          <Image
            src={base64}
            height={100}
            width={100}
            alt="Upload image"
            className="object-cover rounded-md"
          />
        </div>
      ) : (
        <p className="text-center text-neutral-300">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
