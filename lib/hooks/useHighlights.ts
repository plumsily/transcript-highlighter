import { useAtom } from "jotai";
import { rangesAtom, isFocusViewAtom } from "../atoms";

const useHighlights = () => {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [isFocusView, setIsFocusView] = useAtom(isFocusViewAtom);

  const addHighlight = (
    start: number,
    end: number,
    content: string,
    note: string
  ) => {
    setRanges((prev) => [...prev, [start, end, content, note]]);
  };

  const deleteHighlight = (index: number) => {
    if (isFocusView) {
      setIsFocusView(false);
    }
    setRanges((prev) => {
      const newRanges = [...prev];
      newRanges.splice(index, 1);
      return newRanges;
    });
  };

  const editHighlight = (
    index: number,
    newRange: [number, number],
    newContent: string,
    newNote: string
  ) => {
    setRanges((prev) => {
      const newRanges = [...prev];
      newRanges[index] = [newRange[0], newRange[1], newContent, newNote];
      return newRanges;
    });
  };

  return {
    addHighlight,
    deleteHighlight,
    editHighlight,
  };
};

export default useHighlights;
