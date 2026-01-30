import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/media', { method: 'POST', body: formData });
      const data = await res.json();
      onChange(data.url || URL.createObjectURL(file));
    } catch {
      // Fallback: use local URL for preview
      onChange(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {label && <label className="label">{label}</label>}
      <div className="flex items-start gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload..."
          className="input flex-1"
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="btn-secondary shrink-0"
        >
          <Upload className="w-4 h-4" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
      {value && (
        <div className="mt-2 relative inline-block">
          <img src={value} alt="" className="h-24 rounded-lg object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-600 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
