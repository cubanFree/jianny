import React from 'react';

const NoteList = ({ notes }) => {
    if (!Array.isArray(notes)) {
        return <div>No notes available</div>;
    }

    return (
        <div>
            {notes.map((note) => (
                <div className="note" key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
