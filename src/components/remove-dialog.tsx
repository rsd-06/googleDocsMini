"use client";

import React from "react";
import { useMutation } from "convex/react";

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./ui/alert-dialog";

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
};

export const RemoveDialog = ( {documentId, children} : RemoveDialogProps ) => {
    
    const removeDocumentById = useMutation(api.documents.removeDocumentById);
    const [isRemoving, setIsRemoving] = React.useState(false);
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to remove this document ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        THis action cannot be undone. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={(e) => e.stopPropagation()}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled = {isRemoving}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            removeDocumentById({ documentId: documentId})
                                .finally(() => {
                                    setIsRemoving(false);
                                });  
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};