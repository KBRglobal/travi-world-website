import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Copy, Check, ImageIcon, Search, X } from 'lucide-react';
import TopBar from '../components/TopBar';
import { getMedia, uploadMedia, deleteMedia } from '../lib/api';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: string;
  uploadedAt: string;
  type: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMedia()
      .then(setMedia)
      .catch(() => {
        // Mock data
        setMedia([
          { id: '1', url: '/images/bali.jpg', filename: 'bali.jpg', size: '2.4 MB', uploadedAt: '2025-01-15', type: 'image/jpeg' },
          { id: '2', url: '/images/paris.jpg', filename: 'paris.jpg', size: '1.8 MB', uploadedAt: '2025-01-14', type: 'image/jpeg' },
          { id: '3', url: '/images/tokyo.jpg', filename: 'tokyo.jpg', size: '3.1 MB', uploadedAt: '2025-01-13', type: 'image/jpeg' },
        ]);
      });
  }, []);

  const filtered = media.filter((m) =>
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      try {
        const result = await uploadMedia(file);
        setMedia((prev) => [result, ...prev]);
      } catch {
        // Create local preview
        const item: MediaItem = {
          id: Date.now().toString(),
          url: URL.createObjectURL(file),
          filename: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadedAt: new Date().toISOString().split('T')[0],
          type: file.type,
        };
        setMedia((prev) => [item, ...prev]);
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    await deleteMedia(item.id).catch(() => {});
    setMedia((prev) => prev.filter((m) => m.id !== item.id));
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <TopBar title="Media Library">
        <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="btn-primary">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
      </TopBar>

      <div className="p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input className="input pl-10" placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <p className="text-sm text-gray-500">{filtered.length} file{filtered.length !== 1 ? 's' : ''}</p>

        {/* Upload Drop Zone */}
        <div
          className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-indigo-500'); }}
          onDragLeave={(e) => e.currentTarget.classList.remove('border-indigo-500')}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-indigo-500');
            const dt = e.dataTransfer;
            if (dt.files.length) {
              const input = fileInputRef.current;
              if (input) {
                const dataTransfer = new DataTransfer();
                for (const f of Array.from(dt.files)) dataTransfer.items.add(f);
                input.files = dataTransfer.files;
                input.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }
          }}
        >
          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400">Drop files here or click to upload</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, GIF up to 10MB</p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative">
              <div
                className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors"
                onClick={() => setPreview(item)}
              >
                {item.url ? (
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="mt-1.5">
                <p className="text-xs font-medium truncate">{item.filename}</p>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              {/* Hover actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); copyUrl(item.url); }} className="bg-gray-900/80 p-1.5 rounded-lg hover:bg-gray-800">
                  {copied === item.url ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(item); }} className="bg-gray-900/80 p-1.5 rounded-lg hover:bg-gray-800">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No media files found</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80" onClick={() => setPreview(null)} />
          <div className="relative max-w-4xl w-full">
            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
            <img src={preview.url} alt={preview.filename} className="w-full rounded-lg" />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{preview.filename}</p>
                <p className="text-sm text-gray-400">{preview.size} · {preview.uploadedAt}</p>
              </div>
              <button onClick={() => copyUrl(preview.url)} className="btn-secondary text-sm">
                {copied === preview.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
