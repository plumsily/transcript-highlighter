"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HighlightCard from "./ui/highlightCard";

interface SavedHighlightsProps {
  ranges: [number, number, string, string][];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  deleteHighlight: (index: number) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}

const SavedHighlights: React.FC<SavedHighlightsProps> = ({
  ranges,
  setCurrentIndex,
  deleteHighlight,
  setIsEditing,
  isEditing,
}) => {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Saved Highlights</CardTitle>
          <CardDescription>View your saved highlights here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {ranges.length === 0 ? (
              "No Highlights Saved"
            ) : (
              <ul className="flex flex-col gap-2">
                {ranges.map((range, index) => (
                  <li key={index}>
                    <HighlightCard
                      range={range}
                      index={index}
                      setCurrentIndex={setCurrentIndex}
                      deleteHighlight={deleteHighlight}
                      setIsEditing={setIsEditing}
                      isEditing={isEditing}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SavedHighlights;
