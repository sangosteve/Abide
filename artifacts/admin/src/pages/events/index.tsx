import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { Calendar, Plus, Users, MapPin, List, CalendarDays } from 'lucide-react';
import { mockEvents } from '@/data/mock';
import { useState } from 'react';

export default function EventsList() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <AdminLayout 
      title="Events Management"
      action={
        <Link href="/events/create" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
          <Plus className="w-4 h-4" />
          Create Event
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Upcoming Events" value="24" icon={<Calendar className="w-5 h-5" />} />
        <MetricCard title="Total Registrations" value="562" icon={<Users className="w-5 h-5" />} trend={{ value: '18%', isPositive: true }} />
        <MetricCard title="Events This Month" value="8" icon={<CalendarDays className="w-5 h-5 text-muted-foreground" />} />
        <MetricCard title="Avg Check-in Rate" value="85%" icon={<MapPin className="w-5 h-5 text-muted-foreground" />} />
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex justify-between items-center">
          <div className="flex bg-background border border-border rounded-md p-1">
            <button 
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm flex items-center gap-2 transition-colors ${view === 'list' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm flex items-center gap-2 transition-colors ${view === 'calendar' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <CalendarDays className="w-4 h-4" /> Calendar
            </button>
          </div>
          
          <div className="flex gap-2">
            <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary hidden sm:block">
              <option>All Categories</option>
              <option>Service</option>
              <option>Worship</option>
              <option>Outreach</option>
            </select>
          </div>
        </div>

        {view === 'list' ? (
          <DataTable 
            data={mockEvents}
            keyExtractor={(e) => e.id}
            columns={[
              {
                header: 'Event',
                accessor: (e) => (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-primary/10 border border-primary/20 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary uppercase">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-lg font-bold text-foreground leading-none">{new Date(e.date).getDate()}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.category} • Host: {e.host}</div>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Registrations', 
                accessor: (e) => (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{e.registrations} {e.capacity ? `/ ${e.capacity}` : ''}</span>
                    {e.capacity && (
                      <div className="w-24 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.min(100, (e.registrations / e.capacity) * 100)}%` }} />
                      </div>
                    )}
                  </div>
                )
              },
              { header: 'Status', accessor: (e) => <StatusBadge status={e.status} /> },
              { 
                header: '', 
                accessor: () => (
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">Manage</button>
                )
              }
            ]}
          />
        ) : (
          <div className="bg-card border border-border rounded-xl shadow-sm p-12 text-center text-muted-foreground flex flex-col items-center justify-center">
            <CalendarDays className="w-12 h-12 mb-4 text-muted" />
            <h3 className="text-lg font-medium text-foreground mb-1">Calendar View</h3>
            <p className="text-sm max-w-md">The full calendar view is available in the desktop application. Switch back to list view to manage events.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
