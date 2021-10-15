const { uuid } = require('uuidv4');
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helper/fsUtils');

//Grabs all of the notes in the db and then is used to write them to the left hand column of the HTML
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//This call is used to grab the note by ID and populate the right hand column of the page with the selected note
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

//This call is taking in the user entered information and posting it to the db while also assigning it a unique ID
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
//This is not working as expected but is meant to create a new array minus the id selected
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

