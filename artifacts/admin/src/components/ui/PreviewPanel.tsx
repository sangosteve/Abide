import { ReactNode } from 'react';

interface PreviewPanelProps {
  title: string;
  children: ReactNode;
}

export function PreviewPanel({ title, children }: PreviewPanelProps) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-border bg-background/50">
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
