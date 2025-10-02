import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ControlPanel } from "./ControlPanel";
  
  type Row = { [key: string]: number };
  
  const ROWS = 50; // 50 строк
  const COLS = 20; // 20 колонок

  export function MainTable() {
    const data = useMemo<Row[]>(() => {
        return Array.from({ length: ROWS }, (_, r) => {
          const row: Row = {};
          for (let c = 0; c < COLS; c++) row[String(c)] = Math.floor(Math.random() * 100);
          return row;
        });
      }, []);
    
    // 20 колонок, без заголовков
    const columns = useMemo<ColumnDef<Row>[]>(() => {
        return Array.from({ length: COLS }, (_, i) => ({
          accessorKey: String(i),
          cell: info => info.getValue<number>(),
        }));
      }, []);
  
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
          pagination: { pageIndex: 0, pageSize: 20 }, // 20 строк на страницу
        },
    });
  
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
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="tableCell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      );
  }
  