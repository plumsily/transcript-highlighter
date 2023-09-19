import React from "react";
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

interface DeleteDialogProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <div className="absolute h-screen w-screen flex justify-center items-center">
    //   <div>
    //     <h2 className="">Confirmation</h2>
    //     <p>Are you sure you want to delete this highlight?</p>
    //     <button onClick={onConfirm}>Yes</button>
    //     <button onClick={onClose}>No</button>
    //   </div>
    // </div>
  );
};

export default DeleteDialog;
