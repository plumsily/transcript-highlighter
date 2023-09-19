import { atom } from "jotai";

export interface Highlights {
  rangeStart: number; //beginning of text selection range
  rangeEnd: number; //end of text selection range
  content: string; //text selection
  note: string; //user added note
  highlightIndex: number; //corresponding id for highlighted mark element on transcript
}

export const rangesAtom = atom<Highlights[]>([]);
export const isEditingAtom = atom(false);
export const currentIndexAtom = atom<number | null>(null);
export const isFocusViewAtom = atom(false);
export const highlightIndexAtom = atom<number>(0); //unique Id generator for each mark element that is highlighted on transcript
