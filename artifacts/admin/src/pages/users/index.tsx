import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Link } from 'wouter';
import { Users, UserPlus, Filter } from 'lucide-react';
import { mockUsers } from '@/data/mock';

export default function UsersList() {
  const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
  const newThisMonth = 42; // mock
  
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
        <MetricCard title="Total Users" value={mockUsers.length.toLocaleString()} icon={<Users className="w-5 h-5" />} />
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
            Showing all {mockUsers.length} users
          </div>
        </div>
        <div className="flex gap-2">
          <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Roles</option>
            <option>Member</option>
            <option>Leader</option>
            <option>Staff</option>
          </select>
          <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      <DataTable 
        data={mockUsers}
        keyExtractor={(u) => u.id}
        columns={[
          {
            header: 'User',
            accessor: (u) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-foreground">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
              </div>
            )
          },
          { header: 'Role', accessor: (u) => <span className="font-medium">{u.role}</span> },
          { header: 'Group / Ministry', accessor: (u) => <span className="text-muted-foreground">{u.group}</span> },
          { header: 'Joined', accessor: (u) => <span className="text-muted-foreground">{new Date(u.joinedDate).toLocaleDateString()}</span> },
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
