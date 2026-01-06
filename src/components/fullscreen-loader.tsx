import { LoaderIcon } from "lucide-react";

interface FullScreenLoaderProps {
    message?: string;
};

export const FullScreenLoader = ({ message } : FullScreenLoaderProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <LoaderIcon
                className="size-6 text-muted-foreground animate-spin"
            />
            { message && 
                <p className="text-sm text-muted-foreground mt-2">{message}</p>
            }
        </div>
    );
};