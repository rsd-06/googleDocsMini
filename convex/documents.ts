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

        const organisationId = ( user.organisation_id ?? undefined ) as string | undefined;
        
        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled Document",
            initialContent: args.initialContent,
            ownerId: user.subject,
            organisationId: organisationId,
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

        const organisationId = ( user.organisation_id ?? undefined ) as string | undefined;

        const isOwner = document.ownerId === user.subject;
        const isOrganisationMember = organisationId && document.organisationId === organisationId;

        if (!isOwner && !isOrganisationMember) {
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

        const organisationId = ( user.organisation_id ?? undefined ) as string | undefined;

        const isOwner = document.ownerId === user.subject;
        const isOrganisationMember = organisationId && document.organisationId === organisationId;

        if (!isOwner && !isOrganisationMember) {
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

        const organisationId = ( user.organisation_id ?? undefined ) as string | undefined;

        //All organisation documents
        if(organisationId){
            return await ctx.db
                .query("documents")
                .withIndex("by_organisation_id", (doc) => doc.eq("organisationId", organisationId))
                .paginate(paginationOpts);
        }

        //Search with organisation documents
        if (search && organisationId) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (doc) => 
                    doc.search("title", search).eq("organisationId", organisationId)
                )
                .paginate(paginationOpts);
        };

        //Search with personal documents
        if (search) {
            return await ctx.db.query("documents")
                .withSearchIndex("search_title", (doc) => doc.search("title", search).eq("ownerId", user.subject)).paginate(paginationOpts);
        };

        //All persoanal documents
        return await ctx.db
            .query("documents")
            .withIndex("by_owner_id", (doc) => doc.eq("ownerId", user.subject))
            .paginate(paginationOpts)
    },
}); 