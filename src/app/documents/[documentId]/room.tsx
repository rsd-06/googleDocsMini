"use client";

import { ReactNode } from "react";

import { useParams } from "next/navigation";

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";


export function Room({ children }: { children: ReactNode }) {

    const params = useParams();

    return (
        <LiveblocksProvider publicApiKey={"pk_dev_imiIp7uMDJRqVleIG4HXZgQjJy7zK-SwxbXgAIQppElX0XBwoqTJXarPG037Tnng"}>
            <RoomProvider id={ params.documentId as string }>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}