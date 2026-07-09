import { ReactNode } from 'react';
import { Menu, Search } from 'lucide-react';

interface TopbarProps {
  title: string;
  action?: ReactNode;
}

export function Topbar({ title, action }: TopbarProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-4 md:px-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-muted-foreground hover:text-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 h-9 bg-background border border-border rounded-full pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
}
