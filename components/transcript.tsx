"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAtom } from "jotai";
import {
  rangesAtom,
  isEditingAtom,
  currentIndexAtom,
  isFocusViewAtom,
} from "../lib/atoms";
import useHighlights from "../lib/hooks/useHighlights";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { useKeyPress } from "@/lib/hooks/useKeyPress";

const Transcript: React.FC = () => {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [ranges, setRanges] = useAtom(rangesAtom);
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);
  const [currentIndex, setCurrentIndex] = useAtom(currentIndexAtom);
  const [isFocusView, setIsFocusView] = useAtom(isFocusViewAtom);
  const { addHighlight, deleteHighlight, editHighlight } = useHighlights();
  const [currentTranscript, setCurrentTranscript] = useState<string | null>(
    null
  );
  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes] = useState<string>("");
  const [deleteMode, setDeleteMode] = useState(false);

  const handleMouseUp = () => {
    if (!isEditing) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const { startOffset, endOffset } = range;
        if (startOffset !== endOffset) {
          const selectedText = selection.toString();
          addHighlight(startOffset, endOffset, selectedText, "");
        }
      }
    } else {
      const selection = window.getSelection();
      console.log(currentIndex, selection, isEditing);
      if (selection && selection.rangeCount > 0 && currentIndex !== null) {
        const range = selection.getRangeAt(0);
        const { startOffset, endOffset } = range;
        const selectedText = selection.toString();
        const newRange = [startOffset, endOffset];
        editHighlight(
          currentIndex,
          newRange as [number, number],
          selectedText,
          ranges[currentIndex][3]
        );
        setIsEditing(false);
      }
    }
  };

  const resetTranscript = () => {
    setCurrentTranscript(null);
    setIsFocusView(false);
    setNotes("");
  };

  const handleSaveNotes = () => {
    if (currentIndex !== null) {
      console.log(currentIndex, notes);
      editHighlight(
        currentIndex,
        [ranges[currentIndex][0], ranges[currentIndex][1]],
        ranges[currentIndex][2],
        notes
      );
    }
  };

  const isCtrlPressed = useKeyPress("Control");
  const isEscPressed = useKeyPress("Escape");
  const isDelPressed = useKeyPress("Delete");
  const isTabPressed = useKeyPress("Tab");

  useEffect(() => {
    if (isEscPressed) {
      resetTranscript();
      setCurrentIndex(null);
    }
    if (isCtrlPressed) {
      setEditNotes((prev) => !prev);
      if (editNotes) {
        handleSaveNotes();
      }
    }
    if (isDelPressed && currentIndex !== null) {
      setDeleteMode(true);
    }
    if (isTabPressed && currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % ranges.length;
      setCurrentIndex(nextIndex);
    }
  }, [isCtrlPressed, isDelPressed, isEscPressed, isTabPressed]);

  useEffect(() => {
    if (currentIndex !== null && isFocusView && ranges) {
      setCurrentTranscript(ranges[currentIndex][2]);
      console.log(ranges[currentIndex][2]);
      setNotes(ranges[currentIndex][3]);
    }
    if (!isFocusView) {
      resetTranscript();
    }
  }, [currentIndex, isFocusView]);

  const fullTranscript = `Results for the three months ended December 31, 2022: Total revenue in the fourth quarter was $2.2 billion, an increase of 11.2% compared to the fourth quarter of 2021. The increase in total revenue was driven by a 5.6% increase in comparable restaurant sales and new restaurant openings. Our in-restaurant sales increased 17.5% in the three months ended December 31, 2022, as compared to the three months ended December 31, 2021, while digital sales represented 37.4% of total food and beverage revenue. We opened 100 new restaurants during the fourth quarter with 90 locations including a Chipotlane. These formats continue to perform well and are helping enhance guest access and convenience, as well as increase new restaurant sales, margins, and returns. Food, beverage and packaging costs in the fourth quarter were 29.3% of total revenue, a decrease of 230 basis points compared to the fourth quarter of 2021. Food costs benefited from menu price increases and, to a lesser extent, lower avocado prices. These benefits were partially offset by inflation across the menu primarily due to higher costs for dairy and tortillas. Restaurant level operating margin was 24.0%, an increase from 20.2% in the fourth quarter of 2021. The improvement was primarily due to the benefit of sales leverage and, to a lesser extent, lower delivery fees associated with a lower volume of delivery transactions, partially offset by wage inflation and higher food costs. General and administrative expenses for the fourth quarter were $135.1 million on a GAAP basis, or $129.4 million2 on a non-GAAP basis, excluding $3.7 million related to certain legal proceedings, $1.1 million for a COVID-19 related modification to our 2018 performance shares made in December 2020, and $0.9 million related to corporate restructuring. General and administrative expenses for the fourth quarter of 2022 also include $118.9 million of underlying general and administrative expenses, $18.3 million of non-cash stock compensation and an $8.5 million benefit from lower performance-based bonus accruals. The GAAP effective income tax rate was 26.3% in the fourth quarter of 2022, compared to 20.3% in the fourth quarter of 2021. The increase in the tax rate was primarily due to lower excess tax benefits from equity vesting and exercises, and a net increase in uncertain tax position reserves in 2022 compared to 2021. On a non-GAAP basis, the 2022 fourth quarter effective income tax rate was 25.1%2. Net income for the fourth quarter of 2022 was $223.7 million, or $8.02 per diluted share, compared to $133.5 million, or $4.69 per diluted share, in the fourth quarter of 2021. Excluding the after-tax impact of expenses related to certain legal proceedings, the 2018 performance share COVID-19 related modification, and corporate restructuring, adjusted net income for the fourth quarter 2022 was $231.4 million2 and adjusted diluted earnings per share was $8.292. During the fourth quarter, our Board of Directors approved the investment of up to an additional $200 million, exclusive of commissions, to repurchase shares of our common stock, subject to market conditions. Including this repurchase authorization, $413.9 million was available as of December 31, 2022. The repurchase authorization may be modified, suspended, or discontinued at any time. We repurchased $198.9 million of stock at an average price per share of $1,486.74 during the fourth quarter.`;

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Transcript</CardTitle>
          <CardDescription>
            <p>Select any piece of text to automatically save highlights.</p>
            <p>Press Esc to exit focus view.</p>
            <p>
              Press Ctrl to enter or exit note editing mode (exiting will save
              note).
            </p>
            <p>Press Del to delete the current highlight.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={transcriptRef} onMouseUp={handleMouseUp}>
            {currentTranscript || fullTranscript}
            {isFocusView && currentIndex !== null && (
              <div className="flex flex-col">
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                  <CardTitle>Notes:</CardTitle>
                  <AlertDialog open={deleteMode}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your note.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteHighlight(currentIndex);
                            setDeleteMode(false);
                            resetTranscript();
                            setCurrentIndex(null);
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {currentIndex !== null && !isEditing && ranges ? (
                    <>
                      <Textarea
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                        }}
                        rows={4}
                        className={`${
                          !editNotes && "hidden"
                        } border rounded w-full py-2 px-3`}
                      />

                      <div className={`${editNotes && "hidden"}`}>{notes}</div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div></div>
                </div>
              </div>
            )}
            {/* <p>Results for the three months ended December 31, 2022:</p>

            <p>
              Total revenue in the fourth quarter was $2.2 billion, an increase
              of 11.2% compared to the fourth quarter of 2021. The increase in
              total revenue was driven by a 5.6% increase in comparable
              restaurant sales and new restaurant openings. Our in-restaurant
              sales increased 17.5% in the three months ended December 31, 2022,
              as compared to the three months ended December 31, 2021, while
              digital sales represented 37.4% of total food and beverage
              revenue.
            </p>

            <p>
              We opened 100 new restaurants during the fourth quarter with 90
              locations including a Chipotlane. These formats continue to
              perform well and are helping enhance guest access and convenience,
              as well as increase new restaurant sales, margins, and returns.
            </p>

            <p>
              Food, beverage and packaging costs in the fourth quarter were
              29.3% of total revenue, a decrease of 230 basis points compared to
              the fourth quarter of 2021. Food costs benefited from menu price
              increases and, to a lesser extent, lower avocado prices. These
              benefits were partially offset by inflation across the menu
              primarily due to higher costs for dairy and tortillas.
            </p>

            <p>
              Restaurant level operating margin was 24.0%, an increase from
              20.2% in the fourth quarter of 2021. The improvement was primarily
              due to the benefit of sales leverage and, to a lesser extent,
              lower delivery fees associated with a lower volume of delivery
              transactions, partially offset by wage inflation and higher food
              costs.
            </p>

            <p>
              General and administrative expenses for the fourth quarter were
              $135.1 million on a GAAP basis, or $129.4 million2 on a non-GAAP
              basis, excluding $3.7 million related to certain legal
              proceedings, $1.1 million for a COVID-19 related modification to
              our 2018 performance shares made in December 2020, and $0.9
              million related to corporate restructuring. General and
              administrative expenses for the fourth quarter of 2022 also
              include $118.9 million of underlying general and administrative
              expenses, $18.3 million of non-cash stock compensation and an $8.5
              million benefit from lower performance-based bonus accruals.
            </p>

            <p>
              The GAAP effective income tax rate was 26.3% in the fourth quarter
              of 2022, compared to 20.3% in the fourth quarter of 2021. The
              increase in the tax rate was primarily due to lower excess tax
              benefits from equity vesting and exercises, and a net increase in
              uncertain tax position reserves in 2022 compared to 2021. On a
              non-GAAP basis, the 2022 fourth quarter effective income tax rate
              was 25.1%2.
            </p>

            <p>
              Net income for the fourth quarter of 2022 was $223.7 million, or
              $8.02 per diluted share, compared to $133.5 million, or $4.69 per
              diluted share, in the fourth quarter of 2021. Excluding the
              after-tax impact of expenses related to certain legal proceedings,
              the 2018 performance share COVID-19 related modification, and
              corporate restructuring, adjusted net income for the fourth
              quarter 2022 was $231.4 million2 and adjusted diluted earnings per
              share was $8.292.
            </p>

            <p>
              During the fourth quarter, our Board of Directors approved the
              investment of up to an additional $200 million, exclusive of
              commissions, to repurchase shares of our common stock, subject to
              market conditions. Including this repurchase authorization, $413.9
              million was available as of December 31, 2022. The repurchase
              authorization may be modified, suspended, or discontinued at any
              time. We repurchased $198.9 million of stock at an average price
              per share of $1,486.74 during the fourth quarter.
            </p> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Transcript;
