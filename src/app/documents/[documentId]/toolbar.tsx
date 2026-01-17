"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, CirclePicker, SketchPicker } from "react-color";

import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapse, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheck2Icon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react"

import { useEditorStore } from "@/app/store/use-editor-store";
import { useEditor } from "@tiptap/react";

//Defining little complex components such as FontFamilySelector;
const FontFamilySelector = () => {
    
    const { editor } = useEditorStore();

    const fontFamilies = [
        { name: "Arial", value: "Arial, sans-serif" },
        { name: "Georgia", value: "Georgia, serif" },
        { name: "Times New Roman", value: "'Times New Roman', serif" },
        { name: "Courier New", value: "'Courier New', monospace" },
        { name: "Verdana", value: "Verdana, sans-serif" },
    ];

    /*DropdownMenu from our ui library is used to create a dropdown menu for selecting font families.

    DropdownMenuTrigger :
        This defines what element opens the dropdown.
        It wraps any element (button, div, icon, etc.) that should toggle the menu open/close.
        Without it, clicking the button wouldn’t open the dropdown.

        Why asChild?
        asChild means:
            “Don’t render a <button> inside another <button>.”
            Instead, use my button as the trigger element.
            Without asChild, Radix would wrap your element like this:
                <button> <-- Radix adds its own button
                    <button>My real button</button> <-- invalid HTML!!
                </button>
            
            Browsers break when you put <button> inside <button>.
            So asChild tells Radix:
                👉 “Use the element I give you directly as the trigger.”

    DropdownMenuContent :
        This is the actual dropdown menu that appears when you click the trigger.
        It contains the list of font family options.

    DropdownMenuItem :
        Each item inside the DropdownMenuContent.
        Represents a selectable option (a font family in this case).

    What is <ChevronDownIcon /> ?
        It’s just an SVG icon shaped like a down arrow: ▼
        Used to show that the button is a dropdown.
    */

    /*editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
    
        Break it down:

            editor?.getAttributes("textStyle")
            Gets all attributes of the textStyle mark (like fontSize, color, fontFamily).

            .fontFamily
            Gets the current font family applied to the selected text.

            === value
            Checks if this dropdown item is the currently selected font.

            && "bg-neutral-200/80"
            If true → return "bg-neutral-200/80" (a light gray background)
            If false → return false (ignored by cn())

            So it highlights the active font family in the dropdown.
    */

    /*What is truncate class ? :
        truncate does:
            If text is too long → it cuts it off
            Replaces overflow with …
            Makes button text neat, prevents layout breaks
    */
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    fontFamilies.map(({ name, value }) => (
                        <button
                            key = {name}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                            )}
                            style={ { fontFamily: value } }
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        >
                            <span className="text-sm">{name}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const HeadingLevelSelector = () => {

    const { editor } = useEditorStore();

    const headingLevels = [
        { label : "Normal Text", level : 0, fontSize : "16px"},
        { label : "Heading 1", level : 1, fontSize : "32px"},
        { label : "Heading 2", level : 2, fontSize : "24px"},
        { label : "Heading 3", level : 3, fontSize : "18px"},
        { label : "Heading 4", level : 4, fontSize : "16px"}
    ];

    /*editor?.isActive("heading", { level : level })
        Break it down:
            editor?.isActive("heading", { level : level })
            Checks if the current selection is a heading of the specified level.

            isActive(typeName):
                For marks (bold, italic), it checks if the style is active.
                For nodes (paragraph, heading), it checks the current node type.

            In TipTap Every heading has a level:
                1 → <h1>
                2 → <h2>
                3 → <h3>
                4 → <h4>

            So TipTap’s heading extension defines nodes like:
                {
                    type: 'heading',
                    attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 }
                }
            
            Here, we check if the current selection is a heading with the specific level.
            It returns true if the selection is a heading of that level, false otherwise.

            🔥 So when you call:
                editor.isActive("heading", { level: 2 })

                It checks:
                    “Is the current selection a <h2>?”
                If yes → returns true
                If no → returns false

            🧩 Why not just use editor.isActive("heading") alone?
                s you if heading exists, not which level.

            So, 
                editor.isActive("heading") :
                    Checks if cursor is inside any heading

                editor.isActive("heading", { level: 2 }) :
                    Checks if cursor is specifically inside a Heading 2

            This allows us to determine the exact heading level for the dropdown selection.
    */
    
    // Function to get the current heading level label;
    const getCurrentHeadingLevel = () => {
        for ( let num = 1; num <=4; num++) {
            if ( editor?.isActive("heading", { level : num } )){ //editor.isActive("heading", { level: 2 }) : Checks if cursor is specifically inside a Heading 2
                return `Heading ${num}`;
            }
        }

        return "Normal Text";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {getCurrentHeadingLevel()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    headingLevels.map ( ({ label, level, fontSize }) => (
                        <button
                            key =  {level}
                            className = {cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                (editor?.isActive("heading", { level : level} || level === 0 && !editor?.isActive("heading") )) && "bg-neutral-200/80")
                            }
                            style={ { fontSize: fontSize } } //Applying font size to each heading level in the dropdown. So that the preview looks accurate to the heading Size and the user can see how the heading will look.
                            onClick={ () => {
                                if( level === 0){
                                    editor?.chain().focus().setParagraph().run();
                                    return;
                                }else {
                                    editor?.chain().focus().toggleHeading({level : level as Level}).run();
                                    return;
                                };
                            } }
                        >
                            {label}
                        </button>
                    ) )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const TextColorSelector = () => {

    const { editor } = useEditorStore();

    const currentColor = editor?.getAttributes("textStyle").color || "#000000";

    const onColorChange = (colorResult : ColorResult) => { // colorResult is the color object returned by react-color CirclePicker on selecting a color.
        const color = colorResult.hex;
        editor?.chain().focus().setColor(color).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="text-xs">A</span>
                    <div
                        className="h-0.5 w-full"
                        style = { {backgroundColor : currentColor } }
                    />
                </button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="p-0">
                {/* <CirclePicker 
                    //CirclePicker is a color picker component from react-color library that displays a circle of colors to choose from. There exists other pickers too like SketchPicker, PhotoshopPicker, etc.
                    color = {currentColor}
                    onChange = {onColorChange} //onChange is triggered whenever a new color is selected in the CirclePicker i.e even while hovering over a color. Whereas onChangeComplete is triggered only when the user clicks on a color.
                /> */}
                <SketchPicker 
                    color = {currentColor}
                    onChange = {onColorChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const HighlightColorSelector = () => {

    const { editor } = useEditorStore();

    const currentHighlightColor = editor?.getAttributes("highlight").color || "#FFFF00";

    const onColorChange = (colorResult : ColorResult) => { // colorResult is the color object returned by react-color CirclePicker on selecting a color.
        const color = colorResult.hex;
        editor?.chain().focus().setHighlight( { color : color}).run();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4" />
                    <div
                        className="h-0.5 w-full"
                        style = { {backgroundColor : currentHighlightColor } }
                    />
                </button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="p-0">
                <SketchPicker 
                    color = {currentHighlightColor}
                    onChange = {onColorChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const AddLinkButton = () => {

    const { editor } = useEditorStore();

    const [value, setValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    /*Why state?
        1)
        value — current text in the input (string)
        setValue — function to update value

        We need state to:
            1. Store what the user types in the input field.
            2. Update the input field when the user types.
            3. Reset the input field after applying the link.

        Without state, we can’t track or update the input value dynamically.

        Because the input is a controlled component: the input’s displayed value is tied to React state 
        ( using setValue function applied to onChange event of input).
        so the component can read/update the typed text and prefill it when needed.
    
        2)
        open — whether the dropdown is open (boolean)
        setOpen — function to update open

        We need state to:
            We are keeping it close by default, and then when the user clicks on Apply button, we are removing the input field's value as well as closing the dropdown menu by setting 
            the value of this open to false using setOpen function.
        */

    const onAddLink = (href : string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
        setValue(""); //Clear the input field after applying the link.
        setOpen(false); //Close the dropdown menu after applying the link.
    };
    /*Why .extendMarkRange("link") & setValue("") :

        Why extendMarkRange("link")?
            In practice:
                1. If you have a partially selected link or the cursor is inside a link node, 
                extendMarkRange("link") extends the range to the whole link mark so the new href replaces the whole link.
                2. If you have regular selection, it makes sure the link will be applied to the entire selected text.
    
        Why setValue("") after adding the link?
            It’s UX: after applying the link, you usually want the field empty for the next link. 
            It also gives visual feedback that the operation completed.
    
        */

    return (
        <DropdownMenu 
            open ={open} //open is an built-in attribute that determines whether the dropdown menu is currently open or closed, and we are controlling it programmatically by creating our own open/close logic using state.
            onOpenChange={ (open) => {
                    if (open) {
                        setValue(editor?.getAttributes("link").href || "");
                    }   
                }
            /*onOpenChange :
                This event fires whenever the dropdown menu opens or closes.

                Here, when the menu opens (open === true):
                    The function reads the current link attributes of the selection.
                    
                    1) We prefill the input field with the current link href if the cursor is inside a link,
                    by calling setValue() to update the value state, which in turn updates the input field.
                    editor?.getAttributes("link").href gets the current link URL if inside a link, otherwise undefined.
                    
                    2) If there’s no link, we default to an empty string "".

                This way, when you open the link menu while your cursor is on a link, 
                you see the existing URL and can edit it directly.

                open is a boolean: true when the menu opens, false when it closes.
            */
        }>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    onClick={() => setOpen( prev => !prev)} //When the user clicks on the LinkButton, we set open to Opposite of what current value of open is using setOpen function, which opens the dropdown menu. At start, its false, so clicking sets it to true, opening the menu.
                >
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    onChange = { (e) => setValue(e.target.value)}
                    value = {value}
                    /* Controlled Input :
                        Here, the Input component’s value is controlled by React state (value state variable).
                        onChange updates the state whenever the user types.
                        setValue(e.target.value) updates React state which updates the input display (keeps it controlled).

                        e is the event object; e.target is the DOM input element; e.target.value is the current typed text.

                        This way, the input field always reflects the current value state.
                        When we call setValue("") after adding the link, it clears the input field.
                    */
                />
                <Button
                    onClick={ () => onAddLink(value)}
                > 
                Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const CommentButton = () => {

    const { editor } = useEditorStore();

    return (
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <MessageSquarePlusIcon className="size-4" />
        </button>
    )

}

const AddImageButton = () => {

    const { editor } = useEditorStore();

    const [imageUrl, setImageUrl] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const onAddImageUrl = (src : string) => {
        editor?.chain().focus().setImage({ src }).run();
    };

    const onUploadImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onAddImageUrl(imageUrl);
            }
        }

        input.click();
    };

    const handleImageUrlSubmit = () => {
        if (imageUrl){
            onAddImageUrl(imageUrl);
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                < DropdownMenuContent >
                    <DropdownMenuItem onClick={onUploadImage}>
                        <UploadIcon className="size-4 mr-2">
                            Upload Image
                        </UploadIcon>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <SearchIcon className="size-4 mr-2">
                            Paste Image URL
                        </SearchIcon>
                    </DropdownMenuItem>
                </DropdownMenuContent>   
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Insert Image via URL
                        </DialogTitle>
                    </DialogHeader>
                        <Input 
                            placeholder="https://example.com/image.png"
                            onChange = { (e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    handleImageUrlSubmit();
                                }
                            }}
                            value = {imageUrl}
                        />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert Image
                        </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </> 
    )
};

const AlignButton = () => {

    const { editor } = useEditorStore();

    const alignments = [
        { label : "Left Alignment", value : "left", icon : AlignLeftIcon},
        { label : "Center Alignment", value : "center", icon : AlignCenterIcon},
        { label : "Right Alignment", value : "right", icon : AlignRightIcon},
        { label : "Justify Alignment", value : "justify", icon : AlignJustifyIcon}
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    alignments.map( ({ label, value, icon : Icon}) => (
                        <button
                            key = {value}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.isActive( { textAlign : value } ) && "bg-neutral-200/80"
                            )}
                            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const ListButton = () => {

    const { editor } = useEditorStore();

    const lists = [
        { 
            label : "Bullet List", 
            value : "bulletList", 
            icon : ListIcon, 
            isActive : editor?.isActive("bulletList"), 
            onClick : () => editor?.chain().focus().toggleBulletList().run()
        },
        { 
            label : "Ordered List", 
            value : "orderedList", 
            icon : ListOrderedIcon, 
            isActive : () => editor?.isActive("orderedList"), 
            onClick : () => editor?.chain().focus().toggleOrderedList().run()
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            < DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    lists.map( ({ label, value, icon : Icon, isActive, onClick}) => (
                        <button
                            key = {value}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                isActive && "bg-neutral-200/80"
                            )}
                            onClick={onClick}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

const FontSizeSelector = () => {

    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes("textStyle").fontSize || "16px";

    const [currentFontSizeState, setCurrentFontSizeState] = React.useState(currentFontSize);
    const [open, setOpen] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onFontSizeChange = (size : string) => {
        editor?.chain().focus().setFontSize(size).run();
        setCurrentFontSizeState(size);
    };

    const handleFontDecrement = () => {
        let newSize = parseInt(currentFontSizeState) - 1;
        if (newSize < 8) {
            newSize = 8;
        };
        const newSizeStr = `${newSize}px`;
        onFontSizeChange(newSizeStr);
    };
    const handleFontIncrement = () => {
        let newSize = parseInt(currentFontSizeState) + 1;
        if (newSize < 8) {
            newSize = 8;
        };
        const newSizeStr = `${newSize}px`;
        onFontSizeChange(newSizeStr);
    };

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let inputSize = parseInt(e.target.value);
        if (isNaN(inputSize) || inputSize < 8){
            inputSize = 8;
        };

        const inputSizeStr = `${inputSize}px`;
        onFontSizeChange(inputSizeStr);
    };

    const handleInputBlur = () => {
        let size = parseInt(currentFontSizeState);
        if (isNaN(size) || size < 8){
            size = 8;
        };
        const sizeStr = `${size}px`;
        onFontSizeChange(sizeStr);
    };

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleInputBlur();
        }
    };

    const fontSizes = [
        { label : "8px", value : "8px"},
        { label : "10px", value : "10px"},
        { label : "12px", value : "12px"},
        { label : "14px", value : "14px"},
        { label : "16px", value : "16px"},
        { label : "18px", value : "18px"},
        { label : "20px", value : "20px"},
        { label : "22px", value : "22px"},
        { label : "24px", value : "24px"},
        { label : "26px", value : "26px"},
        { label : "28px", value : "28px"},
        { label : "30px", value : "30px"},
        { label : "32px", value : "32px"},  
    ];

    return (
        <div className="flex items-center gap-x-0.5">
            <button 
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={handleFontDecrement}
            >
                <MinusIcon className="size-4"/>
            </button>

            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button 
                        className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
                        onClick={ (e) => {
                            e.preventDefault(); //Prevent the button from stealing focus when clicked, so that the input inside remains focused for typing.
                            setOpen( prev => !prev);
                            inputRef.current?.focus(); //Focus the input field when the dropdown is opened.
                        }} 
                    >
                        <input
                            type="text"
                            className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm curosr-text bg-transparent focus:outline-none focus:ring-0"
                            value={currentFontSizeState.replace("px", "")} //Display only the number part in the input field.
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleKeyDown}
                            ref = {inputRef}
                        />
                    </button>
                </DropdownMenuTrigger>
                < DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {
                        fontSizes.map( ({ label, value}) => (
                            <button
                                key = {value}
                                className={cn(
                                    "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                    editor?.getAttributes("textStyle").fontSize === value && "bg-neutral-200/80"
                                )}
                                onClick={() => onFontSizeChange(value)}
                            >
                                <span className="text-sm">{label}</span>
                            </button>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <button 
                className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={handleFontIncrement}
            >
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
};

const LineHeightSelector = () => {

    const { editor } = useEditorStore();

    const lineHeights = [
        { label : "Default", value : "normal"},
        { label : "Single", value : "1"},
        { label : "1.15", value : "1.15"},
        { label : "1.5", value : "1.5"},
        { label : "Double", value : "2"}
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    lineHeights.map( ({ label, value}) => (
                        <button
                            key = {value}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").lineHeight === value && "bg-neutral-200/80"
                            )}
                            onClick={() => {
                                editor?.chain().focus().setLineHeight(value).run();
                            }}
                        >
                            <span className="text-sm">{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent> 
        </DropdownMenu>
    )
};


interface ToolBarButtonProps {
    onClick? : () => void;
    isActive? : boolean;
    icon?: LucideIcon
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
        label? : string;
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
                /*The method editor.isActive(name: string) checks if a given mark or node type is active in the current selection.
                
                isActive(typeName):
                    For marks (bold, italic), it checks if the style is active.
                    For nodes (paragraph, heading), it checks the current node type.
                
                Here :
                It returns:
                    true if the current text selection (or cursor position) has the “bold” mark applied,
                    false otherwise. 

                editor?. → ensures the code doesn’t break if editor is null (for example, before it finishes initializing).

                If editor exists, it calls .isActive("bold").
                If not, it defaults to false.
                */
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
                    console.log("comment");
                    editor?.chain().focus().addPendingComment().run();
                }, 
                isActive: editor?.isActive("liveblocksCommentMark")
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

        {sections[0].map((toolBarItem) => (
            <ToolBarButton 
                key={toolBarItem.label}
                {...toolBarItem}
            />
        ))}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <FontFamilySelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <HeadingLevelSelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <FontSizeSelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        {sections[1].map((toolBarItem) => (
            <ToolBarButton 
                key={toolBarItem.label}
                {...toolBarItem}
            />
        ))}
        <TextColorSelector />
        <HighlightColorSelector />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <AddLinkButton />
        <AddImageButton />
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        <AlignButton />
        <LineHeightSelector />
        <ListButton />

        {sections[2].map((toolBarItem) => (
            <ToolBarButton 
                key={toolBarItem.label}
                {...toolBarItem}
            />
        ))}
        <Separator orientation="vertical" className="h-6 mx-1 bg-neutral-300" />

        </div>
    );
};   
