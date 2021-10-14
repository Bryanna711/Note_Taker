const { uuid } = require('uuidv4');
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils');


notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const results = json.filter((note) => note.note_id === noteId);
            return results.length > 0
                ? res.json(results) : res.json("No note with this ID");

        });
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('New note successfully added!');
    }
    else {
        console.log('Error - note not added!')
    }
})

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const newResult = json.filter((note) => note.note_id !== noteId);
            writeToFile('./db/db.json', newResult);
            return newResult
                ? res.json('Note sucessfully deleted!') : res.json('Note did not delete.')
        });
});

module.exports = notes

