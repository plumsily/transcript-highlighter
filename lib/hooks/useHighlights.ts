import { useAtom } from "jotai";
import { rangesAtom, isFocusViewAtom, Highlights } from "../atoms";

const useHighlights = () => {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [isFocusView, setIsFocusView] = useAtom(isFocusViewAtom);

  const addHighlight = (highlight: Highlights) => {
    setRanges((prev) => [...prev, highlight]);
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
    newNote: string,
    highlightIndex: number,
    isEditing?: boolean
  ) => {
    setRanges((prev) => {
      const newRanges = [...prev];
      newRanges[index] = {
        rangeStart: newRange[0],
        rangeEnd: newRange[1],
        content: newContent,
        note: newNote,
        highlightIndex: highlightIndex,
      };
      return newRanges;
    });
    // check if the editing is to edit the text selection or a note
    if (isEditing) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        removeHighlightStyle(highlightIndex.toString());
        const highlightedSpan = document.createElement("mark");
        highlightedSpan.setAttribute(
          "data-highlight-index",
          highlightIndex.toString()
        );

        const selectedRange = range.cloneRange();
        selectedRange.surroundContents(highlightedSpan);
        selection.removeAllRanges();
      }
    }
  };

  const removeHighlightStyle = (highlightIndex: string) => {
    const highlightedMarks = document.querySelectorAll(
      `[data-highlight-index="${highlightIndex}"]`
    );

    // find the corresponding mark element with the matching id and remove the mark
    highlightedMarks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
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
