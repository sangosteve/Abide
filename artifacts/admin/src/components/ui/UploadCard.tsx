import { UploadCloud, CheckCircle, Loader2, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadCardProps {
  label: string;
  description?: string;
  icon?: React.ElementType;
  accept?: string;
  /** Called with the public media URL once the upload succeeds */
  onUploaded?: (url: string) => void;
  /** Current URL already set on the record (shows a preview / clear button) */
  currentUrl?: string | null;
}

export function UploadCard({
  label,
  description = "Drag and drop or click to upload",
  icon: Icon = UploadCloud,
  accept,
  onUploaded,
  currentUrl,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const activeUrl = uploadedUrl ?? currentUrl ?? null;

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Upload failed (${res.status})`);
      }
      const data = await res.json() as { url: string };
      setUploadedUrl(data.url);
      onUploaded?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setUploadedUrl(null);
    onUploaded?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  if (activeUrl) {
    const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(activeUrl) || activeUrl.includes('unsplash');
    const isAudio = /\.(mp3|m4a|wav|aac)$/i.test(activeUrl);
    const isVideo = /\.(mp4|mov|webm)$/i.test(activeUrl);

    return (
      <div className="border border-border rounded-xl overflow-hidden bg-card">
        {isImage && (
          <img src={activeUrl} alt="Upload preview" className="w-full h-36 object-cover" />
        )}
        {isAudio && (
          <div className="p-4">
            <audio controls src={activeUrl} className="w-full" />
          </div>
        )}
        {isVideo && (
          <video controls src={activeUrl} className="w-full h-36 object-cover" />
        )}
        {!isImage && !isAudio && !isVideo && (
          <div className="p-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-foreground truncate flex-1">{activeUrl.split('/').pop()}</span>
          </div>
        )}
        <div className="px-4 py-2 bg-background/50 border-t border-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs text-muted-foreground">Uploaded</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-primary hover:underline font-medium"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={clear}
              className="p-0.5 hover:text-destructive text-muted-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-background/50 group"
      onClick={() => !uploading && inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
      {uploading ? (
        <>
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-sm font-medium text-foreground">Uploading…</p>
        </>
      ) : (
        <>
          <div className="w-10 h-10 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-3 transition-colors">
            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </>
      )}
      {error && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
