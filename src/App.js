import React, { useEffect, useState } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [disconnected, setDisconnected] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notes');
            const data = await response.json();
            if (Array.isArray(data)) {
                setNotes(data);
                disconnected && setDisconnected(false);
                setLoading(false);
            } else {
                console.error("The response is not an array:", data);
            }
        } catch (error) {
            setDisconnected(true);
            setLoading(false);
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className='container'>
            <h1>Notas Web</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                disconnected ? (
                    <>
                        <span>Error al conectar con el Back-End</span>
                        <button onClick={fetchNotes}>Intenta de nuevo</button>
                    </>
                ) : (
                    <>
                        <NoteForm fetchNotes={fetchNotes} OnDisconnect={setDisconnected} />
                        <NoteList notes={notes} />
                    </>
                )
            )}
        </div>
    );
};

export default App;
