"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HighlightCard from "./ui/highlightCard";
import { useAtom } from "jotai";
import { rangesAtom, Highlights } from "../lib/atoms";

const SavedHighlights: React.FC = () => {
  const [ranges, setRanges] = useAtom(rangesAtom);
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Saved Highlights</CardTitle>
          <CardDescription>
            View your saved highlights here. Focus a highlight to enter its
            focused view.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {ranges.length === 0 ? (
              "No Highlights Saved"
            ) : (
              <ul className="flex flex-col gap-2">
                {ranges.map((range, index) => (
                  <li key={index}>
                    <HighlightCard range={range} index={index} />
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
