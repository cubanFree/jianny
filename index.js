const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let notes = []; // Arreglo para almacenar notas en memoria

// Ruta para obtener todas las notas
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Ruta para crear una nueva nota
app.post('/api/notes', (req, res) => {
    const note = {
        id: notes.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    notes.push(note);
    res.json(note);
});

// Ruta para actualizar una nota por ID
app.put('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        notes[noteIndex] = {
            id,
            title: req.body.title,
            content: req.body.content
        };
        res.json(notes[noteIndex]);
    } else {
        res.status(404).json({ message: 'Note not found' });
    }
});

// Ruta para eliminar una nota por ID
app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.json({ message: 'Note deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
