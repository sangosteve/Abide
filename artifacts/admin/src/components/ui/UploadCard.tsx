import { UploadCloud } from 'lucide-react';

interface UploadCardProps {
  label: string;
  description?: string;
  icon?: React.ElementType;
}

export function UploadCard({ label, description = "Drag and drop or click to upload", icon: Icon = UploadCloud }: UploadCardProps) {
  return (
    <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-background/50 group">
      <div className="w-10 h-10 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-3 transition-colors">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
