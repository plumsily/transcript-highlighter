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

interface SavedHighlightsProps {
  range: [number, number, string, string];
  index: number;
  deleteHighlight: (index: number) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isEditing: boolean;
}

const HighlightCard: React.FC<SavedHighlightsProps> = ({
  range,
  index,
  setCurrentIndex,
  deleteHighlight,
  setIsEditing,
  isEditing,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<string>("");

  const handleNotes = () => {
    setShowNotes(!showNotes);
  };

  const handleDeleteNotes = () => {
    setNotes("");
    setShowNotes(!showNotes);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentIndex(index);
  };

  return (
    <div
      className={`p-3 border border-gray-200 rounded-lg hover:bg-yellow-100 hover:cursor-pointer transition-all flex flex-col gap-2 ${
        notes && "bg-green-100"
      }`}
    >
      <div className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="outline">Delete</Button>
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
              <AlertDialogAction onClick={() => deleteHighlight(index)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="outline"
          onClick={handleEdit}
          className={`${isEditing && "bg-orange-200"}`}
        >
          {isEditing ? "Editing" : "Edit Selection"}
        </Button>
      </div>
      {range[2]} <br />
      <div className="flex justify-end">
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
            <Button variant="default" onClick={handleNotes}>
              Save Note
            </Button>
          </div>
        ) : (
          <Button variant="default" onClick={handleNotes}>
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
