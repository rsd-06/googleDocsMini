import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const createDocument = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        };
        
        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            initialContent: args.initialContent,
            ownerId: user.subject,
        });

        return documentId;

    }
});

export const removeDocumentById = mutation({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        };

        const document = await ctx.db.get(args.documentId);
    
        if (!document) {
            throw new ConvexError("Document not found");
        };

        const isOwner = document.ownerId === user.subject;

        if (!isOwner) {
            throw new ConvexError("Forbidden");
        };

        return await ctx.db.delete(args.documentId);
    },
});

export const updateDocumentById = mutation({
    args: {
        documentId: v.id("documents"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        };

        const document = await ctx.db.get(args.documentId);
    
        if (!document) {
            throw new ConvexError("Document not found");
        };

        const isOwner = document.ownerId === user.subject;

        if (!isOwner) {
            throw new ConvexError("Forbidden");
        };

        return await ctx.db.patch(args.documentId, { title: args.title });
    },
});

export const getDocuments = query({
    args : { 
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string())
    },
    
    handler: async (ctx, {search, paginationOpts}) => {

        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthoized");
        };

        if (search) {
            return await ctx.db.query("documents")
                .withSearchIndex("search_title", (doc) => doc.search("title", search).eq("ownerId", user.subject)).paginate(paginationOpts);
        };

        return await ctx.db
            .query("documents")
            .withIndex("by_owner_id", (doc) => doc.eq("ownerId", user.subject))
            .paginate(paginationOpts)
    },
}); 