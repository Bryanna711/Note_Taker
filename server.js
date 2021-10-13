const express = require('express');

const PORT = 3001

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extend: true}));



app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT}`)
})