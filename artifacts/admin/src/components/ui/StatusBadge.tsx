export function StatusBadge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'published':
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'draft':
      case 'pending':
      case 'processing':
      case 'upcoming':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'inactive':
      case 'flagged':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()}`}>
      {status}
    </span>
  );
}
