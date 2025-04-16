import { ColumnDef } from "@tanstack/react-table";

export function generateColumnsFromData<T extends Record<string, any>>(
  exclude: string[] = []
): ColumnDef<T>[] {
  console.log("generateColumnsFromData called"); // Check if this is logged
  return Object.keys({} as T)
    .filter((key) => !exclude.includes(key))
    .map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }: any) => {
        const value = row.original[key];
        console.log(row);

        return typeof value === "string" || typeof value === "number"
          ? value
          : JSON.stringify(value);
      },
    })) as ColumnDef<T>[];
}
