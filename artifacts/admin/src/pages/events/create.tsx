import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { Calendar, Users, Image as ImageIcon, MapPin, Link as LinkIcon, Clock } from 'lucide-react';

export default function CreateEvent() {
  return (
    <AdminLayout 
      title="Create Event"
      action={
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm">
            Publish Event
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/50">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Event Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground mb-2 block">Event Banner</label>
                <UploadCard label="Upload Banner Image" description="1200x400 recommended for optimal display" icon={ImageIcon} />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-foreground">Event Title</label>
                  <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Summer Youth Retreat" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>Service</option>
                    <option>Conference</option>
                    <option>Outreach</option>
                    <option>Social</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Hosting Ministry</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>General / Main Church</option>
                    <option>Youth Ministry</option>
                    <option>Worship Arts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Time</label>
                  <div className="flex gap-2">
                    <input type="time" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    <span className="self-center text-muted-foreground text-sm">to</span>
                    <input type="time" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><MapPin className="w-3 h-3"/> Location / Venue</label>
                  <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Main Sanctuary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><LinkIcon className="w-3 h-3"/> Online Link (Optional)</label>
                  <input type="url" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="https://zoom.us/..." />
                </div>
              </div>

              <div className="space-y-1.5 border-t border-border pt-6">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none" placeholder="Provide details about the event..." />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Registration & RSVP">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-1 text-primary rounded focus:ring-primary" defaultChecked />
                  <div>
                    <div className="text-sm font-medium text-foreground">Require Registration</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Users must RSVP to attend</div>
                  </div>
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Capacity Limit
                </label>
                <input type="number" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Leave blank for unlimited" />
              </div>

              <div className="pt-4 border-t border-border space-y-4">
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-1 text-primary rounded focus:ring-primary" defaultChecked />
                  <div>
                    <div className="text-sm font-medium text-foreground">Send Reminders</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Auto-email attendees 24h before</div>
                  </div>
                </label>
              </div>
            </div>
          </PreviewPanel>
          
          <button className="w-full py-3 bg-card border border-border rounded-xl shadow-sm text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
            Preview Event Page
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
