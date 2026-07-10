import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { Users, UserPlus, Filter, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/lib/api';
import { useState } from 'react';

export default function UsersList() {
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const params: Record<string, string> = {};
  if (roleFilter) params.role = roleFilter;
  if (statusFilter) params.status = statusFilter;

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.list(params)
  });

  const activeUsers = data?.items.filter(u => u.status === 'active').length || 0;
  const newThisMonth = 42; // static mock metric
  
  if (isLoading) {
    return (
      <AdminLayout title="Users & Members">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Users & Members">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load users.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Users & Members"
      action={
        <Link href="/users/create" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add User
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Users" value={data?.total?.toLocaleString() ?? '0'} icon={<Users className="w-5 h-5" />} />
        <MetricCard title="Active Members" value={activeUsers.toLocaleString()} trend={{ value: '3%', isPositive: true }} />
        <MetricCard title="New This Month" value={newThisMonth} trend={{ value: '12', isPositive: true }} />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-3 text-sm">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="text-muted-foreground hidden sm:block">
            Showing all {data?.total ?? 0} users
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="member">Member</option>
            <option value="group_leader">Group Leader</option>
            <option value="ministry_leader">Ministry Leader</option>
            <option value="worship_team">Worship Team</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <select 
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <DataTable 
        data={data?.items || []}
        keyExtractor={(u) => u.id}
        columns={[
          {
            header: 'User',
            accessor: (u) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                  {`${u.firstName} ${u.lastName}`.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-foreground">{u.firstName} {u.lastName}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
            )
          },
          { header: 'Role', accessor: (u) => <span className="font-medium capitalize">{u.role.replace('_', ' ')}</span> },
          { header: 'Group / Ministry', accessor: (u) => <span className="text-muted-foreground">{u.group || '-'}</span> },
          { header: 'Joined', accessor: (u) => <span className="text-muted-foreground">{u.memberSince ? new Date(u.memberSince).toLocaleDateString() : '-'}</span> },
          { header: 'Status', accessor: (u) => <StatusBadge status={u.status} /> },
          { 
            header: '', 
            accessor: () => (
              <button className="text-primary hover:text-primary/80 text-sm font-medium">Edit</button>
            )
          }
        ]}
      />
    </AdminLayout>
  );
}
