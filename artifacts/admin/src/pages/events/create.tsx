import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { Calendar, Users, Image as ImageIcon, MapPin, Link as LinkIcon, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi, CreateEventInput } from '@/lib/api';

export default function CreateEvent() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<CreateEventInput>({
    title: '',
    category: null,
    host: null,
    date: new Date().toISOString().split('T')[0],
    time: null,
    recurrence: 'none',
    venue: null,
    address: null,
    isOnline: false,
    description: null,
    capacity: null,
    rsvpType: 'open',
    requireRsvp: false,
    waitlistEnabled: false,
    bannerUrl: null,
    visibility: 'public',
    publishStatus: 'draft'
  });

  const [error, setError] = useState('');

  const createMutation = useMutation({
    mutationFn: (status: 'draft' | 'published') => eventsApi.create({ ...formData, publishStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setLocation('/events');
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

  return (
    <AdminLayout 
      title="Create Event"
      action={
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setLocation('/events')}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            onClick={() => createMutation.mutate('draft')}
            disabled={createMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            onClick={() => createMutation.mutate('published')}
            disabled={createMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          >
            Publish Event
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
                <Calendar className="w-4 h-4 text-primary" />
                Event Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground mb-2 block">Event Banner</label>
                <UploadCard
                  label="Upload Banner Image"
                  description="1200x400 recommended for optimal display"
                  icon={ImageIcon}
                  accept="image/*"
                  currentUrl={formData.bannerUrl}
                  onUploaded={(url) => setFormData({ ...formData, bannerUrl: url || null })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-foreground">Event Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder="e.g. Summer Youth Retreat" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Service"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Hosting Ministry</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Youth Ministry"
                    value={formData.host || ''}
                    onChange={e => setFormData({ ...formData, host: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Time</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    value={formData.time || ''}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><MapPin className="w-3 h-3"/> Location / Venue</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder="e.g. Main Sanctuary" 
                    value={formData.venue || ''}
                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1"><LinkIcon className="w-3 h-3"/> Online Link (Optional)</label>
                  <input 
                    type="url" 
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder="https://zoom.us/..." 
                    value={formData.address || ''}
                    onChange={e => setFormData({ ...formData, address: e.target.value, isOnline: !!e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5 border-t border-border pt-6">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea 
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none" 
                  placeholder="Provide details about the event..." 
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Registration & RSVP">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    className="mt-1 text-primary rounded focus:ring-primary" 
                    checked={formData.requireRsvp}
                    onChange={e => setFormData({ ...formData, requireRsvp: e.target.checked })}
                  />
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
                <input 
                  type="number" 
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                  placeholder="Leave blank for unlimited" 
                  value={formData.capacity || ''}
                  onChange={e => setFormData({ ...formData, capacity: e.target.value ? parseInt(e.target.value) : null })}
                />
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
          
          <button type="button" className="w-full py-3 bg-card border border-border rounded-xl shadow-sm text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
            Preview Event Page
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
