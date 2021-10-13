const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content), (err) => 
err ? console.log(err) : console.log('Successfully wrote to file.')
);

const readAndAppend = (content, destination) =>{
fs.readFile(destination, 'utf-8', (err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        const parseData = JSON.parse(data);
        parseData.push(content);
        writeToFile(destination, parseData);
    }
});
}

module.exports = { readFromFile, readAndAppend, writeToFile}