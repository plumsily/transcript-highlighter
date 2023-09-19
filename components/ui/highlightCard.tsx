import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai";
import {
  rangesAtom,
  isEditingAtom,
  currentIndexAtom,
  isFocusViewAtom,
  Highlights,
} from "../../lib/atoms";
import useHighlights from "../../lib/hooks/useHighlights";

interface SavedHighlightsProps {
  index: number;
  range: Highlights;
}

const HighlightCard: React.FC<SavedHighlightsProps> = ({ range, index }) => {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const [isFocusView, setIsFocusView] = useAtom(isFocusViewAtom);
  const { deleteHighlight, editHighlight, removeHighlightStyle } =
    useHighlights();

  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<string>("");
  const [showEditing, setShowEditing] = useState(false);

  const handleNotes = () => {
    setShowNotes(!showNotes);
  };

  const handleSaveNotes = () => {
    editHighlight(
      index,
      [range.rangeStart, range.rangeEnd],
      range.content,
      notes,
      range.highlightIndex
    );
    setShowNotes(!showNotes);
  };

  const handleDeleteNotes = () => {
    setNotes("");
    setShowNotes(!showNotes);
  };

  const handleDelete = () => {
    removeHighlightStyle(range.highlightIndex.toString());
    deleteHighlight(index);
    setNotes("");
  };

  // send signal to transcript.tsx to start modifying the selection range on the transcript
  const handleEdit = (event: any) => {
    setIsEditing(true);
    setShowEditing(true);
    setCurrentIndex(index);
  };

  // send signal to transcript.tsx to enter focused view
  const handleFocusClick = () => {
    setIsFocusView(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isEditing) {
      setShowEditing(false);
    }
  }, [isEditing]);

  useEffect(() => {
    if (range.note) {
      setNotes(range.note);
      console.log(notes);
    }
  }, [ranges]);

  return (
    <div
      className={`p-3 border border-gray-200 rounded-lg hover:bg-yellow-100 transition-all flex flex-col gap-2`}
    >
      <div className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger disabled={isFocusView}>
            <Button variant="outline" disabled={isFocusView}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                saved highlight.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          disabled={isFocusView}
          variant="outline"
          onClick={handleEdit}
          className={`${showEditing && "bg-orange-200"}`}
        >
          {showEditing ? "Editing" : "Edit Selection"}
        </Button>
      </div>
      {range.content} <br />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleFocusClick}
          disabled={isFocusView}
        >
          Focus
        </Button>
        {showNotes ? (
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteNotes}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="default" onClick={handleSaveNotes}>
              Save Note
            </Button>
          </div>
        ) : (
          <Button
            variant={notes ? "default" : "outline"}
            onClick={handleNotes}
            disabled={isFocusView}
          >
            {notes ? "View Note" : "Add Note"}
          </Button>
        )}
      </div>
      {showNotes && (
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="border rounded w-full py-2 px-3"
        />
      )}
    </div>
  );
};

export default HighlightCard;
