"use client";

import React from "react";
import { useMutation } from "convex/react";

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

import { toast } from "sonner";

import { Input } from "./ui/input";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog"; 
import { Button } from "./ui/button";

interface RenameDialogProps {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
};

export const RenameDialog = ( {documentId, initialTitle, children} : RenameDialogProps ) => {
    
    const updateDocumentById = useMutation(api.documents.updateDocumentById);
    const [isUpdating, setIsUpdating] = React.useState(false);
    
    const [title, setTitle] = React.useState(initialTitle);
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsUpdating(true);

        updateDocumentById( {documentId: documentId, title: title.trim() || "Untitled"} )
            .catch((error) => toast.error(`Something went wrong: ${error.message}`))
            .then(() => toast.success("Docment renamed successfully"))
            .finally(() => {
                setIsUpdating(false);
                setOpen(false);
            });
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()} >
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename</DialogTitle>
                        <DialogDescription>
                            Edit the document name 
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document Name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};