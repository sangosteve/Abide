import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { mockUsers, mockBibleStudies, mockDiscussions, dashboardMetrics } from '@/data/mock';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Users" 
          value={dashboardMetrics.totalUsers.toLocaleString()} 
          icon={<Users className="w-5 h-5" />} 
          trend={{ value: '12%', isPositive: true }}
        />
        <MetricCard 
          title="Active Studies" 
          value={dashboardMetrics.activeStudies} 
          icon={<BookOpen className="w-5 h-5" />} 
          trend={{ value: '2', isPositive: true }}
        />
        <MetricCard 
          title="Upcoming Events" 
          value={dashboardMetrics.upcomingEvents} 
          icon={<Calendar className="w-5 h-5" />} 
        />
        <MetricCard 
          title="Active Threads" 
          value={dashboardMetrics.activeThreads} 
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
            data={mockUsers.slice(0, 5)}
            keyExtractor={(u) => u.id}
            columns={[
              {
                header: 'Member',
                accessor: (u) => (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                )
              },
              { header: 'Role', accessor: (u) => <span className="text-muted-foreground">{u.role}</span> },
              { header: 'Status', accessor: (u) => <StatusBadge status={u.status} /> }
            ]}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Studies</h2>
          </div>
          <DataTable 
            data={mockBibleStudies.slice(0, 5)}
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
          data={mockDiscussions.slice(0, 4)}
          keyExtractor={(d) => d.id}
          columns={[
            {
              header: 'Thread',
              accessor: (d) => (
                <div>
                  <div className="font-medium text-foreground">{d.thread}</div>
                  <div className="text-xs text-muted-foreground">in {d.group} • {d.replies} replies</div>
                </div>
              )
            },
            { header: 'Author', accessor: (d) => <span className="text-muted-foreground">{d.author}</span> },
            { header: 'Status', accessor: (d) => <StatusBadge status={d.status} /> }
          ]}
        />
      </div>
    </AdminLayout>
  );
}
