import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";

const convex =new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
secret: process.env.LIVEBLOCS_SECRET_KEY!,
});

export async function POST(request: Request) {

    const { userId, orgId } = await auth();
    /*orgId is Clerk’s verified session state.
    sessionClaims.org_id is just raw token data and may not exist.
    */

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    };

    const user = await currentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    };

    const { room } = await request.json();
    const document = await convex.query(api.documents.getDocumentById, { documentId: room});

    if (!document) {
        return new Response("Document not found", { status: 404 });
    };

    const isOwner = document.ownerId === user.id;
    const isOrganisationMember = !!( document.organisationId && document.organisationId === orgId ); 
    

    if (!isOwner && !isOrganisationMember) {
        return new Response("Forbidden", { status: 403 });
    };

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            avatar: user.imageUrl,
        },
    });
    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();
    
    return new Response(body, { status });
};