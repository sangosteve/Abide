import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { MessageSquare, AlertTriangle, ShieldAlert, Activity, CheckCircle, Trash2, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { discussionsApi } from '@/lib/api';
import { useState } from 'react';

export default function Discussions() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(''); // '' = all, 'prayer_request' = prayer, 'announcement' = group, 'flagged' = flagged
  
  const params: Record<string, string> = {};
  if (activeTab === 'flagged') {
    params.status = 'flagged';
  } else if (activeTab) {
    params.type = activeTab;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['discussions', params],
    queryFn: () => discussionsApi.list(params)
  });

  const moderateMutation = useMutation({
    mutationFn: ({ id, action }: { id: string, action: 'approve' | 'flag' | 'resolve' | 'remove' }) => discussionsApi.moderate(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] });
    }
  });

  if (isLoading) {
    return (
      <AdminLayout title="Community Moderation">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Community Moderation">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load discussions.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Community Moderation">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Active Threads" value={data?.total?.toString() ?? '0'} icon={<MessageSquare className="w-5 h-5" />} />
        <MetricCard title="Pending Reviews" value="12" icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />} />
        <MetricCard title="Reported Posts" value="5" icon={<ShieldAlert className="w-5 h-5 text-destructive" />} trend={{ value: '2', isPositive: false }} />
        <MetricCard title="Engagement Health" value="Good" icon={<Activity className="w-5 h-5 text-green-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex border-b border-border mb-4">
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === '' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('')}
            >
              All Activity
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'prayer_request' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('prayer_request')}
            >
              Prayer Requests
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'announcement' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('announcement')}
            >
              Announcements
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium flex items-center gap-1 ${activeTab === 'flagged' ? 'text-destructive border-b-2 border-destructive' : 'text-destructive hover:text-destructive/80'}`}
              onClick={() => setActiveTab('flagged')}
            >
              Flagged <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full ml-1">5</span>
            </button>
          </div>

          <DataTable 
            data={data?.items || []}
            keyExtractor={(d) => d.id}
            columns={[
              {
                header: 'Thread / Topic',
                accessor: (d) => (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <div className={`font-medium ${d.status === 'flagged' ? 'text-destructive' : 'text-foreground'}`}>{d.title}</div>
                      <div className="text-xs text-muted-foreground">Started by {d.authorName} in {d.group || 'General'}</div>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Activity', 
                accessor: (d) => (
                  <span className="text-sm text-muted-foreground">{d.replies} replies</span>
                )
              },
              { header: 'Status', accessor: (d) => <StatusBadge status={d.status} /> },
              { 
                header: 'Actions', 
                accessor: (d) => (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => moderateMutation.mutate({ id: d.id, action: 'resolve' })}
                      className="p-1.5 text-muted-foreground hover:text-foreground bg-background rounded border border-border" 
                      title="Mark as Resolved"
                      disabled={moderateMutation.isPending}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => moderateMutation.mutate({ id: d.id, action: 'remove' })}
                      className="p-1.5 text-muted-foreground hover:text-destructive bg-background rounded border border-border" 
                      title="Remove"
                      disabled={moderateMutation.isPending}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )
              }
            ]}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Moderation Queue">
            <div className="space-y-4">
              <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
                <div className="flex items-start gap-3 mb-2">
                  <ShieldAlert className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Inappropriate Link</h4>
                    <p className="text-xs text-muted-foreground mt-1">Reported by 5 users in "General Discussion"</p>
                  </div>
                </div>
                <div className="bg-background/50 border border-border rounded p-2 text-sm text-foreground/80 mt-2 line-clamp-2 italic">
                  "Hey everyone check out this completely unrelated product link..."
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-2 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded hover:bg-destructive/90">Delete Post</button>
                  <button className="flex-1 px-2 py-1.5 bg-background border border-border text-foreground text-xs font-medium rounded hover:bg-muted">Ignore</button>
                </div>
              </div>

              <div className="p-4 border border-border bg-card rounded-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
                <div className="flex items-start gap-3 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Heated Argument</h4>
                    <p className="text-xs text-muted-foreground mt-1">Auto-flagged in "Theology Q&A"</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-2 py-1.5 bg-background border border-border text-foreground text-xs font-medium rounded hover:bg-muted">Review Thread</button>
                </div>
              </div>
            </div>
          </PreviewPanel>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold text-primary mb-2">Community Guidelines</h3>
            <p className="text-sm text-primary/80 mb-4">Ensure your moderation team is aligned with the church's values for digital engagement.</p>
            <button className="text-sm font-medium text-primary hover:underline">Update Guidelines →</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
