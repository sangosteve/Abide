import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { List, Plus, Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bibleStudiesApi } from '@/lib/api';

export default function ManageBibleStudy() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [newLessonTitle, setNewLessonTitle] = useState('');

  const { data: study, isLoading, error } = useQuery({
    queryKey: ['bible-studies', id],
    queryFn: () => bibleStudiesApi.get(id!),
    enabled: !!id
  });

  const addLessonMutation = useMutation({
    mutationFn: () =>
      bibleStudiesApi.addLesson(id!, {
        title: newLessonTitle,
        orderIndex: study?.lessons.length ?? 0,
        status: 'draft'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bible-studies', id] });
      setNewLessonTitle('');
    }
  });

  const deleteLessonMutation = useMutation({
    mutationFn: (lessonId: string) => bibleStudiesApi.deleteLesson(id!, lessonId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bible-studies', id] })
  });

  if (error) {
    return (
      <AdminLayout title="Manage Study Series">
        <div className="text-destructive p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
          Failed to load Bible study.
        </div>
      </AdminLayout>
    );
  }

  if (isLoading || !study) {
    return (
      <AdminLayout title="Manage Study Series">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Manage: ${study.title}`}
      action={
        <button
          type="button"
          onClick={() => setLocation('/bible-studies')}
          className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm"
        >
          Back to Series
        </button>
      }
    >
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <List className="w-4 h-4 text-primary" />
            Sessions ({study.lessons.length})
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-6">
            {study.lessons.length === 0 && (
              <p className="text-sm text-muted-foreground">No sessions yet. Add the first one below.</p>
            )}
            {study.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className="p-4 border border-border rounded-lg bg-background flex items-start justify-between group"
              >
                <div>
                  <div className="text-xs font-medium text-primary mb-1">Session {idx + 1}</div>
                  <div className="font-medium text-foreground mb-1">{lesson.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    {lesson.scripture || 'No scripture set'}
                    {lesson.duration ? ` • ${lesson.duration} min` : ''}
                    <StatusBadge status={lesson.status} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteLessonMutation.mutate(lesson.id)}
                  className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="New session title..."
              value={newLessonTitle}
              onChange={e => setNewLessonTitle(e.target.value)}
            />
            <button
              type="button"
              disabled={!newLessonTitle.trim() || addLessonMutation.isPending}
              onClick={() => addLessonMutation.mutate()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Session
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
