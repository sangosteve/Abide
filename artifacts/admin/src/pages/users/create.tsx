import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { User, Mail, Phone, Shield } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '@/lib/api';
import { CreateUserInput } from '@/lib/api';

export default function CreateUser() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<CreateUserInput>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'member',
    group: '',
    campus: null,
    status: 'pending',
    memberSince: new Date().toISOString().split('T')[0],
    notes: '',
    photoUrl: null
  });

  const [error, setError] = useState('');

  const createMutation = useMutation({
    mutationFn: () => usersApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setLocation('/users');
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

  return (
    <AdminLayout 
      title="Add New User"
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
            onClick={() => createMutation.mutate()}
            disabled={createMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          >
            {createMutation.isPending ? 'Sending...' : 'Send Invite'}
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
                      placeholder="e.g. John" 
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                      placeholder="e.g. Doe" 
                      value={formData.lastName}
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
                        placeholder="john@example.com" 
                        value={formData.email}
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
                        placeholder="(555) 123-4567" 
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
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as CreateUserInput['role'] })}
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
                <label className="text-sm font-medium text-foreground">Primary Ministry / Group</label>
                <select 
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.group || ''}
                  onChange={e => setFormData({ ...formData, group: e.target.value })}
                >
                  <option value="">None</option>
                  <option value="Worship Arts">Worship Arts</option>
                  <option value="Youth Ministry">Youth Ministry</option>
                  <option value="Women's Ministry">Women's Ministry</option>
                  <option value="Men's Fellowship">Men's Fellowship</option>
                </select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium text-foreground">Admin Notes (Internal)</label>
                <textarea 
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none" 
                  placeholder="Add any helpful context about this member..." 
                  value={formData.notes || ''}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <PreviewPanel title="Role Summary">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Capabilities</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Access member directory
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Join public groups
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Register for events
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary font-medium">Invitation Email</p>
                <p className="text-xs text-primary/80 mt-1">
                  An email will be sent with a secure link to set their password and complete their profile.
                </p>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AdminLayout>
  );
}
