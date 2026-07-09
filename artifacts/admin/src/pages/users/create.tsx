import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { User, Mail, Phone, Shield } from 'lucide-react';

export default function CreateUser() {
  return (
    <AdminLayout 
      title="Add New User"
      action={
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm">
            Send Invite
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                  <UploadCard label="Photo" description="JPG or PNG" icon={User} />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Doe" />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="email" className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="tel" className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="(555) 123-4567" />
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
                <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Member</option>
                  <option>Group Leader</option>
                  <option>Ministry Leader</option>
                  <option>Staff / Admin</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Primary Ministry / Group</label>
                <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>None</option>
                  <option>Worship Arts</option>
                  <option>Youth Ministry</option>
                  <option>Women's Ministry</option>
                  <option>Men's Fellowship</option>
                </select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-sm font-medium text-foreground">Admin Notes (Internal)</label>
                <textarea className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none" placeholder="Add any helpful context about this member..." />
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
