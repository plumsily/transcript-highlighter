import { useAtom } from "jotai";
import {
  rangesAtom,
  isFocusViewAtom,
  highlightIndexAtom,
  Highlights,
} from "../atoms";

const useHighlights = () => {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [isFocusView, setIsFocusView] = useAtom(isFocusViewAtom);
  // const [highlightIndex, setHighlightIndex] = useAtom(highlightIndexAtom);

  const addHighlight = (highlight: Highlights) => {
    setRanges((prev) => [...prev, highlight]);
  };
  // const addHighlight = (
  //   start: number,
  //   end: number,
  //   content: string,
  //   note: string,
  //   highlightIndex: number
  // ) => {
  //   setRanges((prev) => [...prev, [start, end, content, note, highlightIndex]]);
  //   return ranges.length - 1;
  // };

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
      // newRanges[index] = [
      //   newRange[0],
      //   newRange[1],
      //   newContent,
      //   newNote,
      //   highlightIndex,
      // ];
      return newRanges;
    });
    if (isEditing) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        removeHighlightStyle(highlightIndex.toString());
        // setRanges((prev) => {
        //   const newRanges = [...prev];
        //   newRanges[index] = [
        //     newRange[0],
        //     newRange[1],
        //     newContent,
        //     newNote,
        //     highlightIndex,
        //   ];
        //   return newRanges;
        // });
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
    const highlightedSpans = document.querySelectorAll(
      `[data-highlight-index="${highlightIndex}"]`
    );

    highlightedSpans.forEach((span) => {
      const parent = span.parentNode;
      if (parent) {
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
        // const childNodes = Array.from(span.childNodes);
        // childNodes.forEach((node) => {
        //   parent.insertBefore(node, span);
        // });
        // parent.removeChild(span);
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
