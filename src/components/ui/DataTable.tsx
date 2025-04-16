import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { cn } from "../../utils/helper";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  className?: string;
  pageSize?: number;
}

const DataTable = <T,>({
  data,
  columns,
  className,
  pageSize = 10,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const currentRows = useMemo(() => {
    const rows = table.getFilteredRowModel().rows;
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end);
  }, [pageIndex, pageSize, table.getFilteredRowModel().rows]);

  const totalPages = Math.ceil(
    table.getFilteredRowModel().rows.length / pageSize
  );

  console.log("Current Rows:", currentRows); // Log current rows for debugging

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          setPageIndex(0);
        }}
        placeholder="Search..."
        className="border rounded-md px-3 py-2 w-full md:w-64 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-semibold cursor-pointer select-none text-gray-700 dark:text-gray-200"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {currentRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {pageIndex + 1} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={pageIndex === 0}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setPageIndex((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={pageIndex >= totalPages - 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
