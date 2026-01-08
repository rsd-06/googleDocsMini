"use client";

import { useRouter } from "next/router";
import { useMutation } from "convex/react";
import { useState } from "react";

import { api } from "../../../convex/_generated/api";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

import { templates } from "@/constants/templates";

export const TemplatesGallery = () => {
    
    const router = useRouter();
    const createDocument = useMutation(api.documents.createDocument);
    const [isCreating, setIsCreating] = useState(false);

    const onTemplateSelect = async (title: string, initialContent: string) => {
        setIsCreating(true);

        try{
            const documentId = await createDocument({ title, initialContent });
            router.push(`/documents/${documentId}`);
        } catch (error) {
            console.error("Error creating document;", error);
            alert("There was an error creating the document. Please try again.");
        } finally {
            setIsCreating(false);
        };
    };
    
    return (
        <div className="bg-[#F1F3F4]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="font-medium">
                    Start a new document
                </h3>
                <Carousel>
                    <CarouselContent className="-ml-4">
                        {templates.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                            >
                                <div
                                    className={cn(
                                        "aspect-[3/4] flex flex-col gap-y-2.5",
                                        isCreating && "pointer-events-none opacity-50"
                                    )}
                                >
                                    <button
                                        disabled={isCreating}
                                        onClick={() => onTemplateSelect(template.label, "")}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        className="size-full flex flex-col items-center justify-center gap-y-4 bg-white rounded-sm border hover:border-blue-500 hover:bg-blue-50 transition"
                                    />
                                    <p className="text-sm font-medium truncate">
                                        {template.label}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};