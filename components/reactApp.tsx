"use client";

import React from "react";
import { Provider } from "jotai";
import DualPane from "./ui/dualPane";
import SavedHighlights from "./savedHighlights";
import Transcript from "./transcript";

function Header() {
  return (
    <header className="p-4 mb-5">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Transcript Highlighter
      </h1>
    </header>
  );
}

export default function ReactApp() {
  const transcriptSection = <Transcript />;
  const savedSection = <SavedHighlights />;

  return (
    <Provider>
      <main className="relative">
        <Header />
        <DualPane leftChild={transcriptSection} rightChild={savedSection} />
      </main>
    </Provider>
  );
}
