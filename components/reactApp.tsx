"use client";

import React, { useEffect, useState } from "react";

import DualPane from "./ui/dualPane";
import SavedHighlights from "./savedHighlights";
import Transcript from "./transcript";
import DeleteDialog from "./ui/deleteDialog";

function Header() {
  return (
    <header className="p-4 mb-5 mx-auto w-full flex justify-center">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
        Transcript Highlighter
      </h1>
    </header>
  );
}

export default function ReactApp() {
  const [ranges, setRanges] = useState<[number, number, string, string][]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addHighlight = (
    start: number,
    end: number,
    content: string,
    note: string
  ) => {
    setRanges([...ranges, [start, end, content, note]]);
  };

  const deleteHighlight = (index: number) => {
    const newRanges = [...ranges];
    newRanges.splice(index, 1);
    setRanges(newRanges);
  };

  const editHighlightRange = (
    index: number,
    newRange: [number, number],
    newContent: string
  ) => {
    const newRanges = [...ranges];
    newRanges[index] = [
      newRange[0],
      newRange[1],
      newContent,
      newRanges[index][3],
    ];
    setRanges(newRanges);
  };

  const transcriptSection = (
    <Transcript
      currentIndex={currentIndex}
      addHighlight={addHighlight}
      editHighlightRange={editHighlightRange}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    />
  );
  const savedSection = (
    <SavedHighlights
      ranges={ranges}
      setCurrentIndex={setCurrentIndex}
      deleteHighlight={deleteHighlight}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    />
  );

  return (
    <main className="relative">
      <Header />
      <DualPane leftChild={transcriptSection} rightChild={savedSection} />
    </main>
  );
}
