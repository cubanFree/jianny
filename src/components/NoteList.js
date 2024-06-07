import React from 'react';

const NoteList = ({ notes }) => {

    const deleteNote = async (event, id) => {
        event.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'DELETE',
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    if (!Array.isArray(notes)) {
        return <div>No notes available</div>;
    }

    return (
        <div className="note-list-container">
            {notes.map((note) => (
                <div className="note" key={note.id}>
                    <article>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </article>
                    <span className="span-delete" onClick={(event) => deleteNote(event, note.id)}>Eliminar</span>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
