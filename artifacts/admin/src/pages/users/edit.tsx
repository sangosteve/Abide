import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { User, Mail, Phone, Shield, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, UpdateUserInput } from '@/lib/api';

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: user, isLoading, error: loadError } = useQuery({
    queryKey: ['users', id],
    queryFn: () => usersApi.get(id!),
    enabled: !!id
  });

  const [formData, setFormData] = useState<UpdateUserInput>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const { id: _id, createdAt, updatedAt, ...rest } = user;
      setFormData(rest);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: () => usersApi.update(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setLocation('/users');
    },
    onError: (err: Error) => setError(err.message)
  });

  if (loadError) {
    return (
      <AdminLayout title="Edit User">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load user.
        </div>
      </AdminLayout>
    );
  }

  if (isLoading || !user) {
    return (
      <AdminLayout title="Edit User">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit User"
      action={
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
            onClick={() => setLocation('/users')}
          >
            Cancel
          </button>
          <button
            onClick={() => updateMutation.mutate()}
            disabled={updateMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/50">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-32 flex-shrink-0">
                  <UploadCard
                    label="Photo"
                    description="JPG or PNG"
                    icon={User}
                    accept="image/*"
                    currentUrl={formData.photoUrl}
                    onUploaded={(url) => setFormData({ ...formData, photoUrl: url || null })}
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.firstName || ''}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      value={formData.lastName || ''}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={formData.email || ''}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        value={formData.phone || ''}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/50">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Church Assignment & Access
              </h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Role</label>
                <select
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.role || 'member'}
                  onChange={e => setFormData({ ...formData, role: e.target.value as UpdateUserInput['role'] })}
                >
                  <option value="member">Member</option>
                  <option value="group_leader">Group Leader</option>
                  <option value="ministry_leader">Ministry Leader</option>
                  <option value="worship_team">Worship Team</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.status || 'active'}
                  onChange={e => setFormData({ ...formData, status: e.target.value as UpdateUserInput['status'] })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium text-foreground">Admin Notes (Internal)</label>
                <textarea
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none"
                  value={formData.notes || ''}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <PreviewPanel title="Account Summary">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Member Since</h4>
                <p className="text-sm text-muted-foreground">{user.memberSince || 'Unknown'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Current Group</h4>
                <p className="text-sm text-muted-foreground">{user.group || 'None'}</p>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AdminLayout>
  );
}
