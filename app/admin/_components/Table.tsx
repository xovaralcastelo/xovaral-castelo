import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
  empty?: string;
  hasRows?: boolean;
}

export function Table({ headers, children, empty = "Nada por aqui ainda.", hasRows = true }: TableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-xv-gray-200/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-xv-gray-50 border-b border-xv-gray-200">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-bold uppercase tracking-wider text-xv-gray-700 px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-xv-gray-200/60">
            {hasRows ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-12 text-center text-sm text-xv-gray-500"
                >
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 text-xv-navy ${className}`}>{children}</td>;
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    draft: "bg-xv-gray-200 text-xv-gray-700",
    archived: "bg-xv-gray-100 text-xv-gray-500",
    pending: "bg-yellow-100 text-yellow-800",
    fulfilled: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const cls = colors[status] ?? "bg-xv-gray-100 text-xv-gray-700";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}>
      {status}
    </span>
  );
}
