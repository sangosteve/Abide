import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
}

export function DataTable<T>({ data, columns, keyExtractor }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground bg-background/50 border-b border-border">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 font-medium tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-muted/30 transition-colors">
              {columns.map((col, i) => (
                <td key={i} className="px-6 py-4 whitespace-nowrap text-foreground">
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
