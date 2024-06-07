import React, { useState } from 'react';

const NoteForm = ({ fetchNotes, OnDisconnect = () => {} }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            fetchNotes();
            setTitle('');
            setContent('');
        } catch (error) {
            OnDisconnect(true);
            console.error("Error adding note:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="usuario"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="escriba una nota..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit">Publicar</button>
        </form>
    );
};

export default NoteForm;

