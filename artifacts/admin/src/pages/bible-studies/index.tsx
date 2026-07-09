import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { BookOpen, Plus, PlayCircle, Users } from 'lucide-react';
import { mockBibleStudies } from '@/data/mock';

export default function BibleStudiesList() {
  return (
    <AdminLayout 
      title="Bible Studies"
      action={
        <Link href="/bible-studies/create" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
          <Plus className="w-4 h-4" />
          New Series
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Active Series" value="5" icon={<BookOpen className="w-5 h-5" />} />
        <MetricCard title="Draft Lessons" value="12" icon={<BookOpen className="w-5 h-5 text-muted-foreground" />} />
        <MetricCard title="Published Sessions" value="84" icon={<PlayCircle className="w-5 h-5" />} />
        <MetricCard title="Avg. Completion" value="68%" icon={<Users className="w-5 h-5" />} trend={{ value: '4%', isPositive: true }} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Study Series Library</h2>
          <div className="flex gap-2">
            <select className="bg-card border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <DataTable 
          data={mockBibleStudies}
          keyExtractor={(s) => s.id}
          columns={[
            {
              header: 'Series Title',
              accessor: (s) => (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 rounded-md bg-muted flex items-center justify-center border border-border">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.sessions} sessions • Led by {s.leader}</div>
                  </div>
                </div>
              )
            },
            { 
              header: 'Engagement', 
              accessor: (s) => (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{s.participants}</span>
                </div>
              )
            },
            { 
              header: 'Avg. Progress', 
              accessor: (s) => (
                <div className="flex items-center gap-2 w-32">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8">{s.progress}%</span>
                </div>
              )
            },
            { header: 'Status', accessor: (s) => <StatusBadge status={s.status} /> },
            { 
              header: '', 
              accessor: () => (
                <button className="text-primary hover:text-primary/80 text-sm font-medium">Manage</button>
              )
            }
          ]}
        />
      </div>
    </AdminLayout>
  );
}
