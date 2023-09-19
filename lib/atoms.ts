import { atom } from "jotai";

export const rangesAtom = atom<[number, number, string, string][]>([]);
export const isEditingAtom = atom(false);
export const currentIndexAtom = atom<number | null>(null);
export const isFocusViewAtom = atom(false);
