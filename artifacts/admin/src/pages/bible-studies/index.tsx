import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { BookOpen, Plus, PlayCircle, Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { bibleStudiesApi } from '@/lib/api';
import { useState } from 'react';

export default function BibleStudiesList() {
  const [statusFilter, setStatusFilter] = useState('');

  const params: Record<string, string> = {};
  if (statusFilter) params.status = statusFilter;

  const { data, isLoading, error } = useQuery({
    queryKey: ['bible-studies', params],
    queryFn: () => bibleStudiesApi.list(params)
  });

  const activeSeries = data?.items.filter(s => s.status === 'active').length || 0;
  
  if (isLoading) {
    return (
      <AdminLayout title="Bible Studies">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Bible Studies">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load Bible studies.
        </div>
      </AdminLayout>
    );
  }

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
        <MetricCard title="Active Series" value={activeSeries.toString()} icon={<BookOpen className="w-5 h-5" />} />
        <MetricCard title="Draft Lessons" value="12" icon={<BookOpen className="w-5 h-5 text-muted-foreground" />} />
        <MetricCard title="Published Sessions" value="84" icon={<PlayCircle className="w-5 h-5" />} />
        <MetricCard title="Avg. Completion" value="68%" icon={<Users className="w-5 h-5" />} trend={{ value: '4%', isPositive: true }} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Study Series Library</h2>
          <div className="flex gap-2">
            <select 
              className="bg-card border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <DataTable 
          data={data?.items || []}
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
                    <div className="text-xs text-muted-foreground">{s.lessonCount} sessions • Led by {s.leader || 'Unknown'}</div>
                  </div>
                </div>
              )
            },
            { 
              header: 'Engagement', 
              accessor: (s) => (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{s.participants || 0}</span>
                </div>
              )
            },
            { 
              header: 'Avg. Progress', 
              accessor: (s) => (
                <div className="flex items-center gap-2 w-32">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${s.progress || 0}%` }} />
                  </div>
                  <span className="text-xs font-medium w-8">{s.progress || 0}%</span>
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
