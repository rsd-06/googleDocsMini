import { create } from "zustand";
//This imports the Editor TypeScript type from TipTap. It’s only a type import (no runtime code).
import { type Editor } from "@tiptap/react"; 

interface EditorState {
    editor : Editor | null;
    //An action function to update the editor state. Accepts Editor or null and returns void.
    setEditor : (editor: Editor | null) => void;
};

// Create a Zustand store for managing the editor state.
// The store has an initial state with editor set to null and a setEditor function to update the editor state.
// The setEditor function uses the set method provided by Zustand to update the state.
// We use (set) => ({ ...}) to immediately return an object with the initial state and actions. Defining just (set) => { ...} would be interpreted as a function body, not an object return.
// This store can be used in React components to access and update the editor instance.
export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({ editor : editor})
}));  