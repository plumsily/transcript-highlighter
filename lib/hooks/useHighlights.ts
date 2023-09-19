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
    return ranges.length - 1;
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

  const removeHighlightStyle = (highlightIndex: string) => {
    const highlightedSpans = document.querySelectorAll(
      `[data-highlight-index="${highlightIndex}"]`
    );
    highlightedSpans.forEach((span) => {
      const parent = span.parentNode;
      if (parent) {
        const childNodes = Array.from(span.childNodes);
        childNodes.forEach((node) => {
          parent.insertBefore(node, span);
        });
        parent.removeChild(span);
      }
    });
  };

  return {
    addHighlight,
    deleteHighlight,
    editHighlight,
    removeHighlightStyle,
  };
};

export default useHighlights;
