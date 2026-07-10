import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { BookOpen, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bibleStudiesApi, BibleStudy, UpdateBibleStudyInput } from '@/lib/api';

function toUpdateInput(study: BibleStudy): UpdateBibleStudyInput {
  return {
    title: study.title,
    series: study.series,
    leader: study.leader,
    studyType: study.studyType,
    description: study.description,
    startDate: study.startDate,
    endDate: study.endDate,
    lessonCount: study.lessonCount,
    visibility: study.visibility,
    status: study.status,
    coverImageUrl: study.coverImageUrl,
    participants: study.participants,
    progress: study.progress
  };
}

export default function EditBibleStudy() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: study, isLoading, error: loadError } = useQuery({
    queryKey: ['bible-studies', id],
    queryFn: () => bibleStudiesApi.get(id!),
    enabled: !!id
  });

  const [formData, setFormData] = useState<UpdateBibleStudyInput>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (study) {
      setFormData(toUpdateInput(study));
    }
  }, [study]);

  const updateMutation = useMutation({
    mutationFn: (status: 'draft' | 'active') => bibleStudiesApi.update(id!, { ...formData, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bible-studies'] });
      setLocation('/bible-studies');
    },
    onError: (err: Error) => setError(err.message)
  });

  if (loadError) {
    return (
      <AdminLayout title="Edit Study Series">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load Bible study.
        </div>
      </AdminLayout>
    );
  }

  if (isLoading || !study) {
    return (
      <AdminLayout title="Edit Study Series">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Study Series"
      action={
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocation('/bible-studies')}
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
            onClick={() => updateMutation.mutate('active')}
            disabled={updateMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving...' : 'Publish Series'}
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
                <BookOpen className="w-4 h-4 text-primary" />
                Study Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Series Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Teacher / Leader</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.leader || ''}
                    onChange={e => setFormData({ ...formData, leader: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Study Type</label>
                  <select
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.studyType || 'in_person'}
                    onChange={e => setFormData({ ...formData, studyType: e.target.value as UpdateBibleStudyInput['studyType'] })}
                  >
                    <option value="in_person">In Person</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none"
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground mb-2 block">Cover Artwork</label>
                <UploadCard label="Upload Series Cover" description="1920x1080 recommended, max 5MB" icon={ImageIcon} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Series Settings">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Visibility</h4>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    className="text-primary focus:ring-primary"
                    checked={formData.visibility === 'public'}
                    onChange={() => setFormData({ ...formData, visibility: 'public' })}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">Public</div>
                    <div className="text-xs text-muted-foreground">Available to all members</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    className="text-primary focus:ring-primary"
                    checked={formData.visibility === 'private'}
                    onChange={() => setFormData({ ...formData, visibility: 'private' })}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">Private Group</div>
                    <div className="text-xs text-muted-foreground">Invite only</div>
                  </div>
                </label>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Schedule</h4>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    value={formData.startDate || ''}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
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
