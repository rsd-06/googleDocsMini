"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margin";

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { FullScreenLoader } from "@/components/fullscreen-loader";
import { toast } from "sonner";

import { getUsers,getDocuments } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

type User = { id: string; name: string; avatar: string, color: string };

export function Room({ children }: { children: ReactNode }) {

    const params = useParams();

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useMemo (
        () => async () => {
            try {
                const usersList = await getUsers();
                setUsers(usersList);
            } catch {
                toast.error("Failed to fetch users");
            }
        },
        [],
    );

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]
    );

    return (
        <LiveblocksProvider 
            authEndpoint={
                async () => {
                    const endpoint = "/api/liveblocks-auth";
                    const room = params.documentId as string;

                    const response = await fetch(endpoint, {
                        method: "POST",
                        body: JSON.stringify({ room }),
                    });

                    return await response.json();
                }
            }
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                );
            }}
            resolveRoomsInfo={
                async ({ roomIds }) => {
                    const documents = await getDocuments(roomIds as Id<"documents">[]);

                    return documents.map((document) => ({
                        id: document.id,
                        name: document.name,
                    }));
                }
            }
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users;

                if (text) {
                    filteredUsers = users.filter((user) => 
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                };

                return filteredUsers.map((user) => user.id);    
            }}
        >
            <RoomProvider 
                id={ params.documentId as string }
                initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}
            >
                <ClientSideSuspense fallback={<FullScreenLoader message="Room loading..."/>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}  