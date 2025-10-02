import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ControlPanel } from "./ControlPanel";
import { useAtom } from "jotai";
import { gridAtom, COLS, type Row } from "../state/grid";
import { highlightModeAtom } from "../state/highlight";


function isPrime(n: number) {
  if (n < 2) return false;
  for (let p = 2; p * p <= n; p++) {
    if (n % p === 0) return false;
  }
  return true;
}

export function MainTable() {
  const [data] = useAtom(gridAtom);
  const [mode] = useAtom(highlightModeAtom);


  const columns = useMemo<ColumnDef<Row>[]>(() => { // the value returned by useMemo is an array of ColumnDef<Row> objects
    return Array.from({ length: COLS }, (_, i) => ({  // creating the array of descriptions for TanStack Table columns 
      accessorKey: String(i),
      cell: info => info.getValue<number>(),
    }));
  }, []);

  const table = useReactTable({   // creating instance of table, configuration
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    autoResetPageIndex: false,
  });


  const shouldHighlight = (v: number) => {
    if (v === 0) return false;
    if (mode === "div5") return v % 5 === 0;
    if (mode === "div7") return v % 7 === 0;
    if (mode === "prime") return isPrime(v);
    return false;
  };

  return (
    <div>
      <ControlPanel />

      <div className="paginationPanel">
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          « First page
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          ‹ Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} from {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next ›
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last page »
        </button>
      </div>

      <table className="tableWrapper">
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                const value = cell.getValue<number>();
                const hl = shouldHighlight(value);
                return (
                  <td
                    key={cell.id}
                    className={`tableCell${hl ? " hl" : ""}`}
                    style={hl ? { background: "#ffbfbf", fontWeight: 600 } : undefined}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
