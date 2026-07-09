import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { Mic2, Plus, PlayCircle, Eye, Search } from 'lucide-react';
import { mockSermons } from '@/data/mock';

export default function SermonsList() {
  return (
    <AdminLayout 
      title="Sermon Library"
      action={
        <Link href="/sermons/create" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
          <Plus className="w-4 h-4" />
          New Sermon
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Sermons" value="248" icon={<Mic2 className="w-5 h-5" />} />
        <MetricCard title="Total Views" value="45.2k" icon={<Eye className="w-5 h-5 text-muted-foreground" />} trend={{ value: '12%', isPositive: true }} />
        <MetricCard title="Avg. Watch Time" value="34m" icon={<PlayCircle className="w-5 h-5" />} />
        <MetricCard title="Active Series" value="8" icon={<Search className="w-5 h-5 text-muted-foreground" />} />
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by title, speaker, or scripture..." 
              className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1 sm:flex-none">
              <option>All Speakers</option>
              <option>Pastor John Smith</option>
              <option>Pastor David Wilson</option>
            </select>
            <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1 sm:flex-none">
              <option>Latest First</option>
              <option>Oldest First</option>
              <option>Most Viewed</option>
            </select>
          </div>
        </div>

        <DataTable 
          data={mockSermons}
          keyExtractor={(s) => s.id}
          columns={[
            {
              header: 'Sermon Details',
              accessor: (s) => (
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 rounded bg-muted overflow-hidden relative border border-border">
                    <PlayCircle className="w-4 h-4 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.speaker} • {s.series}</div>
                  </div>
                </div>
              )
            },
            { 
              header: 'Scripture', 
              accessor: (s) => <span className="text-sm font-medium">{s.scripture}</span> 
            },
            { 
              header: 'Date', 
              accessor: (s) => <span className="text-sm text-muted-foreground">{new Date(s.date).toLocaleDateString()}</span> 
            },
            { 
              header: 'Status', 
              accessor: (s) => (
                <div className="flex flex-col gap-1 items-start">
                  <StatusBadge status={s.publishStatus} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.mediaStatus}</span>
                </div>
              )
            },
            { 
              header: 'Views', 
              accessor: (s) => <span className="text-sm font-medium">{s.views > 0 ? s.views.toLocaleString() : '-'}</span> 
            },
            { 
              header: '', 
              accessor: () => (
                <button className="text-primary hover:text-primary/80 text-sm font-medium">Edit</button>
              )
            }
          ]}
        />
      </div>
    </AdminLayout>
  );
}
