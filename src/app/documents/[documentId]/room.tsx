"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { FullScreenLoader } from "@/components/fullscreen-loader";
import { toast } from "sonner";

import { getUsers } from "./actions";

type User = { id: string; name: string; avatar: string };

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
            authEndpoint="/api/liveblocks-auth"
            throttle={16}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                );
            }}
            resolveRoomsInfo={() => []}
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
            <RoomProvider id={ params.documentId as string }>
                <ClientSideSuspense fallback={<FullScreenLoader message="Room loading..."/>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}  