
// Handles image upload, camera capture, file validation, and preview.

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Upload,
  ImagePlus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function ImageInput({ onImageChange }) {
  const cameraInputRef = useRef(null);
  const uploadInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  // Releases the temporary image URL when replaced or unmounted.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Validates the selected image before storing it.
  function handleFile(file) {
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
    setFileName(file.name);
    onImageChange?.(file);
  }

  // Removes the selected image and resets both file inputs.
  function removeImage() {
    setPreview(null);
    setFileName("");
    setError("");
    onImageChange?.(null);

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  }

  return (
    <section
      aria-labelledby="image-input-heading"
      className="mt-8 rounded-3xl border border-slate-700/70 bg-[#102038] p-5 sm:p-8"
    >
      <div className="mb-6">
        <h2
          id="image-input-heading"
          className="flex items-center gap-3 text-xl font-bold text-white"
        >
          <ImagePlus
            size={25}
            className="text-teal-300"
            aria-hidden="true"
          />
          Visual Input
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Capture or upload an image to get started.
        </p>
      </div>

      {/* Hidden native inputs retain browser camera and file support. */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        aria-label="Capture a photo using your device camera"
        onChange={(event) =>
          handleFile(event.target.files?.[0])
        }
      />

      <input
        ref={uploadInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        aria-label="Upload an image from your device"
        onChange={(event) =>
          handleFile(event.target.files?.[0])
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-600 bg-[#142B43] p-5 text-white transition-colors hover:border-teal-400 hover:bg-[#193650] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        >
          <Camera
            size={30}
            className="text-teal-300"
            aria-hidden="true"
          />
          <span className="font-semibold">Capture Photo</span>
          <span className="text-xs text-slate-300">
            Use your device camera
          </span>
        </button>

        <button
          type="button"
          onClick={() => uploadInputRef.current?.click()}
          className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-600 bg-[#142B43] p-5 text-white transition-colors hover:border-teal-400 hover:bg-[#193650] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        >
          <Upload
            size={30}
            className="text-teal-300"
            aria-hidden="true"
          />
          <span className="font-semibold">Upload Image</span>
          <span className="text-xs text-slate-300">
            Choose an image from your device
          </span>
        </button>
      </div>

      {/* Displays validation errors to assistive technologies. */}
      {error && (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 text-sm text-rose-300"
        >
          <AlertCircle size={18} aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-dashed border-slate-600 bg-[#0B192C]">
        {preview ? (
          <div className="p-4">
            <img
              src={preview}
              alt="Preview of the selected image"
              className="mx-auto max-h-80 w-full rounded-xl object-contain"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2 text-sm text-teal-200">
                <CheckCircle2
                  size={18}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{fileName}</span>
              </p>

              <button
                type="button"
                onClick={removeImage}
                className="inline-flex items-center gap-2 rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-200 hover:bg-rose-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                <Trash2 size={17} aria-hidden="true" />
                Remove Image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-44 flex-col items-center justify-center gap-3 p-6 text-center">
            <ImagePlus
              size={35}
              className="text-slate-500"
              aria-hidden="true"
            />

            <p className="text-sm text-slate-300">
              Your selected image will appear here.
            </p>

            <p className="text-xs text-slate-400">
              Supported: JPEG, PNG, WebP — Maximum 5 MB
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageInput;
