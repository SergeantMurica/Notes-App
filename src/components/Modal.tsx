import {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";

interface ModalProps {
    onClose: () => void;
    onSave: (title: string, content: string) => void;
    title: string;
    content: string;
    isNewNote: boolean;
}

const Modal = ({onClose, onSave, title, content, isNewNote}: ModalProps) => {
    const [noteContent, setNoteContent] = useState<string>(content);
    const [noteTitle, setNoteTitle] = useState<string>(title);

    useEffect(() => {
        setNoteContent(content);
        setNoteTitle(title);
    }, [content, title]);

    const handleSave = () => {
        if (isNewNote && !noteTitle.trim()) {
            alert("Please provide a title for the note.");
            return;
        }

        onSave(noteTitle, noteContent);
    };

    const handleContentChange = (value?: string) => {
        setNoteContent(value || "");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-3/4 max-w-3xl">
                {/* Header */}
                <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
                    {isNewNote ? (
                        <input
                            type="text"
                            value={noteTitle}
                            onChange={(e) => setNoteTitle(e.target.value)}
                            placeholder="Enter note title..."
                            className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        />
                    ) : (
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            {noteTitle}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="ml-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>

                {/* Rich-Text Editor */}
                <div className="p-4">
                    <MDEditor value={noteContent} onChange={handleContentChange}/>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

