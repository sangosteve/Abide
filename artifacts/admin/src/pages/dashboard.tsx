import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, BookOpen, Calendar, MessageSquare, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { usersApi, bibleStudiesApi, eventsApi, discussionsApi } from '@/lib/api';

export default function Dashboard() {
  const { data: usersData, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users', { limit: 5, sort: 'recent' }],
    queryFn: () => usersApi.list({ limit: '5', sort: 'recent' })
  });

  const { data: studiesData, isLoading: studiesLoading, error: studiesError } = useQuery({
    queryKey: ['bible-studies', { status: 'active', limit: 5 }],
    queryFn: () => bibleStudiesApi.list({ status: 'active', limit: '5' })
  });

  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events', { limit: 5 }],
    queryFn: () => eventsApi.list({ limit: '5' })
  });

  const { data: discussionsData, isLoading: discussionsLoading, error: discussionsError } = useQuery({
    queryKey: ['discussions', { limit: 5 }],
    queryFn: () => discussionsApi.list({ limit: '5' })
  });

  const isLoading = usersLoading || studiesLoading || eventsLoading || discussionsLoading;
  const hasError = usersError || studiesError || eventsError || discussionsError;

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard Overview">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (hasError) {
    return (
      <AdminLayout title="Dashboard Overview">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load dashboard data. Please try again later.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Users" 
          value={usersData?.total?.toLocaleString() ?? '0'} 
          icon={<Users className="w-5 h-5" />} 
          trend={{ value: '12%', isPositive: true }}
        />
        <MetricCard 
          title="Active Studies" 
          value={studiesData?.total?.toString() ?? '0'} 
          icon={<BookOpen className="w-5 h-5" />} 
          trend={{ value: '2', isPositive: true }}
        />
        <MetricCard 
          title="Upcoming Events" 
          value={eventsData?.total?.toString() ?? '0'} 
          icon={<Calendar className="w-5 h-5" />} 
        />
        <MetricCard 
          title="Active Threads" 
          value={discussionsData?.total?.toString() ?? '0'} 
          icon={<MessageSquare className="w-5 h-5" />} 
          trend={{ value: '5%', isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Members</h2>
          </div>
          <DataTable 
            data={usersData?.items || []}
            keyExtractor={(u) => u.id}
            columns={[
              {
                header: 'Member',
                accessor: (u) => (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      {`${u.firstName} ${u.lastName}`.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{u.firstName} {u.lastName}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                )
              },
              { header: 'Role', accessor: (u) => <span className="text-muted-foreground capitalize">{u.role.replace('_', ' ')}</span> },
              { header: 'Status', accessor: (u) => <StatusBadge status={u.status} /> }
            ]}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Studies</h2>
          </div>
          <DataTable 
            data={studiesData?.items || []}
            keyExtractor={(s) => s.id}
            columns={[
              {
                header: 'Title',
                accessor: (s) => (
                  <div>
                    <div className="font-medium text-foreground">{s.title}</div>
                    <div className="text-xs text-muted-foreground">Led by {s.leader}</div>
                  </div>
                )
              },
              { 
                header: 'Progress', 
                accessor: (s) => (
                  <div className="flex items-center gap-2 w-24">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{s.progress}%</span>
                  </div>
                )
              },
              { header: 'Status', accessor: (s) => <StatusBadge status={s.status} /> }
            ]}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Prayer Requests & Discussions</h2>
        <DataTable 
          data={discussionsData?.items || []}
          keyExtractor={(d) => d.id}
          columns={[
            {
              header: 'Thread',
              accessor: (d) => (
                <div>
                  <div className="font-medium text-foreground">{d.title}</div>
                  <div className="text-xs text-muted-foreground">in {d.group || 'General'} • {d.replies} replies</div>
                </div>
              )
            },
            { header: 'Author', accessor: (d) => <span className="text-muted-foreground">{d.authorName}</span> },
            { header: 'Status', accessor: (d) => <StatusBadge status={d.status} /> }
          ]}
        />
      </div>
    </AdminLayout>
  );
}
