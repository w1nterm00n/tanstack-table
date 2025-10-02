import { atomWithDefault } from "jotai/utils";  // uses lazy evaluation — the value isn't stored ahead of time; it's computed by a function on first access

export type Row = Record<string, number>;

export const ROWS = 50;
export const COLS = 20;

// genetate the grid of integers
export function makeGrid(rows = ROWS, cols = COLS): Row[] {
  return Array.from({ length: rows }, () => {
    const row: Row = {};
    for (let c = 0; c < cols; c++) row[String(c)] = Math.floor(Math.random() * 100);
    return row;
  });
}

export const gridAtom = atomWithDefault<Row[]>(() => makeGrid());