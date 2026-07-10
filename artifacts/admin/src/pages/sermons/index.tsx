import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { Mic2, Plus, PlayCircle, Eye, Search, Loader2, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sermonsApi } from '@/lib/api';
import { useState } from 'react';

export default function SermonsList() {
  const [search, setSearch] = useState('');
  const [publishStatus, setPublishStatus] = useState('');
  const [mediaStatus, setMediaStatus] = useState('');
  const queryClient = useQueryClient();

  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (publishStatus) params.publishStatus = publishStatus;
  if (mediaStatus) params.mediaStatus = mediaStatus;

  const { data, isLoading, error } = useQuery({
    queryKey: ['sermons', params],
    queryFn: () => sermonsApi.list(params)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sermonsApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sermons'] })
  });

  if (isLoading) {
    return (
      <AdminLayout title="Sermon Library">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Sermon Library">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load sermons.
        </div>
      </AdminLayout>
    );
  }

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
        <MetricCard title="Total Sermons" value={data?.total?.toString() ?? '0'} icon={<Mic2 className="w-5 h-5" />} />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1 sm:flex-none"
              value={publishStatus}
              onChange={(e) => setPublishStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
            <select 
              className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary flex-1 sm:flex-none"
              value={mediaStatus}
              onChange={(e) => setMediaStatus(e.target.value)}
            >
              <option value="">All Media Status</option>
              <option value="none">None</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready</option>
            </select>
          </div>
        </div>

        <DataTable 
          data={data?.items || []}
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
                    <div className="text-xs text-muted-foreground">{s.speaker} • {s.series || 'Standalone'}</div>
                  </div>
                </div>
              )
            },
            { 
              header: 'Scripture', 
              accessor: (s) => <span className="text-sm font-medium">{s.scripture || '-'}</span> 
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
              accessor: (s) => (
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/sermons/${s.id}/edit`} className="text-primary hover:text-primary/80 text-sm font-medium">Edit</Link>
                  <button
                    type="button"
                    onClick={() => { if (confirm(`Delete "${s.title}"?`)) deleteMutation.mutate(s.id); }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )
            }
          ]}
        />
      </div>
    </AdminLayout>
  );
}
