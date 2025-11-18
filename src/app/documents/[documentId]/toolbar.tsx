"use client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheck2Icon, UnderlineIcon, Undo2Icon } from "lucide-react";

import { useEditorStore } from "@/app/store/use-editor-store";

interface ToolBarButtonProps {
    onClick : () => void;
    isActive? : boolean;
    icon : LucideIcon
};

const ToolBarButton = ( {onClick, isActive, icon : Icon} : ToolBarButtonProps ) => {
    return (
        <>
            <button 
                onClick={onClick}
                className={cn(
                    "text-sm h-7 min-w-7 flex items-center rounded-sm hover:bg-neutral-200/80 cursor-pointer",
                    isActive && "bg-neutral-200/80"
                )}
                //cn is used for conditional class names of tailwind (for dynamic classNames of tailwind).
            >
                <Icon className="size-4"/>
            </button>
        </>
    )
};


export const ToolBar = () => {

    const { editor } = useEditorStore();

    interface ToolBarItem extends ToolBarButtonProps {
        label : string;
    };

    // Array of sections, each section is an array of ToolBarItems; Each section can be mapped to a group of buttons in the toolbar, for eg; bold, itailic, underline can be one section.
    // This way we can easily add more sections and buttons to the toolbar.
    // Each section can be separated by a divider if needed.
    // This structure allows for easy scalability and organization of toolbar items.
    // We can also add more properties to ToolBarItem interface if needed, like tooltip, shortcut key, etc.

    const sections: ToolBarItem [][] = [
        
        [ //Section 1
            { 
                label: "Undo", 
                icon: Undo2Icon, 
                onClick: () => {
                    editor?.commands.undo();
                }, 
                isActive: false
            },
            {
                label: "Redo", 
                icon: Redo2Icon, 
                onClick: () => {
                    editor?.commands.redo();
                }, 
                isActive: false
            },
            {
                label: "Print", 
                icon: PrinterIcon, 
                onClick: () => {
                    window.print();
                }, 
                isActive: false
            },
            {
                label: "Spell Check", 
                icon: SpellCheck2Icon, 
                onClick: () => {
                    if (!editor) return;
                    const dom = editor.view.dom;
                    const isEnabled = dom.getAttribute("spellcheck") === "true";
                    dom.setAttribute("spellcheck", (!isEnabled).toString());
                }, 
                isActive: false
            },
        ],

        [ //Section 2
           {
                label: "Bold", 
                icon: BoldIcon, 
                onClick: () => {
                    editor?.chain().focus().toggleBold().run();
                }, 
                isActive: editor?.isActive("bold") || false
            },
            {
                label: "Italic", 
                icon: ItalicIcon, 
                onClick: () => {
                    editor?.chain().focus().toggleItalic().run();
                }, 
                isActive: editor?.isActive("italic") || false
            },
            {
                label: "Underline", 
                icon: UnderlineIcon, 
                onClick: () => {
                    editor?.chain().focus().toggleUnderline().run();
                }, 
                isActive: editor?.isActive("underline") || false
            }
        ],

        [ //Section 3
            {
                label: "Comment", 
                icon: MessageSquarePlusIcon, 
                onClick: () => {
                    // Placeholder for comment functionality
                    console.log("Add Comment Clicked");
                }, 
                isActive: false
            },
            {
                label: "List Todo", 
                icon: ListTodoIcon, 
                onClick: () => {
                    editor?.chain().focus().toggleTaskList().run();
                }, 
                isActive: editor?.isActive("taskList") || false
            },
            {
                label: "Remove Formatting ", 
                icon: RemoveFormattingIcon, 
                onClick: () => {
                    editor?.chain().focus().unsetAllMarks().run();
                }, 
                isActive: false
            },
        ]
    ];
    

    return ( 
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] shadow flex items-center gap-x-0.5 border border-[#C7C7C7] min-h-[40px] overflow-x-auto print:hidden">
           {
                sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex items-center">
                        {section.map((toolBarItem) => (
                            <ToolBarButton 
                                key={toolBarItem.label}
                                {...toolBarItem}
                            />
                        ))}

                        {/* Render separator only if it's NOT the last section */}
                        {sectionIndex < sections.length - 1 && (
                        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />
                        )}
                    </div>
                ))
        }
        </div>
    );
};   
