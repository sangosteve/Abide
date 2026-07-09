import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Mic2, 
  Calendar, 
  Users2, 
  Heart, 
  MessageSquare, 
  FileText, 
  Bell, 
  BarChart2, 
  FileBox, 
  Settings 
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Bible Studies', path: '/bible-studies', icon: BookOpen },
  { name: 'Sermons', path: '/sermons', icon: Mic2 },
  { name: 'Events', path: '/events', icon: Calendar },
  { name: 'Groups', path: '#', icon: Users2, disabled: true },
  { name: 'Prayer Requests', path: '#', icon: Heart, disabled: true },
  { name: 'Discussions', path: '/discussions', icon: MessageSquare },
  { name: 'Resources', path: '#', icon: FileText, disabled: true },
  { name: 'Notifications', path: '#', icon: Bell, disabled: true },
  { name: 'Analytics', path: '#', icon: BarChart2, disabled: true },
  { name: 'Reports', path: '#', icon: FileBox, disabled: true },
  { name: 'Settings', path: '#', icon: Settings, disabled: true },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col flex-shrink-0 h-full">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight text-sidebar-foreground">Abide Admin</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.startsWith(item.path) && item.path !== '#';
          
          if (item.disabled) {
            return (
              <div 
                key={item.name} 
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground/50 opacity-50 cursor-not-allowed text-sm"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
            );
          }

          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-semibold border border-sidebar-border">
            JS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">John Smith</span>
            <span className="text-xs text-sidebar-foreground/60">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
