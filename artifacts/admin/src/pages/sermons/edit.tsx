import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { Mic2, Video, FileAudio, Image as ImageIcon, Settings, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sermonsApi, UpdateSermonInput } from '@/lib/api';

export default function EditSermon() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: sermon, isLoading, error: loadError } = useQuery({
    queryKey: ['sermons', id],
    queryFn: () => sermonsApi.get(id!),
    enabled: !!id
  });

  const [formData, setFormData] = useState<UpdateSermonInput>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (sermon) {
      const { id: _id, views, createdAt, updatedAt, ...rest } = sermon;
      setFormData(rest);
    }
  }, [sermon]);

  const updateMutation = useMutation({
    mutationFn: (status: 'draft' | 'published') => sermonsApi.update(id!, { ...formData, publishStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sermons'] });
      setLocation('/sermons');
    },
    onError: (err: Error) => setError(err.message)
  });

  if (loadError) {
    return (
      <AdminLayout title="Edit Sermon">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load sermon.
        </div>
      </AdminLayout>
    );
  }

  if (isLoading || !sermon) {
    return (
      <AdminLayout title="Edit Sermon">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Sermon"
      action={
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLocation('/sermons')}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => updateMutation.mutate('draft')}
            disabled={updateMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => updateMutation.mutate('published')}
            disabled={updateMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving...' : 'Publish Sermon'}
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
            <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between items-center">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Mic2 className="w-4 h-4 text-primary" />
                Sermon Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Sermon Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Speaker</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.speaker || ''}
                    onChange={e => setFormData({ ...formData, speaker: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Sermon Series</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.series || ''}
                    onChange={e => setFormData({ ...formData, series: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date Delivered</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Primary Scripture</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.scripture || ''}
                    onChange={e => setFormData({ ...formData, scripture: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Summary / Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none"
                  value={formData.summary || ''}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between items-center">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                Media Assets
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">Video File</label>
                <UploadCard
                  label="Upload Video"
                  description="MP4, MOV (max 2GB)"
                  icon={Video}
                  accept="video/*"
                  currentUrl={formData.videoUrl}
                  onUploaded={(url) => setFormData({ ...formData, videoUrl: url || null, mediaStatus: url ? 'ready' : 'none' })}
                />
                <div className="mt-2 text-center text-xs text-muted-foreground">or</div>
                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Paste YouTube / Vimeo URL"
                  value={formData.videoUrl || ''}
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value, mediaStatus: 'ready' })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Audio Only (Optional)</label>
                <UploadCard
                  label="Upload Audio"
                  description="MP3, M4A"
                  icon={FileAudio}
                  accept="audio/*"
                  currentUrl={formData.audioUrl}
                  onUploaded={(url) => setFormData({ ...formData, audioUrl: url || null })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Thumbnail Image</label>
                <UploadCard
                  label="Upload Cover"
                  description="1920x1080 (16:9)"
                  icon={ImageIcon}
                  accept="image/*"
                  currentUrl={formData.thumbnailUrl}
                  onUploaded={(url) => setFormData({ ...formData, thumbnailUrl: url || null })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Publish Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    className="mt-1 text-primary rounded focus:ring-primary"
                    checked={!!formData.featuredOnHomepage}
                    onChange={e => setFormData({ ...formData, featuredOnHomepage: e.target.checked })}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">Feature on Homepage</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Show this sermon at the top of the app</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    className="mt-1 text-primary rounded focus:ring-primary"
                    checked={!!formData.notifyMembers}
                    onChange={e => setFormData({ ...formData, notifyMembers: e.target.checked })}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">Notify Members</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Send a push notification when published</div>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Advanced Settings
                </h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Publish Date</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.scheduledAt || ''}
                    onChange={e => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AdminLayout>
  );
}
