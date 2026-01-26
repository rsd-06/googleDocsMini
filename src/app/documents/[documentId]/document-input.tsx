import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { toast } from "sonner";

import React, { useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useStatus } from "@liveblocks/react";

import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { LoaderIcon } from "lucide-react";

interface DocumentProps {
    title: string,
    documentId: Id<"documents">
}

export const DocumentInput = ({ title, documentId } : DocumentProps) => {
    const status = useStatus();
    
    const [value, setValue] = useState(title);
    const [isPending, setIsPending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const mutate = useMutation(api.documents.updateDocumentById);

    const debouncedUpdate = useDebounce((newValue: string) => {

        if (newValue === title) return;

        setIsPending(true);

        mutate({ documentId: documentId, title: newValue })
            .then(() => toast.success("Document updated"))
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsPending(false));
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedUpdate(newValue);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsPending(true);

    mutate({ documentId: documentId, title: value })
        .then(() => {
            toast.success("Document updated");
            setIsEditing(false);
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsPending(false));
    };

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";

    return (
        <div className="flex items-center gap-2">
            {
                isEditing ? (
                    <form
                        onSubmit={handleOnSubmit}
                        className="relative w-fit max-w=[50ch]"
                    >
                        <span className="invisible whitespace-pre px-1.5 text-lg">
                            {value || " "}
                        </span>
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={handleOnChange}
                            onBlur={() => setIsEditing(false)}
                            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                        />
                    </form>
                ) : (
                    <span
                        onClick={() => {
                            setIsEditing(true);
                            setTimeout(() => {
                                inputRef.current?.focus(); 

                            }, 0);
                        }}
                        className="text-lg px-1.5 cursor-pointer truncate">
                        {title}
                    </span>
                )
            }
            {
                showError && <BsCloudSlash className="size-4" />
            }
            {
                !showError && !showLoader && <BsCloudCheck className="size-4" />
            }
            {
                showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
            }
        </div>
    );
};