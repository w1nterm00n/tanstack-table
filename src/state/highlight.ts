import { atom } from "jotai";

export type HighlightMode = "div5" | "div7" | "prime" | null;

export const highlightModeAtom = atom<HighlightMode>(null);