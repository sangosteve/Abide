import { AdminLayout } from '@/components/layout/AdminLayout';
import { UploadCard } from '@/components/ui/UploadCard';
import { PreviewPanel } from '@/components/ui/PreviewPanel';
import { Mic2, Video, FileAudio, Image as ImageIcon, Settings } from 'lucide-react';

export default function CreateSermon() {
  return (
    <AdminLayout 
      title="Upload Sermon"
      action={
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm">
            Publish Sermon
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Walking on Water" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Speaker</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>Select Speaker</option>
                    <option>Pastor John Smith</option>
                    <option>Pastor David Wilson</option>
                    <option>Add New Speaker...</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Sermon Series</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <option>None (Standalone)</option>
                    <option>Faith That Overcomes</option>
                    <option>The Gospel of John</option>
                    <option>Create New Series...</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date Delivered</label>
                  <input type="date" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Primary Scripture</label>
                  <input type="text" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Matthew 14:22-33" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Summary / Description</label>
                <textarea className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24 resize-none" placeholder="A brief description of the message..." />
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
                <UploadCard label="Upload Video" description="MP4, MOV (max 2GB)" icon={Video} />
                <div className="mt-2 text-center text-xs text-muted-foreground">or</div>
                <input type="text" className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Paste YouTube / Vimeo URL" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Audio Only (Optional)</label>
                <UploadCard label="Upload Audio" description="MP3, M4A" icon={FileAudio} />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Thumbnail Image</label>
                <UploadCard label="Upload Cover" description="1920x1080 (16:9)" icon={ImageIcon} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PreviewPanel title="Publish Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-1 text-primary rounded focus:ring-primary" defaultChecked />
                  <div>
                    <div className="text-sm font-medium text-foreground">Feature on Homepage</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Show this sermon at the top of the app</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-1 text-primary rounded focus:ring-primary" defaultChecked />
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
                  <input type="datetime-local" className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            </div>
          </PreviewPanel>
        </div>
      </div>
    </AdminLayout>
  );
}
