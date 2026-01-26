'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useStorage } from '@liveblocks/react';
import { useEditorStore } from '@/app/store/use-editor-store';

import { Ruler } from './ruler';
import { Threads } from './threads';

import StarterKit from '@tiptap/starter-kit';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TableKit } from '@tiptap/extension-table';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { TextStyle, FontFamily, FontSize, LineHeight, Color } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margin";

interface EditorProps {
    initialContent?: string | undefined;
};

export const Editor = ({ initialContent } : EditorProps) => {

    // Get the setEditor function from the Zustand store to update the editor instance.
    const { setEditor} = useEditorStore();

    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true,
    });

    const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
    const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

    // Initialize the TipTap editor with various extensions and configurations.
    // The editor instance is created using the useEditor hook from TipTap.
    // The editorProps attribute allows us to set custom attributes and styles for the editor content area.
    // We include several extensions like StarterKit, TaskList, TaskItem, TableKit, Image, and ImageResize to enhance the editor's functionality.
    // The content property sets the initial content of the editor.
    // The immediatelyRender: false option prevents the editor from rendering on the server side, avoiding SSR issues.

    // After creating the editor instance, we call setEditor to update the editor and store it in our Zustand store for global access.

    const editor = useEditor({
        autofocus: true,
        editorProps: {
            attributes: {
                style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
                class: 'focus:outline-none border border-[#C7C7C7] shadow flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text print:border-0 print:min-h-0 print:w-full print:shadow-none',
            }
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
                // The liveblocks extension handles undo/redo functionality in a collaborative environment.
                undoRedo: false,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TableKit.configure({
                table: { resizable: true },
            }),
            ImageResize,
            Image,
            TextStyle,
            FontFamily,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Link.configure( {
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https', 'mailto'],
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            FontSize,
            LineHeight,
        ],
        
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,

        onCreate({ editor }) {
            // editor initializes with null, and after it gets created in the above useEditor call, this onCreate function is called in which we set the editor (update our editor) in our Zustand store.
            setEditor(editor); 
        },
        onDestroy() {
            // When the editor is destroyed, we set the editor in our Zustand store to null.
            setEditor(null);
        },
        onUpdate( { editor } ) {
            // Whenever the content of the editor is updated, we update the editor instance in our Zustand store.
            setEditor(editor);
        },
        onSelectionUpdate( { editor } ) {
            // Whenever the selection in the editor is updated, we update the editor instance in our Zustand store.
            setEditor(editor);
        },
        onTransaction( { editor } ) {
            // A transaction represents any change in the editor, whether it's content changes, selection changes, etc.
            // Whenever a transaction occurs, we update the editor instance in our Zustand store.
            setEditor(editor);
        },
        onFocus( { editor } ) {
            // When the editor gains focus, we update the editor instance in our Zustand store.
            setEditor(editor);
        },
        onBlur( { editor } ) {
            // When the editor loses focus, we update the editor instance in our Zustand store.
            setEditor(editor);
        },
        onContentError( { editor } ) {
            // If there's an error while updating the content, we still update the editor instance in our Zustand store.
            setEditor(editor);
        },
    });

    return ( 
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
            <Ruler />
            <div className='min-w-max flex justify-center w-[816px] py-4 mx-auto print:py-0 print:min-w-0'>
                <EditorContent editor = {editor} />
                <Threads editor={editor} />
            </div>
        </div>
    );
};