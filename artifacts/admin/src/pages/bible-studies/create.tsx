import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { BookOpen, List, Wand2, Image as ImageIcon } from 'lucide-react';

export default function CreateBibleStudy() {
  return (
    <AdminLayout 
      title="Create Study Series"
      action={
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm">
            Publish Series
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. The Gospel of John: Light in the Darkness" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Teacher / Leader</label>
                  <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Study Type</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>Video Series</option>
                    <option>Reading Plan</option>
                    <option>Discussion Guide</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none" placeholder="What will participants learn in this series?" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground mb-2 block">Cover Artwork</label>
                <UploadCard label="Upload Series Cover" description="1920x1080 recommended, max 5MB" icon={ImageIcon} />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/50 flex justify-between items-center">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                Lesson Builder
              </h2>
              <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                <Wand2 className="w-3 h-3" /> Auto-generate Outline
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="p-4 border border-border rounded-lg bg-background flex items-start justify-between group">
                  <div>
                    <div className="text-xs font-medium text-primary mb-1">Session 1</div>
                    <div className="font-medium text-foreground mb-1">Introduction to the Word</div>
                    <div className="text-xs text-muted-foreground">John 1:1-18 • 15 min video</div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">Edit</button>
                </div>
                <div className="p-4 border border-border rounded-lg bg-background flex items-start justify-between group">
                  <div>
                    <div className="text-xs font-medium text-primary mb-1">Session 2</div>
                    <div className="font-medium text-foreground mb-1">The First Disciples</div>
                    <div className="text-xs text-muted-foreground">John 1:35-51 • 18 min video</div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">Edit</button>
                </div>
              </div>
              
              <button className="w-full py-3 border-2 border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                <List className="w-4 h-4" /> Add Next Session
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Series Settings">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Visibility</h4>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="visibility" className="text-primary focus:ring-primary" defaultChecked />
                  <div>
                    <div className="text-sm font-medium text-foreground">Public</div>
                    <div className="text-xs text-muted-foreground">Available to all members</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="radio" name="visibility" className="text-primary focus:ring-primary" />
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
                  <input type="date" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>
          </PreviewPanel>
          
          <button className="w-full py-4 bg-card border border-border rounded-xl shadow-sm text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <span>Generate Study Guide PDF</span>
            <span className="text-xs text-muted-foreground font-normal">Creates a printable booklet from sessions</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
