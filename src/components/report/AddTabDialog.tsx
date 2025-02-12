"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface AddTabDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  newTabTitle: string;
  setNewTabTitle: (value: string) => void;
  newTabDescription: string;
  setNewTabDescription: (value: string) => void;
  handleAddTab: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AddTabDialog({
  open,
  setOpen,
  newTabTitle,
  setNewTabTitle,
  newTabDescription,
  setNewTabDescription,
  handleAddTab,
}: AddTabDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tab</DialogTitle>
          <DialogDescription>
            Please enter a title and description for the new tab.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddTab} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={newTabTitle}
              onChange={(e) => setNewTabTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={newTabDescription}
              onChange={(e) => setNewTabDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>
            <Button type="submit" className="rounded-md">
              Add Tab
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
