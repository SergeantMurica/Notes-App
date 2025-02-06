import {useState} from "react";
import Modal from "./Modal";

interface Note {
    id: number;
    title: string;
    content: string;
}

const NotesApp = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModalForNewNote = () => {
        setSelectedNote(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (note: Note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const saveNote = (title: string, content: string) => {
        if (!title.trim()) {
            alert("Please provide a title for the note.");
            return;
        }

        if (selectedNote) {
            // Edit existing note
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === selectedNote.id ? {...note, title, content} : note
                )
            );
        } else {
            // Add new note
            setNotes((prevNotes) => [
                ...prevNotes,
                {id: Date.now(), title, content},
            ]);
        }

        closeModal();
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Notes App
            </h1>
            <button
                onClick={openModalForNewNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-6"
            >
                Create Note
            </button>

            <ul className="space-y-4">
                {notes.map((note) => (
                    <li
                        key={note.id}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => openModalForEdit(note)}
                    >
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            {note.title}
                        </h3>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    onSave={saveNote}
                    title={selectedNote ? selectedNote.title : ""}
                    content={selectedNote ? selectedNote.content : ""}
                    isNewNote={!selectedNote}
                />
            )}
        </div>
    );
};

export default NotesApp;
